from flask import Blueprint, request
from models.folder import Folder
from serializers.folder import FolderSchema
from marshmallow.exceptions import ValidationError

folder_schema = FolderSchema()

router = Blueprint(__name__, "users")

@router.route("/folders", methods=["GET"])
def get_all_the_folders():

    folders = Folder.query.all()

    return  folder_schema.jsonify(folders, many=True), 200

@router.route("/folders/<int:folder_id>", methods=["GET"])
def get_single_folder(folder_id):
    folder = Folder.query.get(folder_id)

    if not folder:
        return { 'message': 'Link not found' }, 404
    
    return folder_schema.jsonify(folder), 200

@router.route("/folders", methods=["POST"])
def make_folder():
    folder_dictionary = request.json
  
    try:
  
        folder = folder_schema.load(folder_dictionary)
    except ValidationError as e:
        return { 'errors': e.messages, 'messages': 'Something went wrong' }

    folder.save()

    return folder_schema.jsonify(folder), 200

@router.route("/folders/<int:folder_id>", methods=["PUT"])
def update_folder(folder_id):

    existing_folder = Folder.query.get(folder_id)
    folder_dictionary = request.json

    try:

        folder = folder_schema.load(

            folder_dictionary,
            instance=existing_folder,
            partial=True
        )

    except ValidationError as e:
        return { 'errors': e.messages, 'messages': 'Something went wrong' }

    folder.save()

    return folder_schema.jsonify(folder), 201

@router.route("/folders/<int:folder_id>", methods=["DELETE"])
def remove_folder(folder_id):
    folder = Folder.query.get(folder_id)

    folder.remove()

    return { 'message': 'Folder deleted successfully' }, 200







