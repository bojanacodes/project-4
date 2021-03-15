from flask import Blueprint, request, g
from models.user import User
from serializers.user import UserSchema
from marshmallow.exceptions import ValidationError
from decorators.secure_route import secure_route

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

# ! Remove before deploying
@router.route("/users", methods=["GET"])
def get_all_the_users():

    users = User.query.all()
    return user_schema.jsonify(users, many=True), 200


@router.route('/login', methods=['POST'])
def login():
  
    user = User.query.filter_by(email=request.json['email']).first()

    if not user:
        return { 'message': 'No user found for this email' }
   
    if not user.validate_password(request.json['password']):
        return { 'message' : 'You are not authorized' }, 402

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

@router.route('/profile', methods=['PUT'])
@secure_route
def update_profile():

    existing_user = User.query.get(g.current_user.id)
    user_dictionary = request.json

    user = user_schema.load(

                user_dictionary,
                instance=existing_user,
                partial=True)

    user.save()

    return user_schema.jsonify(user), 201

