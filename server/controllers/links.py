from flask import Blueprint, request, g

#import the models
from models.link import Link
from models.comment import Comment
from models.tag import Tag
from models.folder import Folder

#importing all the schemas
from serializers.link import LinkSchema
from serializers.comment import CommentSchema
from serializers.tag import TagSchema
from serializers.folder import FolderSchema
from decorators.secure_route import secure_route

link_schema = LinkSchema()
tag_schema = TagSchema()
folder_schema = FolderSchema()


from marshmallow.exceptions import ValidationError

comment_schema = CommentSchema()

router = Blueprint(__name__, "links")

#! Change their URL paths to include /folders etc
# ! Add secure route 


@router.route("/folders/<int:folder_id>/links", methods=["GET"])
@secure_route
def get_all_folder_links(folder_id):


    folder = Folder.query.get(folder_id)
    
    id_to_search = folder_id

    if not folder:
        return { 'message': 'Folder not found' }, 404

    for item in g.current_user.folders:
        
        if item.id == folder_id:
            
            links = Link.query.filter_by(folder_id=id_to_search).all()
            
            return link_schema.jsonify(links, many=True), 200
        
    return {'errors': 'This is not your folder!'}, 401


@router.route("/folders/<int:folder_id>/links/<int:link_id>", methods=["GET"])
@secure_route
def get_single_link(folder_id, link_id):

    folder = Folder.query.get(folder_id)

    if not folder:
        return { 'message': 'Folder not found' }, 404

    for item in g.current_user.folders:
        
        if item.id == folder_id:
            
            link = Link.query.get(link_id)
            
            return link_schema.jsonify(link), 200
        
    return {'errors': 'This is not your folder!'}, 401


@router.route("/folders/<int:folder_id>/links", methods=["POST"])
@secure_route
def make_link(folder_id):
    
    link_dictionary = request.json
  
    try:
        
        link = link_schema.load(link_dictionary)
        print('link in link controller', link)
    except ValidationError as e:
        return { 'errors': e.messages, 'messages': 'Something went wrong' }

    link.save()

    existing_folder = Folder.query.get(folder_id)

    existing_folder.links.append(link)
    existing_folder.save()

    return link_schema.jsonify(link), 200


@router.route("/folders/<int:folder_id>/links/<int:link_id>", methods=["PUT"])
@secure_route
def update_link(folder_id, link_id):

    existing_link = Link.query.get(link_id)
    link_dictionary = request.json

    existing_folder = Folder.query.get(folder_id)

    try:
        for item in g.current_user.folders:
            if item.id == existing_folder.id:
                link = link_schema.load(

                link_dictionary,
                instance=existing_link,
                partial=True
            )
                link.save()

    except ValidationError as e:
        return { 'errors': e.messages, 'messages': 'Something went wrong' }

    return link_schema.jsonify(link), 201

@router.route("/folders/<int:folder_id>/links/<int:link_id>", methods=["DELETE"])
@secure_route
def remove_link(folder_id, link_id):

    link = Link.query.get(link_id)
    folder = Folder.query.get(folder_id)

    try:
        for item in g.current_user.folders:
            if item.id == folder.id:

                link.remove()

                return { 'message': 'Link deleted successfully' }, 200

    except ValidationError as e:
        return { 'errors': e.messages, 'messages': 'Something went wrong' }


# ? Comments
@router.route('/folders/<int:folder_id>/links/<int:link_id>/comments', methods=['POST'])
@secure_route
def create_comment(folder_id, link_id):

    comment_dictionary = request.json

    link = Link.query.get(link_id)

    try:
        for item in g.current_user.folders:
            if item.id == folder_id:

                comment = comment_schema.load(comment_dictionary)
    
                comment.link = link
                comment.user = g.current_user

                comment.save()
                
                return comment_schema.jsonify(comment)

    except ValidationError as e:
        return { 'errors': e.messages, 'messages': 'Something went wrong' }

    
    return {'errors': 'This is not your folder!'}, 401


@router.route('/folders/<int:folder_id>/links/<int:link_id>/comments/<int:comment_id>', methods=['DELETE'])
@secure_route
def remove_comment(folder_id, link_id, comment_id):

    comment = Comment.query.get(comment_id)
    link = Link.query.get(link_id)

    try:

        for item in g.current_user.folders:

            if item.id == folder_id and comment.user_id == g.current_user.id:
                comment.remove()
                return link_schema.jsonify(link), 202
    
    except ValidationError as e:
        return { 'errors': e.messages, 'messages': 'Something went wrong' }

    return {'errors': 'This is not your comment!'}, 401

   
@router.route('folders/<int:folder_id>/links/<int:link_id>/comments/<int:comment_id>', methods=['PUT'])
@secure_route
def update_comment(folder_id, link_id, comment_id):

    comment_dictionary = request.json
    existing_comment = Comment.query.get(comment_id)

    try:
        for item in g.current_user.folders:
            if item.id == folder_id and existing_comment.user_id == g.current_user.id:

                comment = comment_schema.load(
                    comment_dictionary,
                    instance=existing_comment,
                    partial=True
                    )

                comment.save()
                link = Link.query.get(link_id)

                return link_schema.jsonify(link), 201
                
    except ValidationError as e:
        return { 'errors': e.messages, 'messages': 'Something went wrong' }

    return {'errors': 'This is not your comment!'}, 401


# # ? Tags 

# @router.route("/links/<int:link_id>/tags/<int:tag_id>", methods=["POST"])
# def add_tag_to_link(link_id, tag_id):
#     link = Link.query.get(link_id)

#     tag = Tag.query.get(tag_id)

#     link.tags.append(tag)

#     link.save()

#     return link_schema.jsonify(link), 200


# @router.route("/links/<int:link_id>/tags/<int:tag_id>", methods=["DELETE"])
# def remove_link_tag(link_id, tag_id):

#     link = Link.query.get(link_id)

#     tag = Tag.query.get(tag_id)

#     link.tags.remove(tag)

#     link.save()

#     return link_schema.jsonify(link), 200
