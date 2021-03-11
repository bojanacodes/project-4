# from app import db
# from models.base import BaseModel
# from models.user import User
# from datetime import datetime

# class Comment(db.Model, BaseModel):

#     __tablename__ = 'comments'
#     content = db.Column(db.Text, nullable=False)

#     link_id = db.Column(db.Integer, db.ForeignKey('links.id', ondelete="CASCADE"))
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"))
#     edited_at = db.Column(db.DateTime, default=datetime.utcnow)

    