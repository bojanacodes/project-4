from flask import Blueprint, request

router = Blueprint(__name__, "links")


@router.route("/links", methods=["GET"])
def get_all_the_links():
    return "Get every link", 200


@router.route("/links", methods=["POST"])
def make_link():
    return "TODO: Make link", 200


@router.route("/links/<int:link_id>", methods=["GET"])
def get_single_link(link_id):
    return "TODO: Get single link", 200


@router.route("/links/<int:link_id>", methods=["PUT"])
def update_link(link_id):
    return "TODO: Update link", 200


@router.route("/links/<int:links_id>", methods=["DELETE"])
def remove_link(link_id):
    return "TODO: Remove a link", 200


@router.route("/ping", methods=["GET"])
def test():
    return "The cake is a lie, but everything is up and running.", 200
