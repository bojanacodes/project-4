from flask import Blueprint, request, g
from models.tag import Tag
from models.folder import Folder
from serializers.tag import TagSchema
from decorators.secure_route import secure_route

from marshmallow.exceptions import ValidationError

# ! To Do: Add /folders to URL path and add secure route

tag_schema = TagSchema()

router = Blueprint(__name__, "tags")

#!test to get all the tags
@router.route("/tags", methods=["GET"])
def get_test_tags():
    tags = Tag.query.all()

    return tag_schema.jsonify(tags, many=True), 200


#! get all the tags associated with a folder


@router.route("/folders/<int:folder_id>/tags", methods=["GET"])
@secure_route
def get_tags(folder_id):
    folder = Folder.query.get(folder_id)
    id_to_search = folder_id

    if not folder:
        return { 'message': 'Folder not found' }, 404
    
    for item in g.current_user.folders:
    
        if item.id == folder_id:
            
            tags = Tag.query.filter_by(folder_id=id_to_search).all()

            return tag_schema.jsonify(tags, many=True), 200
    
    return {'errors': 'This is not your folder!'}, 401







#! get particular tag

@router.route("/folders/<int:folder_id>/tags/<int:tag_id>", methods=["GET"])
@secure_route
def get_tag(tag_id, folder_id):
   

    for item in g.current_user.folders:

        if item.id == folder_id:
            tag = Tag.query.get(tag_id)
            return tag_schema.jsonify(tag), 200

        if not tag:
            return {"message": "Tag not found"}, 404

    return {'errors': 'This is not your folder!'}, 401

    


@router.route("/folders/<int:folder_id>/tags", methods=["POST"])
@secure_route
def create_tag(folder_id):
    console.log('request.json in tag post', request.json)
    
    tag_dictionary = request.json
    folder = Folder.query.get(folder_id)

    try:
        for item in g.current_user.folders:

            if item.id == folder_id:

                tag = tag_schema.load(tag_dictionary)
                tag.save()
                folder.tags.append(tag)
                folder.save()
                return tag_schema.jsonify(tag), 200
    except ValidationError as e:
        return {"errors": e.messages, "messages": "Something went wrong"}

    return {'errors': 'This is not your folder!'}, 401


    



@router.route("/folders/<int:folder_id>/tags/<int:tag_id>", methods=["PUT"])
@secure_route
def update_tag(tag_id, folder_id):
    existing_tag = Tag.query.get(tag_id)
    tag_dictionary = request.json

    try:
         for item in g.current_user.folders:

            if item.id == folder_id:
                tag = tag_schema.load(
                    tag_dictionary,
                    instance=existing_tag,
                    partial=True,
                )
                tag.save()
                return tag_schema.jsonify(tag), 201

    except ValidationError as e:
        return {"errors": e.messages, "messages": "Something went wrong"}

    return {'errors': 'This is not your folder!'}, 401

  

@router.route("/folders/<int:folder_id>/tags/<int:tag_id>", methods=["DELETE"])
@secure_route
def remove_tag(tag_id, folder_id):

    for item in g.current_user.folders:

            if item.id == folder_id:
                tag = Tag.query.get(tag_id)

                tag.remove()

                return {"message": "Tag deleted successfully"}, 200
    return {'errors': 'This is not your folder!'}, 401