from app import ma
from models.folder import Folder

from marshmallow import fields

class FolderSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Folder
        load_instance = True

    links = fields.Nested("LinkSchema", many=True)
    tags = fields.Nested("TagSchema", many=True)
    user = fields.Nested('UserSchema', many=True)
