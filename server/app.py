from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config.environment import db_URI

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = db_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

from controllers import links

app.register_blueprint(links.router, url_prefix="/api")