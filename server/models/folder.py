
from app import db
from models.base import BaseModel
# from models.link import Link

class Folder(db.Model, BaseModel):
    __tablename__ = "folders"

    name = db.Column(db.String(40), nullable=False)

    #! TO DO: add model warning user on front end 
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE", ), nullable=False)

    links = db.relationship('Link', backref='folder', cascade="all, delete")

    



    




