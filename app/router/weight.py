from fastapi import APIRouter

router = APIRouter(
    prefix="/weight",
    tags=["weight"]
)

@router.get("/convert")
async def convert_weight(value: float, from_unit: str, to_unit: str):
    # Define conversion factors (all values are in terms of kilograms)
    conversion_factors = {
        "kilogram": 1.0,
        "gram": 0.001,
        "milligram": 0.000001,
        "pound": 0.453592,
        "ounce": 0.0283495
    }

    # Check if the provided units are valid
    if from_unit not in conversion_factors or to_unit not in conversion_factors:
        return {"error": "Invalid units provided."}

    # Convert the input value to kilograms
    value_in_kilograms = value * conversion_factors[from_unit]

    # Convert the value from kilograms to the target unit
    converted_value = round(value_in_kilograms / conversion_factors[to_unit], 4)

    return {"converted_value": converted_value}