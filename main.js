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
    // whatTheyReallyTyped = whatTheyReallyTyped + userInput[userInput.length - 1]

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
            document.querySelector('#hidden-answer').innerText = maskingText;
            document.querySelector('#prompt-input').value = maskingText;
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
var model = {
    answer: "",
    answerToggle: false,
    needsReset: false,
    petitionText: "Peter please answer the following question"
}

var controller = {
    init: () => {
        view.init();
    },
    keyDown: (e) => {
        let len = view.getPetitionLength();
        
        if(e.key === '.'){ // Period is the secret key
            model.answerToggle = !model.answerToggle;
            document.getElementById('petition').value += model.petitionText[len];
            return false;
        } else if (e.key.length === 1 && model.answerToggle) { // If its a character and in answer mode
            model.answer += e.key;
            document.getElementById('petition').value += model.petitionText[len];
            console.log(model.answer);
            return false;
        } else if (e.key === "Backspace" && model.answerToggle) { // if its a backpace
            model.answer = model.answer.slice(0,-1);
        }
    },
    getResetStatus: () => {
        return model.needsReset;
    },
    getPetitionChar: () => {
        return model.petitionText[view.getPetitionLength()-1];
    },
    getAnswer: () => {
        const invalidResponse = [
            "That's not how you petition to Peter.",
            "Invalid petition. Please try again.",
            "You're not asking correctly",
            "Why should I answer to that?",
            "Please try again tomorrow. Or never...",
            "I'm tired... Try again another time.",
            "Not now, I'm busy. Maybe later.",
            "Fix your petition please.",
        ];
        const invalidQuestion = "Please ask Peter a valid question.";
        model.needsReset = true;

        if (!view.getQuestion()) {                  // Valid Question check
            return invalidQuestion;
        } else if(model.answer) {                   // Valid Petition check
            return "Peter says " + model.answer;
        } else {                                    // Invalid Response
            let randomNum = Math.floor(Math.random() * invalidResponse.length);
            return invalidResponse[randomNum];
        }
        
    },
    reset: () => {
        model.answer = '';
        model.answerToggle = false;
        model.needsReset = false;
        view.resetUi();
    }
}

var view = {
    init: () => {
        document.getElementById('answerButton').addEventListener('click', () => {
            view.renderAnswer();
        });
        document.getElementById('resetButton').addEventListener('click', controller.reset);
        document.getElementById('petition').onkeydown = (event) => {
            if(document.getElementById('petition').value == ''){
                controller.reset();
            }
            return controller.keyDown(event)
        };
        document.getElementById('question').onkeydown = (event) => {
            switch(event.key) {
                case "?":
                    //document.getElementById('question').value += "?";
                    view.renderAnswer();
                    break;
                case "Enter":
                    if(!document.getElementById('question').value.includes('?')){
                        document.getElementById('question').value += "?";
                    }
                    view.renderAnswer();
                    break;
            }
            
        };
        document.getElementById('petition').onfocus = ()=> {
            if(controller.getResetStatus()){
                controller.reset();
            }
        };
    },
    getInputText: () => {
        return document.getElementById('petition').value;
    },
    getPetitionLength: () => {
        return document.getElementById('petition').value.length;
    },
    getQuestion: () => {
        return document.getElementById('question').value;
    },
    renderAnswer: () => {
        document.getElementById('answer').innerHTML = controller.getAnswer();
        view.loadingBar();
        view.disableQuestion();
        view.clearPetition();
        
    },
    showAnswer: () => {
        document.getElementById('answer').style.display = "block";
    },
    hideAnswer: () => {
        document.getElementById('answer').style.display = "none";
    },
    resetUi: () => {
        view.clearPetition();
        view.clearQuestion();
        view.clearAnswer();
        view.enableQuestion();
        view.hideAnswer();
    },
    clearPetition: () => {
        document.getElementById('petition').value = '';
    },
    clearQuestion: () => {
        document.getElementById('question').value = '';
    },
    clearAnswer: () => {
        document.getElementById('answer').innerHTML = '';
    },
    disableQuestion: () => {
        document.getElementById('question').disabled = true;
    },
    enableQuestion: () => {
        document.getElementById('question').disabled = false;
    },
    loadingBar: ()=> {
       var bar = document.getElementById('loading');
        var barInside = document.getElementById('loading-inside');
        var progress = 0;
        var interval = setInterval(incr, 10/*randominterval*/);
        console.log('button  clicked');
        bar.style.display = "block";

        function incr() {
            console.log('test');
            if(progress >= 100) {
                bar.style.display = "none";
                view.showAnswer();
                clearInterval(interval);
            } else {
                progress += 1;
                barInside.style.width = progress + '%';
            }
        }


    }
}


controller.init();