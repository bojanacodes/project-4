import os

db_URI = os.getenv('DATABASE_URL', 'postgres://localhost:5432/project4_db')
secret = os.getenv('SECRET', 'green marmalade queen pelican rocket range')