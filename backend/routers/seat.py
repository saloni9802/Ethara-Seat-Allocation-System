from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import models
import schemas

from database import get_db

router = APIRouter(
    prefix="/seats",
    tags=["Seats"]
)


@router.post("/")
def create_seat(seat: schemas.SeatCreate,
                db: Session = Depends(get_db)):

    existing = db.query(models.Seat).filter(
        models.Seat.seat_number == seat.seat_number
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Seat already exists"
        )

    new_seat = models.Seat(**seat.model_dump())

    db.add(new_seat)
    db.commit()
    db.refresh(new_seat)

    return new_seat


@router.get("/")
def get_seats(db: Session = Depends(get_db)):
    return db.query(models.Seat).all()


@router.get("/available")
def available_seats(db: Session = Depends(get_db)):
    return db.query(models.Seat).filter(
        models.Seat.status == "Available"
    ).all()

@router.post("/allocate")
def allocate_seat(
    allocation: schemas.SeatAllocationCreate,
    db: Session = Depends(get_db)
):

    employee = db.query(models.Employee).filter(
        models.Employee.id == allocation.employee_id
    ).first()

    if not employee:
        raise HTTPException(404, "Employee not found")

    seat = db.query(models.Seat).filter(
        models.Seat.id == allocation.seat_id
    ).first()

    if not seat:
        raise HTTPException(404, "Seat not found")

    if seat.status != "Available":
        raise HTTPException(400, "Seat is not available")

    existing = db.query(models.SeatAllocation).filter(
        models.SeatAllocation.employee_id == allocation.employee_id,
        models.SeatAllocation.allocation_status == "Allocated"
    ).first()

    if existing:
        raise HTTPException(400, "Employee already has a seat")

    new_allocation = models.SeatAllocation(
        employee_id=allocation.employee_id,
        seat_id=allocation.seat_id,
        project_id=allocation.project_id
    )

    seat.status = "Occupied"

    db.add(new_allocation)
    db.commit()
    db.refresh(new_allocation)

    return {
        "message": "Seat Allocated Successfully",
        "allocation": new_allocation
    }
@router.get("/allocations")
def get_allocations(db: Session = Depends(get_db)):

    data = (
        db.query(
            models.SeatAllocation.id,
            models.Employee.name,
            models.Employee.employee_code,
            models.Project.name.label("project"),
            models.Seat.seat_number,
            models.Seat.floor,
            models.Seat.zone
        )
        .join(models.Employee)
        .join(models.Project)
        .join(models.Seat)
        .all()
    )

    return data