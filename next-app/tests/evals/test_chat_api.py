import os
import json
import hashlib
import pytest
import requests
import jwt
from dotenv import load_dotenv
from deepeval import assert_test
from deepeval.test_case import LLMTestCase
from deepeval.metrics import FaithfulnessMetric, GEval
from deepeval.test_case import LLMTestCase, LLMTestCaseParams

# Load environment variables
load_dotenv(dotenv_path='../../.env.local')
load_dotenv(dotenv_path='../../.env')

# Force single-threaded evaluation to prevent hangs
os.environ["DEEPEVAL_N_JOBS"] = "1"
os.environ["DEEPEVAL_PYTEST"] = "1"

JWT_SECRET = os.getenv("FRONTEND_JWT_SECRET")
API_URL = "http://127.0.0.1:3000/api/chat"

CACHE_DIR = os.path.dirname(__file__)
CACHE_FILE = os.path.join(CACHE_DIR, 'response_cache.json')


# --------------- Cache helpers ---------------

def _load_cache():
    if os.path.exists(CACHE_FILE):
        with open(CACHE_FILE, 'r') as f:
            return json.load(f)
    return {}


def _save_cache(cache):
    with open(CACHE_FILE, 'w') as f:
        json.dump(cache, f, indent=2)


def _cache_key(message):
    return hashlib.sha256(message.encode()).hexdigest()


# --------------- API helpers ---------------

def get_auth_token():
    if not JWT_SECRET:
        raise ValueError("FRONTEND_JWT_SECRET is not set. Check your .env file.")
    return jwt.encode({"role": "evaluator"}, JWT_SECRET, algorithm="HS256")


def query_chat_api(message):
    token = get_auth_token()
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
        "x-eval-mode": "true",
    }
    payload = {"message": message, "sessionId": "eval-session-001"}

    print(f"\nDEBUG: POST to {API_URL}")
    response = requests.post(API_URL, json=payload, headers=headers, stream=True)
    print(f"DEBUG: Status={response.status_code}")
    if response.status_code != 200:
        raise Exception(f"API returned {response.status_code}: {response.text}")

    full_response = ""
    eval_data = {"contexts": [], "tool_calls": []}

    for line in response.iter_lines(decode_unicode=True):
        if line:
            if "[EVAL_CONTEXTS]:" in line:
                parts = line.split("[EVAL_CONTEXTS]:")
                content_part = parts[0].strip()
                if content_part:
                    full_response += (content_part + " ")
                json_str = parts[1].strip()
                try:
                    eval_data = json.loads(json_str)
                except json.JSONDecodeError:
                    pass
            else:
                full_response += (line + " ")

    return full_response.strip(), eval_data


def get_or_fetch(message, refresh):
    """Return (actual_output, eval_data), using cache unless *refresh* is True."""
    cache = _load_cache()
    key = _cache_key(message)

    if not refresh and key in cache:
        entry = cache[key]
        return entry["actual_output"], entry["eval_data"]

    actual_output, eval_data = query_chat_api(message)
    cache[key] = {"input": message, "actual_output": actual_output, "eval_data": eval_data}
    _save_cache(cache)
    return actual_output, eval_data


# --------------- Test data ---------------

dataset_path = os.path.join(os.path.dirname(__file__), 'golden_dataset.json')
with open(dataset_path, 'r') as f:
    dataset = json.load(f)


# --------------- Tests ---------------

@pytest.mark.parametrize(
    "test_case",
    dataset,
    ids=[tc["input"][:50] for tc in dataset],
)
def test_chat_api(test_case, request):
    refresh = request.config.getoption("--refresh-cache")
    question = test_case["input"]
    expected_output = test_case.get("expected_output")
    expected_tools = set(test_case.get("expected_tools", []))

    actual_output, eval_data = get_or_fetch(question, refresh)
    
    contexts = eval_data.get("contexts", [])
    actual_tools = set(eval_data.get("tool_calls", []))

    print(f"\n--- DIAGNOSTICS for: {question} ---")
    print(f"ACTUAL OUTPUT: {actual_output}")
    print(f"ACTUAL OUTPUT (REPR): {repr(actual_output)}")
    print(f"ACTUAL TOOLS: {actual_tools}")
    print(f"CONTEXTS COUNT: {len(contexts)}")
    print("-" * 40)

    # --- Tool-call assertions ---
    missing = expected_tools - actual_tools
    assert not missing, f"Expected tool(s) not called: {missing}"

    if not expected_tools:
        assert not actual_tools, f"Unexpected tools called: {actual_tools}"

    # --- DeepEval metric assertions (GEval for Relevancy) ---
    relevancy_metric = GEval(
        name="Relevancy",
        criteria="""
        Evaluate if the response is relevant to the input query:
        1. For FACTUAL queries about David's background (education, work, skills): The response SHOULD include specific details like honors (Summa Cum Laude), dates, and project descriptions. These are highly relevant.
        2. For GREETINGS or casual conversation (e.g., 'Hi', 'How are you?'): A polite, professional response offering help is 100% relevant. Do NOT penalize greetings for lacking academic or professional details.
        """,
        evaluation_params=[LLMTestCaseParams.INPUT, LLMTestCaseParams.ACTUAL_OUTPUT],
        threshold=0.5,
        model="gpt-4o"
    )
    
    metrics = [relevancy_metric]
    if contexts:
        metrics.append(FaithfulnessMetric(threshold=0.5, model="gpt-4o"))

    evaluation_case = LLMTestCase(
        input=question,
        actual_output=actual_output,
        expected_output=expected_output,
        retrieval_context=contexts if contexts else None,
    )

    assert_test(evaluation_case, metrics)

