from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config.environment import db_URI
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt

app = Flask(__name__, static_folder='dist')

from decorators import logging, errors

app.config['SQLALCHEMY_DATABASE_URI'] = db_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

ma = Marshmallow(app)

bcrypt = Bcrypt(app)

from controllers import links, tags, folders, users

app.register_blueprint(users.router, url_prefix="/api")
app.register_blueprint(links.router, url_prefix="/api")
app.register_blueprint(tags.router, url_prefix="/api")
app.register_blueprint(folders.router, url_prefix="/api")

## registering your blueprints...
import os

@app.route('/', defaults={'path': ''}) # homepage
@app.route('/<path:path>') # any other path
def catch_all(path):
    dirname = os.path.dirname(__file__)
    filename = os.path.join(dirname, 'dist/' + path)

    if os.path.isfile(filename): # if path is a file, send it back
        return app.send_static_file(path)

    return app.send_static_file('index.html') # otherwise send back the index.html file

