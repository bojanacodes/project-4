
from app import db
from models.base import BaseModel
from models.users_folder import users_folder_join
# from models.link import Link
from models.tag import Tag

class Folder(db.Model, BaseModel):
    __tablename__ = "folders"

    name = db.Column(db.String(40), nullable=False)

    #! TO DO: add model warning user on front end 
    #users = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"), nullable=False)

    users = db.relationship('User', backref='folders', secondary=users_folder_join)

    links = db.relationship('Link', backref='folder', cascade="all, delete")

    tags = db.relationship('Tag', backref='folder', cascade="all, delete")



    



    




