from flask import Flask,request,Response,make_response
from models import db, User,UserAttendance,Usersubject,Subject,Content,Attendance
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
    
    
            

@app.route('/user/attendance', methods=['GET','POST'])
def attendance():
    attendances=[attendance.to_dict() for attendance in Attendance.query.all() ]    
    return make_response(attendances,200)








if __name__ == "__main__":
    app.run(debug=True)


