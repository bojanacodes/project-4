from models.folder import Folder
from models.user import User
# from data.user_data import list_users

from models.user import User

list_users = [
    User(username='bojana', password='bojana', email='bojana@links.com'),
    User(username='eva', password='evicka', email='eva@links.com'),
    User(username='miska', password='miska', email='miska@linka.com'),
    User(username='betty', password='betty', email='betty@linka.com')
]

list_folders = [
    Folder(name="SEI 53", users = list_users),
    Folder(name="News articles", users = list_users),
    Folder(name="Long reads", users = list_users)
]



