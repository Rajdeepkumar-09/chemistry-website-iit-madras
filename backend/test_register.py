import requests

BASE_URL = "http://127.0.0.1:8000/api/auth/login"

print("--- IITM Chemistry Portal Login Test ---")

login_credentials = {
    "email": "dr.sharma@smail.iitm.ac.in",
    "password": "securepassword123"
}

print("\nAttempting to log in Dr. Sharma...")
response = requests.post(BASE_URL, json=login_credentials)

print(f"Status: {response.status_code}")
if response.status_code == 200:
    data = response.json()
    print(f"Success! Role detected: {data['role']}")
    print(f"Your Digital ID Card (JWT) is: \n{data['access_token'][:50]}...[TRUNCATED]")
else:
    print(response.json())