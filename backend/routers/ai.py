from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

import models
from database import get_db

router = APIRouter(
    prefix="/ai",
    tags=["AI Assistant"]
)


class AIQuery(BaseModel):
    query: str


@router.post("/query")
def ai_query(data: AIQuery, db: Session = Depends(get_db)):
    query = data.query.lower()

    # Employee count
    if "employee" in query:
        count = db.query(models.Employee).count()
        return {
            "answer": f"There are {count} employees."
        }

    # Project count
    if "project" in query:
        count = db.query(models.Project).count()
        return {
            "answer": f"There are {count} projects."
        }

    # Total seats
    if "total seat" in query or "how many seats" in query:
        count = db.query(models.Seat).count()
        return {
            "answer": f"There are {count} seats."
        }

    # Available seats
    if "available" in query and "seat" in query:
        count = db.query(models.Seat).filter(
            models.Seat.status == "Available"
        ).count()

        return {
            "answer": f"There are {count} available seats."
        }

    # Occupied seats
    if "occupied" in query:
        count = db.query(models.Seat).filter(
            models.Seat.status == "Occupied"
        ).count()

        return {
            "answer": f"{count} seats are occupied."
        }

    return {
        "answer": "Sorry, I couldn't understand your question."
    }