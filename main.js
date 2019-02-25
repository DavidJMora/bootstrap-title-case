    window.onload = init;

function init() {
    document.querySelector('#input')
        .addEventListener('keyup', handleTyping);
}

function handleTyping(event) {
    let userInput = event.target.value;
    let answer = '';
    let space = ' ';
    let i = 0; 
    // 1. As long as "i" = index is less than the userInput than...
    // 2. target any value where itself minus one is equal to a "space"
    //          a. OR if the index 'i' is equal to 0
    // 4. if so take the input and input whos index fulfills requirements and make it uppercase
    // 5. if statements are false then simply take input and input whos index doesnt fulfill requirements and make them lowercase
    // 6. repeat

    while (i < userInput.length) {
        if (userInput[i - 1] === space || i === 0) {
            answer = answer + userInput[i].toUpperCase();
        } else {
            answer = answer + userInput[i].toLowerCase();
        }
        i++
    }
    
    document.querySelector('#titlecase').innerText = answer;
}
