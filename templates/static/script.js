document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("compareBtn");
    const input = document.getElementById("inputArray");

    function runComparison() {
        const values = input.value
            .split(",")
            .map(v => v.trim())
            .filter(v => v !== "");

        if (values.length === 0) {
            alert("Please enter values first");
            return;
        }

        fetch("/compare", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ values })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            alert("Comparison completed. Check console.");
        });
    }

    button.addEventListener("click", runComparison);
});