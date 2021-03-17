import os

db_URI = os.getenv('DATABASE_URL', 'postgres://localhost:5432/project4_db')
secret = os.getenv('SECRET', 'newspaper dolphin unicorn curtains expedition flowers necklace')