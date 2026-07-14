from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import models
import schemas
from database import get_db

router = APIRouter(
    prefix="/projects",
    tags=["Projects"]
)

@router.post("/")
def create_project(project: schemas.ProjectCreate, db: Session = Depends(get_db)):

    existing = db.query(models.Project).filter(
        models.Project.name == project.name
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="Project already exists")

    new_project = models.Project(**project.model_dump())

    db.add(new_project)
    db.commit()
    db.refresh(new_project)

    return new_project


@router.get("/")
def get_projects(db: Session = Depends(get_db)):
    return db.query(models.Project).all()


@router.get("/{project_id}/employees")
def get_project_employees(project_id: int, db: Session = Depends(get_db)):

    employees = db.query(models.Employee).filter(
        models.Employee.project_id == project_id
    ).all()

    return employees


@router.delete("/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db)):

    project = db.query(models.Project).filter(
        models.Project.id == project_id
    ).first()

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    db.delete(project)
    db.commit()

    return {
        "message": "Project deleted successfully"
    }