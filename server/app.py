from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config.environment import db_URI
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt

app = Flask(__name__)

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

