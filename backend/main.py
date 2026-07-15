from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import employee, project, seat, dashboard
from routers.ai import router as ai_router

app = FastAPI(
    title="Ethara Seat Allocation API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://extraordinary-biscuit-171715.netlify.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(employee.router)
app.include_router(project.router)
app.include_router(seat.router)
app.include_router(dashboard.router)
app.include_router(ai_router)

@app.get("/")
def home():
    return {
        "message": "Ethara Backend Running"
    }