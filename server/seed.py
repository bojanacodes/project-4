from app import app, db

from models.link import Link
from data.links_data import list_links, list_tags


with app.app_context():

    try:
        
        db.drop_all()
        
        db.create_all()

        db.session.add_all(list_links)

        db.session.commit()

        db.session.add_all(list_tags)

        db.session.commit()

        print('Everything committed 🤖')
    except Exception as e:
       print('There was an error.')
       print(e)