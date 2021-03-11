from app import ma
from models.link import Link

# ! Import fields from marshmallow
from marshmallow import fields

class LinkSchema(ma.SQLAlchemyAutoSchema):
    
    class Meta:

        model = Link

        load_instance = True

    # ! This will nest comments inside of link
    comments = fields.Nested("CommentSchema", many=True)
    tags = fields.Nested("TagSchema", many=True)
