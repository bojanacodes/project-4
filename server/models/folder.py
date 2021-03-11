
from app import db
from models.base import BaseModel






class Folder(db.Model, BaseModel):
    __tablename__ = "folders"
    


