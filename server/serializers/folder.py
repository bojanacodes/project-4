from app import ma
from models.folder import Folder

class FolderSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Folder
        load_instance = True