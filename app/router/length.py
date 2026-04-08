from fastapi import APIRouter

router = APIRouter(
    prefix="/length",
    tags=["length"]
)

@router.get("/convert")
async def convert_length(value: float, from_unit: str, to_unit: str):
    # Define conversion factors (all values are in terms of meters)
    conversion_factors = {
        "meter": 1.0,
        "kilometer": 1000.0,
        "centimeter": 0.01,
        "millimeter": 0.001,
        "inch": 0.0254,
        "foot": 0.3048,
        "yard": 0.9144,
        "mile": 1609.34
    }

    # Check if the provided units are valid
    if from_unit not in conversion_factors or to_unit not in conversion_factors:
        return {"error": "Invalid units provided."}

    # Convert the input value to meters
    value_in_meters = value * conversion_factors[from_unit]

    # Convert the value from meters to the target unit
    converted_value = round(value_in_meters / conversion_factors[to_unit], 4)

    return {"converted_value": converted_value}