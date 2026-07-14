from sqlalchemy import Column, Integer, String, Date, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from database import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    description = Column(String)
    manager_name = Column(String)
    status = Column(String, default="Active")
    created_at = Column(DateTime, default=datetime.utcnow)

    employees = relationship("Employee", back_populates="project")
    allocations = relationship("SeatAllocation", back_populates="project")


class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    employee_code = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    department = Column(String)
    role = Column(String)
    joining_date = Column(Date)
    status = Column(String, default="Active")

    project_id = Column(Integer, ForeignKey("projects.id"))

    project = relationship("Project", back_populates="employees")
    allocation = relationship(
        "SeatAllocation",
        back_populates="employee",
        uselist=False
    )


class Seat(Base):
    __tablename__ = "seats"

    id = Column(Integer, primary_key=True, index=True)
    floor = Column(Integer)
    zone = Column(String)
    bay = Column(String)
    seat_number = Column(String, unique=True)
    status = Column(String, default="Available")

    allocation = relationship(
        "SeatAllocation",
        back_populates="seat",
        uselist=False
    )


class SeatAllocation(Base):
    __tablename__ = "seat_allocations"

    id = Column(Integer, primary_key=True, index=True)

    employee_id = Column(Integer, ForeignKey("employees.id"))
    seat_id = Column(Integer, ForeignKey("seats.id"))
    project_id = Column(Integer, ForeignKey("projects.id"))

    allocation_status = Column(String, default="Allocated")
    allocation_date = Column(DateTime, default=datetime.utcnow)
    released_date = Column(DateTime, nullable=True)

    employee = relationship("Employee", back_populates="allocation")
    seat = relationship("Seat", back_populates="allocation")
    project = relationship("Project", back_populates="allocations")