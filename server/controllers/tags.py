from flask import Blueprint, request
from models.tag import Tag
from serializers.tag import TagSchema

from marshmallow.exceptions import ValidationError

# ! To Do: Add /folders to URL path and add secure route

tag_schema = TagSchema()

router = Blueprint(__name__, "tags")

@router.route("/tags", methods=["GET"])
def get_tags():
    tags = Tag.query.all()

    return tag_schema.jsonify(tags, many=True), 200


@router.route("/tags/<int:tag_id>", methods=["GET"])
def get_tag(tag_id):
    tag = Tag.query.get(tag_id)

    if not tag:
        return {"message": "Tag not found"}, 404

    return tag_schema.jsonify(tag), 200


@router.route("/tags", methods=["POST"])
def create_tag():
    tag_dictionary = request.json

    try:
        tag = tag_schema.load(tag_dictionary)
    except ValidationError as e:
        return {"errors": e.messages, "messages": "Something went wrong"}

    tag.save()

    return tag_schema.jsonify(tag), 200



@router.route("/tags/<int:tag_id>", methods=["PUT"])
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

@router.route("/tags/<int:tag_id>", methods=["DELETE"])
def remove_tag(tag_id):
    tag = Tag.query.get(tag_id)

    tag.remove()

    return {"message": "Tag deleted successfully"}, 200