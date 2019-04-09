from flask import render_template
from flask import Blueprint
from backend.analysisModule.get_user_info import get_user_info
import json

main = Blueprint('main', __name__, template_folder='templates', static_folder='static', static_url_path="/static")


@main.route('/getUserInfo/<query>')
def user_info(query):
    return json.dumps(get_user_info(query))


@main.route('/', defaults={'path': ''})
@main.route('/<path:path>')
def index(path):
    return render_template('index.html')
