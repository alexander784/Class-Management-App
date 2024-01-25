from flask import Flask,request,Response,make_response, jsonify
from models import db, User,UserSubject,Subject,Grade,Schedule,Message
from flask_migrate import Migrate


app = Flask(__name__)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

db.init_app(app)

migrate = Migrate(app, db)




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
        newuser = User(username=request.form.get("name"),
                       password=request.form.get ("password"),
                       isInstructor=bool(request.form.get("IsInstructor")),
                       useremail=request.form.get("useremail"))
        
        db.session.add(newuser)
        db.session.commit()

        return make_response({"message":"Created successfully"},201)
    
@app.route('/schedule', methods=['GET'])
def get_schedule():
    schedules = Schedule.query.all()
    schedules_list = [{'id': schedule.id, 'day': schedule.day, 'time': schedule.time,
                        'subject': schedule.subject} for schedule in schedules]
    return make_response(jsonify(schedules_list), 200)

@app.route('schedule/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def manage_schedule(id):
    schedule = Schedule.query.filter_by(id=id).first()
    if not schedule:
        return make_response(jsonify({'message':'Schedule not found'}))
    else:
        if request.method == 'GET':
            return make_response(jsonify({'id': schedule.id, 'day': schedule.day, 'time': schedule.time, 'subject': schedule.subject}), 200)
        elif request.method == 'PUT':
            db.session.commit()
            return make_response(jsonify({'message': 'Schedule updated successfully'}), 201)
        elif request.method == 'DELETE':
            db.session.delete(schedule)
            db.session.commit()
            return make_response(jsonify({'message': 'Schedule deleted successfully'}), 200)


    







if __name__ == "__main__":
    app.run(debug=True)


