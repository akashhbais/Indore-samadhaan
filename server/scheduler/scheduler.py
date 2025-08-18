import requests
import time

# The URL of your local escalation endpoint
ESCALATION_URL = "http://127.0.0.1:8000/run-escalation/"

# The interval in seconds (e.g., 60 seconds for every minute)
CHECK_INTERVAL = 60 

print("--- Starting Local Escalation Scheduler ---")
print(f"Will trigger the escalation check every {CHECK_INTERVAL} seconds.")

while True:
    try:
        print(f"\n[{time.ctime()}] Triggering escalation check...")
        
        # Send the POST request to the API
        response = requests.post(ESCALATION_URL)
        
        # Check if the request was successful
        if response.status_code == 200:
            print(f"-> Success: {response.json()}")
        else:
            print(f"-> Error: Received status code {response.status_code}")
            print(f"-> Response: {response.text}")

    except requests.exceptions.ConnectionError:
        print("-> Error: Could not connect to the server. Is it running?")
    
    except Exception as e:
        print(f"-> An unexpected error occurred: {e}")

    # Wait for the next interval
    time.sleep(CHECK_INTERVAL)