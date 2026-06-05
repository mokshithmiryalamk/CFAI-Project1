from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "Frequency Counter Dashboard"

if __name__ == "__main__":
    app.run(debug=True)