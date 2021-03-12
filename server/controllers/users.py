from flask import Blueprint, request
from models.user import User
from serializers.user import UserSchema
from marshmallow.exceptions import ValidationError

user_schema = UserSchema()

router = Blueprint(__name__, "users")

@router.route("/signup", methods=["POST"])
def signup():

    try:
        user = user_schema.load(request.json)

    except ValidationError as e:
        return { 'errors': e.messages, 'messages': 'Something went wrong.' }

    user.save()

    return user_schema.jsonify(user)


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



@router.route("/users", methods=["GET"])
def get_users():

    users = User.query.all()


    return  user_schema.jsonify(users, many=True), 200
