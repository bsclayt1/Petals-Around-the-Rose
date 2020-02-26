from flask import Flask, render_template
import random

app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/roll', methods=["POST"])
def roll(request):
    return 'Page pending'

if __name__ == '__main__':
    app.run()
