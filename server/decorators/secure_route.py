
# ? g is a global object that flask provides: we use this to attach the current user.
from flask import request, g
import jwt
from models.user import User
from config.environment import secret
from functools import wraps

def secure_route(func):

    @wraps(func)
    def wrapper(*args, **kwargs):
        
        token_with_bearer = request.headers.get('Authorization')

        if not token_with_bearer:
            return {'Message': 'Unauthorized'}, 401

        token = token_with_bearer.replace('Bearer ', '')
     
        try:
            # ! Decode the token
            payload = jwt.decode(token, secret, 'HS256')
            # ! Get the user_id
            user_id = payload['sub']
        # ! 3) Get the actual user from the user_id, store current_user in g.
            user = User.query.get(user_id)

            if not user:
                return {'Message': 'Unauthorized'}, 401

            # ! Put the user on my global object.
            g.current_user = user

        # ! Common exception with jwt
        except jwt.ExpiredSignatureError:
            return {'Message': 'Token is expired'}, 401

        except Exception as e:
            return { 'Message': str(e) }, 401

        # ! Finally) Call my route function
        return func(*args, **kwargs)

    return wrapper
