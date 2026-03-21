import warnings
import pytest
import requests

# Suppress deprecation warnings from the backoff library (dependency of deepeval)
# Moved to top-level to ensure it captures warnings triggered during import/setup
warnings.filterwarnings("ignore", category=DeprecationWarning, module="backoff")

def pytest_addoption(parser):
    parser.addoption(
        "--refresh-cache",
        action="store_true",
        default=False,
        help="Force re-fetch all API responses, ignoring cache",
    )

def pytest_sessionstart(session):
    """Check if the API server is reachable ONLY if --refresh-cache is enabled."""
    if not session.config.getoption("--refresh-cache"):
        return

    health_url = "http://127.0.0.1:3000/api/health"
    try:
        # Use a short timeout to fail fast
        response = requests.get(health_url, timeout=3)
        if response.status_code != 200:
            pytest.exit(f"\n[CRITICAL] API Server health check failed (Status {response.status_code}).\nRun 'npm run dev' and try again or disable --refresh-cache.", returncode=1)
    except Exception as e:
        pytest.exit(f"\n[CRITICAL] API Server is unreachable at {health_url}.\nMake sure 'npm run dev' is active on port 3000 or disable --refresh-cache.\nError: {e}", returncode=1)
