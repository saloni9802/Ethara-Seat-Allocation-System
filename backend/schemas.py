from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Optional


# ---------------- Project ----------------

class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    manager_name: Optional[str] = None


class ProjectCreate(ProjectBase):
    pass


class Project(ProjectBase):
    id: int

    class Config:
        from_attributes = True


# ---------------- Employee ----------------

class EmployeeBase(BaseModel):
    employee_code: str
    name: str
    email: EmailStr
    department: str
    role: str
    joining_date: date
    status: str = "Active"
    project_id: int


class EmployeeCreate(EmployeeBase):
    pass


class Employee(EmployeeBase):
    id: int

    class Config:
        from_attributes = True


# ---------------- Seat ----------------

class SeatBase(BaseModel):
    floor: int
    zone: str
    bay: str
    seat_number: str
    status: str = "Available"


class SeatCreate(SeatBase):
    pass


class Seat(SeatBase):
    id: int

    class Config:
        from_attributes = True        
# ---------------- Seat Allocation ----------------

class SeatAllocationCreate(BaseModel):
    employee_id: int
    seat_id: int
    project_id: int        