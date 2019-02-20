    window.onload = init;

function init() {
    document.querySelector('#input')
        .addEventListener('keydown', handleTyping);
}

function handleTyping(event) {
    let userInput = event.target.value;
    let answer = userInput;
    
    document.querySelector('#changeme').innerText = answer;
}