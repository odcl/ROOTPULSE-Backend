import phonenumbers
from phonenumbers import NumberParseException

def validate_phone_number(phone_number):
    print(f"Testing number: {phone_number}")
    try:
        # Parse the number. The 'None' argument means no default region is supplied,
        # so the number MUST start with '+'.
        parsed_number = phonenumbers.parse(phone_number, None)
        
        # Check if it's a valid number
        if not phonenumbers.is_valid_number(parsed_number):
            print("  -> Invalid number: The country code or number format is incorrect.")
            return False
            
        # Format to E.164
        formatted_number = phonenumbers.format_number(parsed_number, phonenumbers.PhoneNumberFormat.E164)
        print(f"  -> Valid! E.164 Format: {formatted_number}")
        return True
        
    except NumberParseException as e:
        print(f"  -> Error: {e}")
        print("  -> Ensure the number starts with '+' followed by the country code.")
        return False

if __name__ == "__main__":
    print("--- Phone Number Validation Test ---")
    
    test_numbers = [
        "+8801700000000",  # Valid BD
        "+14155552671",    # Valid US
        "01700000000",     # Invalid (Missing country code)
        "+8801",           # Invalid (Too short)
        "+999999999999",   # Invalid (Likely invalid country)
        "invalid",         # Garbage
    ]
    
    for number in test_numbers:
        validate_phone_number(number)
        print("-" * 30)
