from app import app, db

from models.link import Link
from data.links_data import list_links, list_tags
from data.comment_data import list_comments
from data.user_data import list_users
from data.folders_data import list_folders


with app.app_context():

    try:
        
        db.drop_all()
        
        db.create_all()

        db.session.add_all(list_users)

        db.session.commit()

        db.session.add_all(list_folders)

        db.session.commit()

        db.session.add_all(list_links)

        db.session.commit()

        db.session.add_all(list_tags)

        db.session.commit()

        db.session.add_all(list_comments)

        db.session.commit()

        print('Everything committed 🤖')
    except Exception as e:
       print('There was an error.')
       print(e)