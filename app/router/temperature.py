from fastapi import APIRouter

router = APIRouter(
    prefix="/temperature",
    tags=["temperature"]
)

valid_units = ["celsius", "fahrenheit", "kelvin"]

# Define conversion functions
def celsius_to_fahrenheit(c):
    return (c * 9/5) + 32

def fahrenheit_to_celsius(f):
    return (f - 32) * 5/9

def celsius_to_kelvin(c):
    return c + 273.15

def kelvin_to_celsius(k):
    return k - 273.15

@router.get("/convert")
async def convert_temperature(value: float, from_unit: str, to_unit: str):
    value_in_celsius: float = 0.0
    converted_value: float = 0.0
    
    # Check if the provided units are valid
    if from_unit not in valid_units or to_unit not in valid_units:
        return {"error": "Invalid units provided."}

    # Convert the input value to Celsius
    if from_unit == "celsius":
        value_in_celsius = value
    elif from_unit == "fahrenheit":
        value_in_celsius = fahrenheit_to_celsius(value)
    elif from_unit == "kelvin":
        value_in_celsius = kelvin_to_celsius(value)

    # Convert the value from Celsius to the target unit
    if to_unit == "celsius":
        converted_value = value_in_celsius
    elif to_unit == "fahrenheit":
        converted_value = celsius_to_fahrenheit(value_in_celsius)
    elif to_unit == "kelvin":
        converted_value = celsius_to_kelvin(value_in_celsius)

    return {"converted_value": round(converted_value, 4)}