from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin


db = SQLAlchemy()


## Define Models

class User(db.Model, SerializerMixin):
      
    __tablename__  = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    is_instructor = db.Column(db.Boolean, default=False)
    subjects = db.relationship('Subject', secondary="user_subjects", backref=db.backref('students', lazy='dynamic'))


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
    addedby = db.Column(db.Integer,db.ForeignKey("user.id"),nullable = False)
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
    __tablename__='user_subjects'
    
    user_id=db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    subject_id=db.Column(db.Integer, db.ForeignKey('subject.id'), primary_key=True)

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



     



     






    




    
    
    
    


    





    
    




    

