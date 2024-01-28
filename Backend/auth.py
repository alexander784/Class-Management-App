from flask import Blueprint
from flask import jsonify, request
from models import TokenBlockList, User
from flask_jwt_extended import create_access_token, create_refresh_token, current_user, get_jwt, get_jwt_identity, jwt_required

auth_bp = Blueprint('app', __name__)

##Handle user registration
@auth_bp.post('/register')
def register_user():
    data = request.get_json()
    user = User.get_user_by_username(username=data.get('username'))
    if user is not None:
        return jsonify({"error": "user already exist"}), 403

    new_user = User(
        username=data.get('username'),
        email=data.get('email'),
        name=data.get('name')
    )

    new_user.set_password(password=data.get('password'))
    new_user.save()

    return jsonify({"message": "user Created"}), 201
# Handle user login
@auth_bp.post('/login')
def login_user():
    data = request.get_json()
    print(data)
    
    user = User.get_user_by_username(username=data.get('username'))  

    
    if user and (user.check_password(password=data.get('password'))):
        access_token = create_access_token(identity=user.username)
        refresh_token = create_refresh_token(identity=user.username)
        return jsonify({"message": "Logged In",
                        "tokens": {
                            "access": access_token,
                            "refresh": refresh_token
                        }
                        }

                       ), 200
    return jsonify({"Error":"Invalid username or password"}), 400

@auth_bp.get('/whoami')
@jwt_required()
def whoami():

    return jsonify({
        "message": "message",
        "user_details": {
            "username": current_user.username, "email": current_user.email
        }
    })
    
@auth_bp.get('/refresh')
@jwt_required(refresh=True)
def refresh_access():
    identity = get_jwt_identity()

    new_acces_token = create_access_token(identity=identity)

    return jsonify({"access_token": new_acces_token})


@auth_bp.get('/logout')
@jwt_required(verify_type=False)
def logout():
    jwt = get_jwt()

    jti = jwt['jti']
    token_type =jwt['type']

    token_b = TokenBlockList(jti=jti)
    token_b.save()

    return jsonify({"message": f"{token_type} token revoked successfully"})
