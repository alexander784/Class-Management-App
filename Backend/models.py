from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from alembic import op
import sqlalchemy as sa


db = SQLAlchemy()


## Define Models

class User(db.Model,SerializerMixin):
      
    __tablename__  = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    is_instructor = db.Column(db.Boolean, default=False)

##Relationships
    added_subjects = db.relationship('Subject', backref='added_by', lazy=True)
    enrolled_subjects = db.relationship('Subject', secondary="usersubjects", backref=db.backref('students', lazy='dynamic'))
    schedules = db.relationship("Schedule", backref="user", lazy=True, foreign_keys="Schedule.user_id")
    messages = db.relationship("Message", backref="added_by", lazy=True)


class Subject(db.Model, SerializerMixin):

    __tablename__  = "subjects"

    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String)
    code = db.Column(db.String)
    year = db.Column(db.Integer)
    compulsory = db.Column(db.Boolean)
    addedby = db.Column(db.Integer,db.ForeignKey("users.id"),nullable = False)
## Implement Methods
    def get_student_subjects(self):
        if not self.is_instructor:
            return self.subjects.all()
        else:
            return []

    def get_instructor_subjects(self):
        if self.is_instructor:
            return Subject.query.filter_by(added_by_id=self.id).all()
        else:
            return []
        
class UserSubject(db.Model):
    __tablename__='usersubjects'

    id = db.Column(db.Integer, primary_key=True)
    user_id=db.Column(db.Integer, db.ForeignKey('users.id'))
    subject_id=db.Column(db.Integer, db.ForeignKey('subjects.id'))

    grade = db.relationship('Grade', backref='grades.id', lazy=True)


class Message(db.Model):

    __tablename__  = "messages"

    id = db.Column(db.Integer, primary_key=True)
    addedby = db.Column(db.Integer,db.ForeignKey("users.id"))
    to = db.Column(db.Integer)
    content = db.Column(db.String)
    


class Schedule(db.Model):

     __tablename__  = "schedules"

     id = db.Column(db.Integer, primary_key=True)
     day = db.Column(db.String, nullable=False)
     time = db.Column(db.Integer, nullable=False)
     subject = db.Column(db.String, default="free")     
     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)


class Grade(db.Model):
    __tablename__ = 'grades'

    id = db.Column(db.Integer, primary_key=True)
    # student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    usersubject = db.Column(db.Integer, db.ForeignKey('usersubjects.id'), nullable=False)
    grade = db.Column(db.String(5) , nullable=True )
    created_at = db.Column(db.DateTime() , nullable=False , default=db.func.now)



    






    




    
    
    
    


    





    
    




    

