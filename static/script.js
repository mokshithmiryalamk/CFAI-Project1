document.addEventListener("DOMContentLoaded", function () {

    const button = document.getElementById("compareBtn");
    const input = document.getElementById("inputArray");
    const outputSection = document.getElementById("outputSection");

    outputSection.classList.remove("active");

    function runComparison() {

        const values = input.value
            .split(",")
            .map(v => v.trim())
            .filter(v => v !== "");

        if (values.length === 0) {
            alert("Please enter values first");
            return;
        }

        const method = document.getElementById("methodSelect").value;

        fetch("/compare", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ values, method })
        })
        .then(res => res.json())
        .then(data => {

            if (data.error) {
                alert(data.error);
                return;
            }

            outputSection.classList.add("active");

            // TIMES
            const bruteTime = data.brute_time_ms ?? 0;
            const hashTime = data.hashmap_time_ms ?? 0;

            document.getElementById("nestedTime").innerText =
                bruteTime.toFixed(4);

            document.getElementById("hashmapTime").innerText =
                hashTime.toFixed(4);

            document.getElementById("bruteLabel").innerText =
                data.brute_label;

            // FREQUENCY OUTPUT
            const freq = data.frequency_hashmap || {};
            let formatted = "";

            for (let key in freq) {
                formatted += ${key} → ${freq[key]}\n;
            }

            document.getElementById("frequencyOutput").innerText =
                formatted || "No data";

            // WINNER (INSIDE DASHBOARD FOOTER)
            const winnerText = document.getElementById("winner");

            winnerText.innerText = data.winner;

            winnerText.style.color =
                data.winner.includes("HashMap") ? "#22c55e" : "#ef4444";

            // CHART
            const ctx = document.getElementById("timeChart").getContext("2d");

            if (window.myChart) window.myChart.destroy();
            
        window.myChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Loop Method", "HashMap"],
                datasets: [{
                    label: "Execution Time (ms)",
                    data: [bruteTime, hashTime],
                    backgroundColor: ["#ef4444", "#22c55e"],
                    borderRadius: 6,
                    barThickness: 70
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                    legend: {
                        display: false
                    }
                },

                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
        })
        .catch(err => {
            console.error(err);
            alert("Backend error");
        });
    }

    button.addEventListener("click", runComparison);

    input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") runComparison();
    });
});

function generateRandom() {
    let arr = [];
    for (let i = 0; i < 10; i++) {
        arr.push(Math.floor(Math.random() * 20));
    }
    document.getElementById("inputArray").value = arr.join(",");
}