from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return "Frequency Counter Dashboard"

@app.route("/compare", methods=["POST"])
def compare():
    data = request.json
    values = data.get("values", [])

    if not values:
        return jsonify({"error": "No input provided"})

    return jsonify({
        "values": values,
        "message": "Comparison endpoint working"
    })

if __name__ == "__main__":
    app.run(debug=True)