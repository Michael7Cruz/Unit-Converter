from fastapi import APIRouter, status, HTTPException

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
    if from_unit not in conversion_factors or to_unit not in conversion_factors or type(value) not in [int, float]:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid units or value provided.")

    # Convert the input value to meters
    value_in_meters = value * conversion_factors[from_unit]

    # Convert the value from meters to the target unit
    converted_value = value_in_meters / conversion_factors[to_unit]

    return {"converted_value": converted_value}