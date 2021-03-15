# ? This base.py will have common fields in it that all models should have.
from datetime import datetime
from app import db


class BaseModel:
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    # updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    # ! Adding a method in here to save a line of code in saving.
    def save(self):
        db.session.add(self)
        db.session.commit()

    # ! Add another method for removing models.
    def remove(self):
        db.session.delete(self)
        db.session.commit()

