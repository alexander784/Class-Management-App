from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin


db = SQLAlchemy()



class User(db.Model, SerializerMixin):

    __tablename__  = "users"


    id = db.Column(db.Integer,primary_key=True)
    username = db.Column(db.String)
    useremail = db.Column(db.String)
    password =db.Column(db.String)
    isInstructor = db.Column(db.Boolean)

class Subject(db.Model):

    __tablename__  = "subjects"
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String)

class Usersubject(db.Model):

    __tablename__  = "userSubjects"


    id = db.Column(db.Integer,primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"))
    subjectId = db.Column(db.Integer, db.ForeignKey("subjects.id"))

class Content(db.Model):

    __tablename__  = "contents"

    id = db.Column(db.Integer,primary_key=True)
    title = db.Column(db.String)
    resource = db.Column(db.String)

class Attendance(db.Model):

    __tablename__  = "attendances"

    id = db.Column(db.Integer,primary_key=True)
    date = db.Column(db.DateTime,server_default=db.func.now())
    attended= db.Column(db.Boolean)


class UserAttendance(db.Model):


    __tablename__  = "userAttendances"

    id = db.Column(db.Integer,primary_key=True)
    userId = db.Column(db.Integer,db.ForeignKey("users.id"))
    attendanceId = db.Column(db.Integer, db.ForeignKey("attendances.id"))
    




    
    
    
    


    





    
    




    

