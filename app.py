import time
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

    # Nested Loop
    start1 = time.perf_counter()

    freq1 = {}
    for i in range(len(values)):
        count = 0
        for j in range(len(values)):
            if values[i] == values[j]:
                count += 1
        freq1[values[i]] = count

    nested_time = (time.perf_counter() - start1) * 1000

    # HashMap
    start2 = time.perf_counter()

    freq3 = {}
    for v in values:
        if v in freq3:
            freq3[v] += 1
        else:
            freq3[v] = 1

    hashmap_time = (time.perf_counter() - start2) * 1000

    return jsonify({
        "frequency_nested": freq1,
        "frequency_hashmap": freq3,
        "brute_time_ms": nested_time,
        "hashmap_time_ms": hashmap_time
    })

if __name__ == "__main__":
    app.run(debug=True)