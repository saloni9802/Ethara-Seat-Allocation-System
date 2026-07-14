from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_

import models
import schemas
from database import get_db

router = APIRouter(
    prefix="/employees",
    tags=["Employees"]
)


@router.post("/")
def create_employee(employee: schemas.EmployeeCreate, db: Session = Depends(get_db)):

    existing_email = db.query(models.Employee).filter(
        models.Employee.email == employee.email
    ).first()

    if existing_email:
        raise HTTPException(status_code=400, detail="Email already exists")

    new_employee = models.Employee(**employee.model_dump())

    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)

    return new_employee


# Search + Pagination
@router.get("/")
def get_employees(
    search: str = "",
    page: int = 1,
    limit: int = 20,
    db: Session = Depends(get_db)
):

    query = db.query(models.Employee)

    if search:
        query = query.filter(
            or_(
                models.Employee.name.ilike(f"%{search}%"),
                models.Employee.employee_code.ilike(f"%{search}%"),
                models.Employee.department.ilike(f"%{search}%")
            )
        )

    total = query.count()

    employees = (
        query
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )

    return {
        "total": total,
        "page": page,
        "limit": limit,
        "data": employees
    }


@router.get("/{employee_id}")
def get_employee(employee_id: int, db: Session = Depends(get_db)):

    employee = db.query(models.Employee).filter(
        models.Employee.id == employee_id
    ).first()

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    return employee


@router.put("/{employee_id}")
def update_employee(
    employee_id: int,
    employee: schemas.EmployeeCreate,
    db: Session = Depends(get_db)
):

    db_employee = db.query(models.Employee).filter(
        models.Employee.id == employee_id
    ).first()

    if not db_employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    for key, value in employee.model_dump().items():
        setattr(db_employee, key, value)

    db.commit()
    db.refresh(db_employee)

    return db_employee


@router.delete("/{employee_id}")
def delete_employee(employee_id: int, db: Session = Depends(get_db)):

    employee = db.query(models.Employee).filter(
        models.Employee.id == employee_id
    ).first()

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    db.delete(employee)
    db.commit()

    return {"message": "Employee deleted successfully"}