from app import db

links_tag_join = db.Table('links_tags',
    db.Column('link_id', db.Integer, db.ForeignKey('links.id'), primary_key=True),
    db.Column('tag_id', db.Integer, db.ForeignKey('tags.id'), primary_key=True)
)
