from flask import Blueprint, request
from models.tag import Tag
from serializers.tag import TagSchema

from marshmallow.exceptions import ValidationError

tag_schema = TagSchema()

router = Blueprint(__name__, "tags")

#test to get all the tags
@router.route("/tags", methods=["GET"])
def get_test_tags():
    tags = Tag.query.all()

    return tag_schema.jsonify(tags, many=True), 200


#! get all the tags associated with a folder


@router.route("/folders/<int:folder_id>/tags", methods=["GET"])
def get_tags():
    tags = Tag.query.all()

    return tag_schema.jsonify(tags, many=True), 200



#! get particular tag

@router.route("/folders/<int:folder_id>/tags/<int:tag_id>", methods=["GET"])
def get_tag(tag_id):
    tag = Tag.query.get(tag_id)

    if not tag:
        return {"message": "Tag not found"}, 404

    return tag_schema.jsonify(tag), 200


@router.route("/folders/<int:folder_id>/tags", methods=["POST"])
def create_tag():
    tag_dictionary = request.json

    try:
        tag = tag_schema.load(tag_dictionary)
    except ValidationError as e:
        return {"errors": e.messages, "messages": "Something went wrong"}

    tag.save()

    return tag_schema.jsonify(tag), 200



@router.route("/folders/<int:folder_id>/tags/<int:tag_id>", methods=["PUT"])
def update_tag(tag_id):
    existing_tag = Tag.query.get(tag_id)
    tag_dictionary = request.json

    try:
        tag = tag_schema.load(
            tag_dictionary,
            instance=existing_tag,
            partial=True,
        )

    except ValidationError as e:
        return {"errors": e.messages, "messages": "Something went wrong"}

    tag.save()

    return tag_schema.jsonify(tag), 201

@router.route("/folders/<int:folder_id>/tags/<int:tag_id>", methods=["DELETE"])
def remove_tag(tag_id):
    tag = Tag.query.get(tag_id)

    tag.remove()

    return {"message": "Tag deleted successfully"}, 200