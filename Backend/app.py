from flask import Flask
from models import db, User,UserAttendance,Usersubject,Subject,Content
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





if __name__ == "__main__":
    app.run(debug=True)


