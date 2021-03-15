from flask import Blueprint, request, g
from models.user import User
from serializers.user import UserSchema
from marshmallow.exceptions import ValidationError
from decorators.secure_route import secure_route

user_schema = UserSchema()

router = Blueprint(__name__, "users")

# ! To Do: Add PUT and DEL routes, add secure routes

@router.route("/signup", methods=["POST"])
def signup():

    try:
        user = user_schema.load(request.json)

    except ValidationError as e:
        return { 'errors': e.messages, 'messages': 'Something went wrong.' }

    user.save()

    return user_schema.jsonify(user)

# ! Remove before deploying
@router.route("/users", methods=["GET"])
def get_all_the_users():

    users = User.query.all()
    return user_schema.jsonify(users, many=True), 200


@router.route('/login', methods=['POST'])
def login():
    # ! 1) Get that user by their email/username, check if they exist.
    user = User.query.filter_by(email=request.json['email']).first()

    if not user:
        return { 'message': 'No user found for this email' }
    # ! 2) Check the password by hashing it, then using bcrypt to compare it to the one in the db.
    # ? To do this, let's create a method validate_password on the user model.
    if not user.validate_password(request.json['password']):
        return { 'message' : 'You are not authorized' }, 402

    # ! 3) Generate a token to send back (for them to attach to POST's, PUT's, DELETE's etc.)
    # ? Another method on user model generate_token (JWT)
    token = user.generate_token()

    return { 'token': token, 'message': 'Welcome back!' }



#! get single user information for the owner

# @router.route("/users/<int:user_id>", methods=["GET"])
# @secure_route
# def get_single_user(user_id):
#     user = User.query.get(user_id)

#     if not user:
#         return { 'message': 'Link not found' }, 404
    
#     return user_schema.jsonify(user), 200


@router.route('/profile', methods=['GET'])
@secure_route
def get_user_profile():
    
    print(g.current_user.email)
    return user_schema.jsonify(g.current_user), 200
