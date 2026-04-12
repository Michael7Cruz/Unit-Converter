from typing import Annotated

from fastapi import APIRouter, Depends, status, HTTPException
from app.dependencies.numeric_check import numeric_check

router = APIRouter(
    prefix="/length",
    tags=["length"]
)

@router.get("/convert")
async def convert_length(value: str, from_unit: str, to_unit: str, numeric: Annotated[bool, Depends(numeric_check)]):
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
    if from_unit not in conversion_factors or to_unit not in conversion_factors or not numeric:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid units or value provided.")

    # Convert the input value to meters
    value_in_float = float(value)
    value_in_meters = value_in_float * conversion_factors[from_unit]

    # Convert the value from meters to the target unit
    converted_value = round(value_in_meters / conversion_factors[to_unit], 10)

    return {"converted_value": converted_value}