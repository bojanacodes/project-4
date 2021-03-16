from flask import Blueprint, request, g
from models.user import User
from serializers.user import UserSchema
from marshmallow.exceptions import ValidationError
from decorators.secure_route import secure_route
from models.folder import Folder

user_schema = UserSchema()

router = Blueprint(__name__, "users")

# ! To Do: Add PUT and DEL routes, add secure routes

@router.route("/test", methods=["GET"])
def test():
    test_data = {
        "name": "test"
    }
    return test_data, 200


@router.route("/signup", methods=["POST"])
def signup():

    try:
        user = user_schema.load(request.json)

    except ValidationError as e:
        return { 'errors': e.messages, 'messages': 'Something went wrong.' }

    user.save()
    print("Sign up succesfull")
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

@router.route('/profile', methods=['DELETE'])
@secure_route
def delete_profile():
    user = User.query.get(g.current_user.id)

    user.remove()

    return { 'message': 'User deleted successfully' }, 200


# add a collaborator
@router.route("/folders/<int:folder_id>/users", methods=["POST"])
@secure_route
def add_user(folder_id):
    user_dictionary = request.json
    folder = Folder.query.get(folder_id)

    try:
        for item in g.current_user.folders:

            if item.id == folder_id:

                user = user_schema.load(user_dictionary)
                user.save()
                folder.tags.append(user)
                folder.save()
                return tag_schema.jsonify(tag), 200
    except ValidationError as e:
        return {"errors": e.messages, "messages": "Something went wrong"}

    return {'errors': 'This is not your folder!'}, 401