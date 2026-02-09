import requests
import json
import sys
from datetime import datetime

class PizzeriaAPITester:
    def __init__(self, base_url="https://vegetal-dining.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        if data:
            print(f"   Data: {data}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                    return success, response_data
                except:
                    return success, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"   Error: {error_data}")
                except:
                    print(f"   Error Text: {response.text}")

            return success, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_api_root(self):
        """Test API root endpoint"""
        return self.run_test("API Root", "GET", "", 200)

    def test_create_order(self):
        """Test order creation"""
        order_data = {
            "items": [
                {
                    "name": "Margherita",
                    "size": "medium",
                    "price": 9.0,
                    "quantity": 1
                },
                {
                    "name": "Diavola", 
                    "size": "large",
                    "price": 18.0,
                    "quantity": 1
                }
            ],
            "customer_name": "Test Customer",
            "customer_phone": "+32123456789",
            "customer_email": "test@example.com",
            "order_type": "pickup",
            "notes": "Test order from automated test"
        }
        
        success, response = self.run_test(
            "Create Order",
            "POST", 
            "orders",
            200,
            data=order_data
        )
        
        if success and 'id' in response:
            return response['id']
        return None

    def test_get_order(self, order_id):
        """Test retrieving a specific order"""
        if not order_id:
            print("⚠️  Skipping get order test - no valid order ID")
            return False
            
        return self.run_test(
            "Get Specific Order",
            "GET",
            f"orders/{order_id}",
            200
        )[0]

    def test_list_orders(self):
        """Test listing all orders"""
        return self.run_test(
            "List All Orders", 
            "GET",
            "orders",
            200
        )[0]

    def test_contact_submission(self):
        """Test contact form submission"""
        contact_data = {
            "name": "Test Contact",
            "email": "testcontact@example.com", 
            "phone": "+32987654321",
            "message": "This is a test contact message from automated testing."
        }
        
        return self.run_test(
            "Submit Contact Form",
            "POST",
            "contact", 
            200,
            data=contact_data
        )[0]

def main():
    print("🍕 Starting Filo d'Olio Pizzeria API Tests")
    print("=" * 50)
    
    tester = PizzeriaAPITester()
    
    # Test API Root
    tester.test_api_root()
    
    # Test Order Creation & Retrieval
    order_id = tester.test_create_order()
    tester.test_get_order(order_id)
    
    # Test Order Listing
    tester.test_list_orders()
    
    # Test Contact Form
    tester.test_contact_submission()
    
    # Print results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests PASSED!")
        return 0
    else:
        print("❌ Some tests FAILED")
        return 1

if __name__ == "__main__":
    sys.exit(main())