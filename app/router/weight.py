from fastapi import APIRouter

router = APIRouter(
    prefix="/weight",
    tags=["weight"]
)

def numeric_check(value: str) -> bool:
    try:
        float(value)
        return True
    except ValueError:
        return False

@router.get("/convert")
async def convert_weight(value: str, from_unit: str, to_unit: str):
    # Define conversion factors (all values are in terms of kilograms)
    conversion_factors = {
        "kilogram": 1.0,
        "gram": 0.001,
        "milligram": 0.000001,
        "pound": 0.453592,
        "ounce": 0.0283495
    }

    # Check if the provided units are valid
    if from_unit not in conversion_factors or to_unit not in conversion_factors or numeric_check(value) == False:
        return {"error": "Invalid units or value provided."}

    value_in_float = float(value)

    # Convert the input value to kilograms
    value_in_kilograms = value_in_float * conversion_factors[from_unit]

    # Convert the value from kilograms to the target unit
    converted_value = round(value_in_kilograms / conversion_factors[to_unit], 10)

    return {"converted_value": converted_value}