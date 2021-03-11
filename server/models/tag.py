from app import db
from models.base import BaseModel


class Tag(db.Model, BaseModel): 

    __tablename__ = 'tags'

    name = db.Column(db.Text, nullable=False, unique=True)
    
    folder_id = db.Column(db.Integer, db.ForeignKey('folders.id', ondelete="CASCADE"))