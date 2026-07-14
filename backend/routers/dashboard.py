from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

import models
from database import get_db

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/summary")
def dashboard_summary(db: Session = Depends(get_db)):
    total_employees = db.query(models.Employee).count()
    total_seats = db.query(models.Seat).count()

    occupied = db.query(models.Seat).filter(
        models.Seat.status == "Occupied"
    ).count()

    available = db.query(models.Seat).filter(
        models.Seat.status == "Available"
    ).count()

    reserved = db.query(models.Seat).filter(
        models.Seat.status == "Reserved"
    ).count()

    pending = total_employees - occupied

    return {
        "total_employees": total_employees,
        "total_seats": total_seats,
        "occupied_seats": occupied,
        "available_seats": available,
        "reserved_seats": reserved,
        "pending_allocation": pending
    }


@router.get("/project-utilization")
def project_utilization(db: Session = Depends(get_db)):
    try:
        data = (
            db.query(
                models.Project.name,
                func.count(models.SeatAllocation.id).label("allocated")
            )
            .outerjoin(
                models.SeatAllocation,
                models.Project.id == models.SeatAllocation.project_id
            )
            .group_by(models.Project.name)
            .all()
        )

        return data

    except Exception as e:
        return {"error": str(e)}


@router.get("/floor-utilization")
def floor_utilization(db: Session = Depends(get_db)):
    data = (
        db.query(
            models.Seat.floor,
            func.count(models.Seat.id).label("total"),
            func.sum(
                models.Seat.status == "Occupied"
            ).label("occupied")
        )
        .group_by(models.Seat.floor)
        .all()
    )

    return data