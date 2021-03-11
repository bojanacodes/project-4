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

@router.route("/users", methods=["GET"])
def get_all_the_users():

    users = User.query.all()

    return  user_schema.jsonify(users, many=True), 200