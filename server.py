from flask import Flask, render_template
from find_chargers import FindChargers

app = Flask(__name__)


@app.route("/")
def index():
    chargers = FindChargers()
    chargers.where_are_you()
    result = chargers.tell_me('html')
    return render_template('index.html', east_gate=result['east_gate'])


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=1205, debug=False)
