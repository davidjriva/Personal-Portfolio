import os
import requests
import jwt
from dotenv import load_dotenv

load_dotenv(dotenv_path='../../.env.local')

JWT_SECRET = os.getenv("FRONTEND_JWT_SECRET")
API_URL = "http://127.0.0.1:3001/api/chat"

def get_auth_token():
    return jwt.encode({"role": "evaluator"}, JWT_SECRET, algorithm="HS256")

token = get_auth_token()
headers = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json",
    "x-eval-mode": "true",
}
payload = {"message": "Where did David go to school?", "sessionId": "debug-session"}

print(f"Testing POST to {API_URL}")
try:
    response = requests.post(API_URL, json=payload, headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text[:200]}")
except Exception as e:
    print(f"Error: {e}")
