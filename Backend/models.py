from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin


db = SQLAlchemy()


## Define Models

class User(db.Model, SerializerMixin):

    __tablename__  = "users"


    id = db.Column(db.Integer,primary_key=True)
    username = db.Column(db.String)
    useremail = db.Column(db.String)
    password =db.Column(db.String)
    is_instructor = db.Column(db.Boolean, default=False)


    ##Relationships
    schedule = db.relationship("schedule", backref="user", lazy= True )
    message = db.relationship("message", backref= "added_by", lazy= True)
    subjects = db.relationship('Subject', backref='added_by', lazy=True)


class Subject(db.Model):

    __tablename__  = "subjects"
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String)
    code = db.Column(db.String)
    year = db.Column(db.Integer)
    compulsory = db.Column(db.Boolean)
    addedby = db.Column(db.Integer,db.ForeignKey("users.id"))

class Message(db.Model):

    __tablename__  = "messages"

    id = db.column(db.Integer, primary_key=True)
    username = db.Column(db.String,)
    addedby = db.Column(db.Integer,db.ForeignKey("users.id"))


class schedule(db.Model):

     __tablename__  = "schedules"

     id = db.column(db.Integer, primary_key=True)
     day = db.Column(db.String, nullable=False)
     time = db.Column(db.Integer, nullable=False)
     Subject = db.Column(db.String, default="free")


     



     






    




    
    
    
    


    





    
    




    

