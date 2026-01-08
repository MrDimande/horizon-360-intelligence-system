import requests
import json

url = "http://127.0.0.1:8000/auth/register"
headers = {"Content-Type": "application/json"}
data = {
    "email": "admin@horizon360.com",
    "password": "admin",
    "fullName": "Admin User",
    "isSuperuser": True
}

try:
    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        print("User created successfully!")
        print(response.json())
    elif response.status_code == 400 and "already exists" in response.text:
       print("User already exists.")
    else:
        print(f"Failed to create user: {response.status_code}")
        print(response.text)
except Exception as e:
    print(f"Error: {e}")
