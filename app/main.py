import fastapi
from app.router import length, temperature, weight
from fastapi.middleware.cors import CORSMiddleware

app = fastapi.FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(length.router)
app.include_router(weight.router)
app.include_router(temperature.router)