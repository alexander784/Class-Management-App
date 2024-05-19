from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from alembic import op
import sqlalchemy as SQLAlchemy
from extension import db

from werkzeug.security import generate_password_hash, check_password_hash




## Define Models

class User(db.Model,SerializerMixin):

    # serialize_rules =  ("-subjects.user","-schedules.user","-messages.user")
      
    __tablename__  = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    is_instructor = db.Column(db.Boolean, default=False)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    @classmethod
    def get_user_by_username(cls, username):
        return cls.query.filter_by(username=username).first()
    
    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

##Relationships
    added_subjects = db.relationship('Subject', backref='added_by', lazy=True)
    enrolled_subjects = db.relationship('Subject', secondary="usersubjects", backref=db.backref('students', lazy='dynamic'))
    schedules = db.relationship("Schedule", backref="user", lazy=True, foreign_keys="Schedule.user_id")
    messages = db.relationship("Message", backref="added_by", lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'username': self.username,
            'email': self.email,
            'is_instructor': self.is_instructor,
            # Exclude certain relationships from serialization
            'added_subjects': [subject.id for subject in self.added_subjects],
            'enrolled_subjects': [subject.id for subject in self.enrolled_subjects],
            'schedules': [schedule.id for schedule in self.schedules],
            'messages': [message.id for message in self.messages],
        }

    



class Subject(db.Model, SerializerMixin):

    __tablename__  = "subjects"

    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String)
    code = db.Column(db.String)
    year = db.Column(db.Integer)
    compulsory = db.Column(db.Boolean)
    addedby = db.Column(db.Integer,db.ForeignKey("users.id"),nullable = False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'code': self.code,
            'year': self.year,
            'compulsory': self.compulsory,
            'addedby': self.addedby,
           
        }
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
     starttime = db.Column(db.String, nullable=False)
     endtime = db.Column(db.String, nullable=False)
     subject = db.Column(db.String, default="free")     
     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)


class Grade(db.Model):
    __tablename__ = 'grades'

    id = db.Column(db.Integer, primary_key=True)
    # student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    usersubject = db.Column(db.Integer, db.ForeignKey('usersubjects.id'), nullable=False)
    grade = db.Column(db.String(5) , nullable=True )
    created_at = db.Column(db.DateTime() , nullable=False , default=db.func.now)

    def to_dict(self):
        return {
            'id': self.id,
            'usersubject': self.usersubject,
            'grade': self.grade,
            'created_at': self.created_at
        }





class TokenBlockList(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String, nullable=False)
    create_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def save(self):
        db.session.add(self)
        db.session.commit()
    
    
    def __repr__(self) -> str:
        return f'<Token {self.jti}>'



    






    




    
    
    
    


    





    
    




    

