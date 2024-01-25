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
        return jsonify(subjects), 200

    
    
            

    







if __name__ == "__main__":
    app.run(debug=True)


