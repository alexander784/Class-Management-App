from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

# Define Models
class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    is_instructor = db.Column(db.Boolean, default=False)
    schedule_id = db.Column(db.Integer, db.ForeignKey('schedules.id'))
    schedule = db.relationship("Schedule", backref="user", lazy=True)

    subjects_added = db.relationship('Subject', backref='added_by', lazy=True)

    def get_student_subjects(self):
        if not self.is_instructor:
            return self.subjects_added
        else:
            return []

    def get_instructor_subjects(self):
        if self.is_instructor:
            return Subject.query.filter_by(addedby=self.id).all()
        else:
            return []

class Subject(db.Model):
    __tablename__  = "subjects"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    code = db.Column(db.String)
    year = db.Column(db.Integer)
    compulsory = db.Column(db.Boolean)
    addedby = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

class UserSubjectAssociation(db.Model):
    __tablename__ = 'usersubjects'
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    subject_id = db.Column(db.Integer, db.ForeignKey('subjects.id'), primary_key=True)

class Message(db.Model):
    __tablename__  = "messages"

    id = db.Column(db.Integer, primary_key=True)
    addedby = db.Column(db.Integer, db.ForeignKey("users.id"))
    to = db.Column(db.Integer)
    content = db.Column(db.String)

class Schedule(db.Model):
    __tablename__  = "schedules"

    id = db.Column(db.Integer, primary_key=True)
    day = db.Column(db.String, nullable=False)
    time = db.Column(db.Integer, nullable=False)
    Subject = db.Column(db.String, default="free")

class Grade(db.Model):
    __tablename__ = 'grades'

    id = db.Column(db.Integer, primary_key=True)
    usersubject_id = db.Column(db.Integer, db.ForeignKey('usersubjects.user_id'), nullable=False)
    grade = db.Column(db.String(5), nullable=True)
    created_at = db.Column(db.DateTime(), nullable=False, default=db.func.now())

    usersubject = db.relationship('UserSubjectAssociation', backref='grades')
