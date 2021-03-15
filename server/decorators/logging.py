from app import app
from flask import Flask, jsonify, request


@app.before_request
def log():
    print('⛓ Link log...')
    print('🍥 It\'s a long journey ahead')