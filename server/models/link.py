
from app import db
from models.base import BaseModel
# ! Import ingredient into my cake so SQLAlchemy knows about it.
#from models.comment import Comment




class Link(db.Model, BaseModel):
    __tablename__ = "links"
    name = db.Column(db.String(40), nullable=False)
    description = db.Column(db.Text, nullable=True)
    url = db.Column(db.Text, nullable=False)
    image = db.Column(db.Text, nullable=True)
    importance = db.Column(db.String(40), nullable=False)


    # Foreign keys
    #folder_id = db.Column(db.Integer, db.ForeignKey('folders.id', ondelete="CASCADE"))
   # user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"))


    # # * FOR CASCADING DELETION:
        # ! Add the cascade keyword with all and delete.
    #comments = db.relationship('Comment', backref='link', cascade="all, delete")

