import fastapi
from app.router import length, temperature, weight

app = fastapi.FastAPI()

app.include_router(length.router)
app.include_router(weight.router)
app.include_router(temperature.router)