from extension import db
from app import app
from models import Schedule
from flask import Flask
    

def recreate_schedules_table():

    with app.app_context():
        db.create_all()

if __name__ == '__main__':
    recreate_schedules_table()
