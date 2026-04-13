from fastapi import APIRouter

router = APIRouter(
    prefix="/units",
    tags=["units"]
)

@router.get("/")
async def read_units():
    return {
        "length": {"meter", "kilometer", "centimeter", "millimeter", "inch", "foot", "yard", "mile"},
        "weight": {"gram", "kilogram", "milligram", "pound", "ounce"},
        "temperature": {"celsius", "fahrenheit", "kelvin"}
    }