from app import ma
from models.user import User
from marshmallow import fields

class UserSchema(ma.SQLAlchemyAutoSchema):

    class Meta:
        model = User
        load_instance = True
        # ! Not to be be included in EITHER deserialization or serialization.
        exclude = ('password_hash',) # ? The comma makes it a tuple, which is what it wants.
        # ! Only for deserialization
        # load_only = ('email', 'password')
        load_only = ('password',)

    # ! Adding this so we can ensure the password is prseent
    password = fields.String(required=True)
