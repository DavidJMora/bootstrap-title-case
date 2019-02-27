window.onload = init;
let maskingText = '';
let whatTheyReallyTyped = '';

function init() {
    document.querySelector('#input')
        .addEventListener('keyup', handleTyping);
    document.querySelector('#prompt-input')
        .addEventListener('keyup', prompt);
    document.querySelector('#question-input')
        .addEventListener('keyup', question);
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


function prompt(event) {
    let userInput = event.target.value;
    whatTheyReallyTyped = whatTheyReallyTyped + userInput[userInput.length - 1]

    // document.querySelector('#hidden-answer').style.visibility = 'hidden';
    maskingText = '';
    let prompt = '.';
    let i = 0;
    let petition = 'Kaylin please answer the following question'

    // If the first character is the prompt:
    // Save each subsequent character in new string
    // Replace each character in the form with the same-addressed character in our petition.

    // If the first character is not the prompt:
    // Just let them write and don't save it or anything.

    if (userInput[0] === prompt) {
        while (i < userInput.length) {
            maskingText = maskingText + petition[i];
            document.querySelector('#prompt-input').value = maskingText;
            document.querySelector('#hidden-answer').innerText = maskingText;
            i++;
            
        }

    } else {
        maskingText = "I'm kind of tired right now, try again later please.";
    }
    // document.querySelector('#prompt-input').value = maskingText;
    document.querySelector('#hidden-answer').innerText = maskingText;
    console.log(document.querySelector('#hidden-answer').innerText = maskingText)
    console.log(i);
    // console.log(whatTheyReallyTyped);
}

        





function question(event) {
    let userInput = event.target.value;
    let answer = userInput;
    let key = '?';
    let i = 0;


    document.querySelector('#question').innerText = answer;
}