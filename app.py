from flask import Flask, render_template
import random

app = Flask(__name__, static_url_path="/static", static_folder="static")


@app.route('/')
def petals():
    return render_template('index.html')

if __name__ == '__main__':
    app.run()
