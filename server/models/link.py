
from app import db
from models.base import BaseModel
# from models.cakes_ingredient import cakes_ingredients_join
# ! Import ingredient into my cake so SQLAlchemy knows about it.
# from models.ingredient import Ingredient
from models.comment import Comment




class Link(db.Model, BaseModel):
    __tablename__ = "links"
    name = db.Column(db.String(40), nullable=False)
    description = db.Column(db.Text, nullable=False)
    url = db.Column(db.Text, nullable=False)
    image = db.Column(db.Text, nullable=False)
    importance = db.Column(db.String(40), nullable=False)



    # # * FOR CASCADING DELETION:
        # ! Add the cascade keyword with all and delete.
    comments = db.relationship('Comment', backref='link', cascade="all, delete")

    #     # ! Calling the backref cakes, because many ingredients to many cakes
    #     # ! The extra keyword for M - M is the seconary keyword
    #     # ? This secondary key will let us specify the JOIN table that relates the two models together.
    #     ingredients = db.relationship('Ingredient', backref='cakes', secondary=cakes_ingredients_join
