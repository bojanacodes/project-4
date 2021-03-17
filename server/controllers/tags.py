from flask import Blueprint, request, g
from models.tag import Tag
from models.folder import Folder
from models.link import Link
# from models.links_tag import Links_tag_join
from serializers.tag import TagSchema
from serializers.link import LinkSchema
from decorators.secure_route import secure_route

from marshmallow.exceptions import ValidationError

# ! To Do: Add /folders to URL path and add secure route

tag_schema = TagSchema()
link_schema = LinkSchema()

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







#! get particular tag and links associated with it

@router.route("/folders/<int:folder_id>/tags/<int:tag_id>", methods=["GET"])
@secure_route
def get_tag(tag_id, folder_id):
    # print('existing tag', existing_tag)
    tag = Tag.query.get(tag_id)
    # tags = Tag.query.all()

    links = Link.query.all()

    for item in g.current_user.folders:

        if item.id == folder_id:
# ! here
            tag = Tag.query.filter_by(id = tag_id).first()
            print('tag', tag)
            # links = tag.links.get.all()
            links = Link.query.join(Link.tags).filter_by(id=tag_id).all()
            print('links', links)
            # links = Link.query.filter_by(Link.tag_id = tag_id)
            # tag = Tag.query.get(tag_id)
            # return tag_schema.jsonify(tag), 200
            return link_schema.jsonify(links, many=True), 200

        if not tag:
            return {"message": "Tag not found"}, 404

    return {'errors': 'This is not your folder!'}, 401

@router.route("/folders/<int:folder_id>/links/<int:link_id>/tags", methods=["POST"])
@secure_route
def post_tags_to_link(folder_id, link_id):
    
    tag_dictionary = request.json
    print('tag dictionary', tag_dictionary)

    tag = Tag.query.filter_by(name=tag_dictionary['name']).first()



    # folder = Folder.query.get(folder_id)

    try:
        for item in g.current_user.folders:

            if item.id == folder_id:

                link = Link.query.get(link_id)
                print('link in tags controller', link)

                print('link in post tags to link', link)
                print('item', item)
                
                link.tags.append(tag)
                link.save()
                print('link tags', link.tags)

        # ! Check if this is what should be returned
                
        return link_schema.jsonify(link), 200

    except ValidationError as e:
        return {"errors": e.messages, "messages": "Something went wrong"}

    return {'errors': 'This is not your folder!'}, 401
    
@router.route("/folders/<int:folder_id>/tags", methods=["POST"])
@secure_route
def create_tag(folder_id):
    
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