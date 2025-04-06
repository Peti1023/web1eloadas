let count = 0;

function countNumbers() {
    count++;
    postMessage(count);
    setTimeout(countNumbers, 1000);
}

countNumbers();
