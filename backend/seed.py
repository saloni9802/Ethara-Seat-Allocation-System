from faker import Faker
from random import choice, randint
from datetime import date
from database import SessionLocal
from models import Project, Employee, Seat

fake = Faker()

db = SessionLocal()

projects = [
    "Indigo",
    "Indreed",
    "Mydreed",
    "Preed",
    "Serfy",
    "Oreed",
    "bedegreed",
    "Opreed",
    "Serry",
    "Kaary",
    "Mered"
]

# ---------- Projects ----------
for name in projects:
    exists = db.query(Project).filter(Project.name == name).first()
    if not exists:
        db.add(Project(
            name=name,
            description=f"{name} Project",
            manager_name=fake.name()
        ))

db.commit()

project_ids = db.query(Project).all()

# ---------- Seats ----------
seat_count = db.query(Seat).count()

if seat_count == 0:

    for floor in range(1, 6):

        for zone in "ABCDEFGHIJ":

            for i in range(1, 111):

                status = "Occupied"

                if randint(1, 100) <= 10:
                    status = "Reserved"

                elif randint(1, 100) <= 15:
                    status = "Available"

                db.add(
                    Seat(
                        floor=floor,
                        zone=zone,
                        bay=str(randint(1, 5)),
                        seat_number=f"{zone}-{floor}-{i}",
                        status=status
                    )
                )

db.commit()

# ---------- Employees ----------

current_count = db.query(Employee).count()

for i in range(current_count + 1, 5001):

    db.add(
        Employee(
            employee_code=f"EMP{i:05}",
            name=fake.name(),
            email=f"user{i}@ethara.ai",
            department=choice([
                "IT",
                "HR",
                "Finance",
                "Admin",
                "Growth"
            ]),
            role=choice([
                "Developer",
                "QA",
                "Manager",
                "Analyst"
            ]),
            joining_date=date.today(),
            status="Active",
            project_id=choice(project_ids).id
        )
    )

    if i % 100 == 0:
        db.commit()

db.commit()

print("Seed Data Generated Successfully ✅")