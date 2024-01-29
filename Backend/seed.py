from models import Schedule, User, db 
from app import app

import random


def seed_data():
    fixed_days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    fixed_times = [
        {"starttime": "8:00 AM", "endtime": "9:00 AM"},
        {"starttime": "9:00 AM", "endtime": "10:00 AM"},
        {"starttime": "10:00 AM", "endtime": "11:00 AM"},
        {"starttime": "11:00 AM", "endtime": "12:00 PM"},
        {"starttime": "1:00 PM", "endtime": "2:00 PM"},
        {"starttime": "2:00 PM", "endtime": "3:00 PM"},
        {"starttime": "3:00 PM", "endtime": "4:00 PM"},
        {"starttime": "4:00 PM", "endtime": "5:00 PM"},
    ]

    subjects = ["AMA201", "AMA202", "CIS200", "CIS230", "C12315", "COM410", "COM401"]

    for day in fixed_days:
        for time_range in fixed_times:
            starttime = time_range['starttime']
            endtime = time_range['endtime']
            subject = random.choice(subjects)  
            new_schedule = Schedule(day=day, starttime=starttime, endtime=endtime, subject=subject, user_id=1)
            db.session.add(new_schedule)

    db.session.commit()

if __name__ == "__main__":
    with app.app_context():
        seed_data()
        print("Seed data added to the database.")
