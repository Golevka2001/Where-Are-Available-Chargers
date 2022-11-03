from flask import Flask
from find_chargers import FindChargers

app = Flask(__name__)


@app.route("/")
def index():
    chargers = FindChargers()
    chargers.where_are_you()
    return chargers.tell_me('html')


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=1205, debug=False)
