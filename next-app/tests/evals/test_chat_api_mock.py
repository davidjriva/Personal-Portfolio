import os
import json
import hashlib
import pytest
import requests
from unittest.mock import MagicMock
from dotenv import load_dotenv

# We mock deepeval to avoid OpenAI usage for metrics
from deepeval import assert_test
from deepeval.test_case import LLMTestCase
from deepeval.metrics import FaithfulnessMetric, AnswerRelevancyMetric

# ----------------- MOCK CONFIG -----------------
# Set this to True to bypass all external API calls (Next.js + OpenAI)
MOCK_MODE = True
# Set this to True to simulate a test failure (wrong tool)
SIMULATE_FAILURE = False

# Load environment variables
load_dotenv(dotenv_path='../../.env.local')
load_dotenv(dotenv_path='../../.env')

JWT_SECRET = os.getenv("FRONTEND_JWT_SECRET")
API_URL = "http://127.0.0.1:3001/api/chat"

# ----------------- MOCK UTILS -----------------

def calculate_overlap_score(actual, expected):
    """
    Simulate a relevancy score based on keyword overlap (0 tokens used).
    """
    if not expected: return 1.0
    actual_words = set(actual.lower().split())
    expected_words = set(expected.lower().split())
    # Ignore common words
    stop_words = {"the", "a", "is", "in", "it", "of", "and", "or", "for", "with", "on", "as", "to"}
    expected_keywords = expected_words - stop_words
    if not expected_keywords: return 1.0
    overlap = actual_words.intersection(expected_keywords)
    return len(overlap) / len(expected_keywords)

class MockResponse:
    def __init__(self, text, eval_data, fragmented=False):
        self.status_code = 200
        self.text = text
        self.eval_data = eval_data
        self.fragmented = fragmented

    def iter_lines(self, decode_unicode=False):
        """
        Simulate SSE lines with optional fragmentation for more realism.
        """
        if not self.fragmented:
            # Clean lines
            yield self.text
            yield "" # Empty line from \n\n
            yield f"[EVAL_CONTEXTS]: {json.dumps(self.eval_data)}"
        else:
            # Fragmented lines (tests robustness of parsing)
            words = self.text.split()
            for i in range(0, len(words), 2):
                yield " ".join(words[i:i+2])
            yield f"Final bit of answer.\n\n[EVAL_CONTEXTS]: {json.dumps(self.eval_data)}"

def mock_query_api(message, test_case):
    """
    Simulate the API response using expected data from the test case.
    """
    expected_output = test_case.get("expected_output", "Mocked response")
    expected_tools = test_case.get("expected_tools", [])
    
    # If we want to simulate a failure, we return the wrong tools
    actual_tools = expected_tools if not SIMULATE_FAILURE else []
    if SIMULATE_FAILURE and expected_tools:
        print(f"[MOC-FAIL] Simulating missing tool: {expected_tools}")
    
    mock_contexts = ["Mocked retrieval context about David."] if expected_tools else []
    
    eval_data = {
        "contexts": mock_contexts,
        "tool_calls": actual_tools
    }
    
    # Use fragmented=True to test parsing robustness
    return MockResponse(expected_output, eval_data, fragmented=True)

# ----------------- TEST LOGIC -----------------

dataset_path = os.path.join(os.path.dirname(__file__), 'golden_dataset.json')
with open(dataset_path, 'r') as f:
    dataset = json.load(f)

@pytest.mark.parametrize(
    "test_case",
    dataset,
    ids=[tc["input"][:50] for tc in dataset],
)
def test_chat_api_mocked(test_case, monkeypatch):
    question = test_case["input"]
    expected_output = test_case.get("expected_output")
    expected_tools = set(test_case.get("expected_tools", []))

    if MOCK_MODE:
        # 1. Mock the API call
        print(f"\n[MOCK] Simulating request for: {question}")
        response = mock_query_api(question, test_case)
        
        # 2. Extract data (reusing the parsing logic we want to debug)
        actual_output = ""
        eval_data = {"contexts": [], "tool_calls": []}
        
        for line in response.iter_lines(decode_unicode=True):
            if line:
                if "[EVAL_CONTEXTS]:" in line:
                    parts = line.split("[EVAL_CONTEXTS]:")
                    content_part = parts[0].strip()
                    if content_part:
                        actual_output += (content_part + " ")
                    json_str = parts[1].strip()
                    try:
                        eval_data = json.loads(json_str)
                    except json.JSONDecodeError:
                        pass
                else:
                    actual_output += (line + " ")
        
        actual_output = actual_output.strip()
    else:
        # Real logic (not used if MOCK_MODE is True)
        raise NotImplementedError("Real mode disabled to save tokens.")

    # --- Assertions ---
    contexts = eval_data.get("contexts", [])
    actual_tools = set(eval_data.get("tool_calls", []))

    # Tool-call assertions
    missing = expected_tools - actual_tools
    assert not missing, f"Expected tool(s) not called: {missing}"

    # --- Mock metrics to avoid OpenAI judge costs ---
    relevancy_metric = AnswerRelevancyMetric(threshold=0.5)
    faithfulness_metric = FaithfulnessMetric(threshold=0.5)

    if MOCK_MODE:
        # Simulate a score based on keyword similarity
        simulated_score = calculate_overlap_score(actual_output, expected_output)
        
        relevancy_metric.measure = MagicMock(return_value=simulated_score)
        relevancy_metric.score = simulated_score
        relevancy_metric.reason = f"Simulated keyword overlap ({int(simulated_score*100)}%)"
        
        faithfulness_metric.measure = MagicMock(return_value=1.0)
        faithfulness_metric.score = 1.0
        faithfulness_metric.reason = "Mocked faithfulness (0 tokens used)"

    metrics = [relevancy_metric]
    if contexts:
        metrics.append(faithfulness_metric)

    evaluation_case = LLMTestCase(
        input=question,
        actual_output=actual_output,
        expected_output=expected_output,
        retrieval_context=contexts if contexts else None,
    )

    # In mock mode, we verify the simulated scores manually
    if MOCK_MODE:
        print(f"[MOCK] Simulated Relevancy Score: {relevancy_metric.score:.2f} - {relevancy_metric.reason}")
        assert relevancy_metric.score >= relevancy_metric.threshold, f"Relevancy too low: {relevancy_metric.score}"
    else:
        assert_test(evaluation_case, metrics)
