function clearScreen() {
    document.getElementById("result").value = "";
}

function deleteLast() {
    var input = document.getElementById("result").value;
    document.getElementById("result").value = input.substring(0, input.length - 1);
}

function appendValue(value) {
    document.getElementById("result").value += value;
}

function calculateResult() {
    var input = document.getElementById("result").value;
    try {
        var result = eval(input);
        document.getElementById("result").value = result;
    } catch (e) {
        document.getElementById("result").value = "Error";
    }
}
