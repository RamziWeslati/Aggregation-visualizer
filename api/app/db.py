import sqlite3
from flask import current_app, g


def get_db():
    """when receiving a request that needs a database call,
    get_db sets a connection to the database and returns the database object,
    when get_db is called again on the same request
    get_db returns the already established connection rather than creating a new one"""
    if 'db' not in g:
        config = current_app.config
        g.db = sqlite3.connect(config['DB_PATH']).cursor()
    return g.db


def close_db(e=None):
    """closes database connection if database is in global"""
    db = g.pop('db', None)

    if db is not None:
        db.close()