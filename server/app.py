from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config.environment import db_URI
from flask_marshmallow import Marshmallow

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = db_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# ! Instantiate Marshmallow framework.
ma = Marshmallow(app)

from controllers import links, tags, users

app.register_blueprint(links.router, url_prefix="/api")
app.register_blueprint(tags.router, url_prefix="/api")
app.register_blueprint(users.router, url_prefix="/api")