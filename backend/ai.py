from sqlalchemy.orm import Session
import models

def process_query(query: str, db: Session):
    q = query.lower()

    if "available seat" in q:
        seats = db.query(models.Seat).filter(
            models.Seat.status == "Available"
        ).count()

        return {"response": f"There are {seats} available seats."}

    elif "occupied" in q:
        occupied = db.query(models.Seat).filter(
            models.Seat.status == "Occupied"
        ).count()

        return {"response": f"There are {occupied} occupied seats."}

    elif "employee" in q:
        total = db.query(models.Employee).count()

        return {"response": f"Total employees: {total}"}

    elif "project" in q:
        total = db.query(models.Project).count()

        return {"response": f"There are {total} projects."}

    else:
        return {
            "response": "Sorry, I couldn't understand your query."
        }