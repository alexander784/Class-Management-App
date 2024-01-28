from flask import Flask,request,Response,make_response, jsonify
from models import db, User,UserSubject,Subject,Grade,Schedule,Message
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from auth import auth_bp
from extension import jwt
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()



app = Flask(__name__)


app.config['SECRET_KEY'] = os.getenv('FLASK_SECRET_KEY')
app.config['JWT_SECRET_KEY'] = os.getenv('FLASK_JWT_SECRET_KEY')



app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config.from_prefixed_env()
app.json.compact = False

db.init_app(app)
jwt.init_app(app)
app.register_blueprint(auth_bp,url_prefix='/auth')

migrate = Migrate(app, db)
CORS(app)




@app.route('/')
def index():
    return "Hello World!"


@app.route('/users', methods = ["GET" ,"POST"])
def users():
    if request.method == "GET":
        users = []
        for user in User.query.all():
            users.append(user.to_dict())

        return make_response(users, 200)
    elif request.method == "POST":
        newuser = User(username=request.form.get("username"),
                       password=request.form.get ("password"),
                       is_instructor=bool(request.form.get("IsInstructor")),
                       email=request.form.get("useremail"),
                       name=request.form.get('name'))
        
        db.session.add(newuser)
        db.session.commit()

        return make_response({"message":"Created successfully"},201)
    
    
@app.route('/subjects',methods=['GET','POST'])
def subjects():
    
      if request.method == 'GET':
          subjects = [subject.to_dict() for subject in Subject.query.all()]
          return make_response(jsonify(subjects), 200)
      
      elif request.method == 'POST':
          try:
        #   newSubject=Subject(name=request.form.get('name'),
        #                      code=request.form.get('code'),
        #                      year=int(request.form.get('year')),
        #                      compulsory=bool(request.form.get('compulsory')),
        #                      added_by=int(request.form.get('added_by')))
        
              name = request.form.get('name')
              code = request.form.get('code')
              year = int(request.form.get('year'))
              compulsory = bool(request.form.get('compulsory'))
              added_by_id = int(request.form.get('added_by'))
              
              # Check if the user exists
              added_by_user = User.query.get(added_by_id)
              if not added_by_user:
                  return jsonify({"error": "User not found"}), 404
  
              new_subject = Subject(
                  name=name,
                  code=code,
                  year=year,
                  compulsory=compulsory,
                  addedby=added_by_id
              )
  
              db.session.add(new_subject)
              db.session.commit()
  
              return make_response(new_subject.to_dict(), 201)
       
      
          except ValueError as e:
              return jsonify({"error": "Invalid data format"}), 400
          except Exception as e:
              return jsonify({"error": str(e)}), 500      
        #   Handle Subjects
@app.route('/subjects/<int:id>',methods=['PATCH','GET','DELETE'])
def subject_by_id(id):
    subject= Subject.query.filter(Subject.id == id).first()
    if not subject:
        response_body = {"error": "subject not found"}
        return make_response(response_body, 404)
    else:
        if request.method == 'GET':
            return make_response(subject.to_dict(), 200)
        elif request.method == 'PATCH':
            data = request.json
            for field in ['year', 'compulsory']:
                if field in data:
                    setattr(subject, field, data[field])
            db.session.commit()
            return make_response(jsonify({'message': 'Subject updated successfully'}), 201)
        elif request.method == 'DELETE':
            db.session.delete(subject)
            db.session.commit()
            
            return make_response({"message":"Deleted succesfuly"}, 200)
              
        
        
    #Handle schedule
@app.route('/schedule', methods=['POST'])
def create_schedule():
    data = request.json 

    if not all(field in data for field in ['day', 'time', 'subject', 'user_id']):
        return make_response(jsonify({'message': 'Missing required fields'}), 400)

    new_schedule = Schedule(
        day=data['day'],
        time=data['time'],
        subject=data['subject'],
        user_id=data['user_id'],
    )

    db.session.add(new_schedule)
    db.session.commit()

    return make_response(jsonify({'message': 'Schedule created successfully', 'id': new_schedule.id}), 201)
    
@app.route('/schedule', methods=['GET'])
def get_schedule():
    schedules = Schedule.query.all()
    schedules_list = [{'id': schedule.id, 'day': schedule.day, 'time': schedule.time,
                        'subject': schedule.subject} for schedule in schedules]
    return make_response(jsonify(schedules_list), 200)

@app.route('/schedule/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def manage_schedule(id):
    schedule = Schedule.query.filter_by(id=id).first()
    
    if not schedule:
        return make_response(jsonify({'message': 'Schedule not found'}), 404)

    if request.method == 'GET':
        return make_response(jsonify({'id': schedule.id, 'day': schedule.day, 'time': schedule.time, 'subject': schedule.subject}), 200)
    elif request.method == 'PATCH':
        data = request.json  
        for field in ['day', 'time', 'subject']:
            if field in data:
                setattr(schedule, field, data[field])
        db.session.commit()
        return make_response(jsonify({'message': 'Schedule updated successfully'}), 201)
    elif request.method == 'DELETE':
        db.session.delete(schedule)
        db.session.commit()
        return make_response(jsonify({'message': 'Schedule deleted successfully'}), 200)
    
# Handle Schedule
@app.route('/messages', methods=['GET', 'POST'])
def manage_messages():
    if request.method == 'GET':
        messages = Message.query.all()
        messages_list = [{'id': message.id, 'author': message.author, 'content': message.content} for message in messages]
        return jsonify(messages_list)
    elif request.method == 'POST':
        data = request.get_json()
        new_message = Message(author=data['author'], content=data['content'])
        db.session.add(new_message)
        db.session.commit()
        return jsonify({'id': new_message.id, 'author': new_message.author, 'content': new_message.content})
    


@app.route('/messages/<int:message_id>', methods=['GET', 'PUT', 'DELETE'])
def manage_message(message_id):
    message = Message.query.get(message_id)

    if not message:
        return jsonify({'error': 'Message not found'}), 404

    if request.method == 'GET':
        return jsonify({
            'id': message.id,
            'addedby': message.addedby,
            'to': message.to,
            'content': message.content
        })

    elif request.method == 'PUT':
        data = request.get_json()
        message.content = data.get('content', message.content)
        db.session.commit()
        return jsonify({
            'id': message.id,
            'addedby': message.addedby,
            'to': message.to,
            'content': message.content
        })

    elif request.method == 'DELETE':
        db.session.delete(message)
        db.session.commit()
        return jsonify({'message': 'Message deleted'})


    
    
            

    







if __name__ == "__main__":
    app.run(debug=True)


