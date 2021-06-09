from flask import Flask, jsonify
from flask_restx import Api

def create_app(env=None):
    from .config import config_by_name
    from .routes import register_routes


    app = Flask(__name__)

    app.config.from_object(config_by_name[env or "test"])

    api = Api(app, title=app.config['APP_TITLE'], version=app.config['VERSION']) #change these not to be hard coded, from conf

    # register components routes
    register_routes(api, app)

    @app.route("/health")
    def health():
        return jsonify("healthy")

    return app