const numDie = 6;

let countCorrect = 0;
let lastResult;
let currentAnswer;
let correctlyAnswered;

// .random gives a result between 0 and 1
// multiplying changes range to 0 to 5 so add 1 to result in 1 to 6
function roll(){
    return Math.floor(Math.random() * 6) +  1;
}

// Super secret sauce
function transformRoll(roll){
    let value = 0;
    if (roll === 3){
        value = 2;
    }
    else if (roll === 5){
        value = 4
    }
    return value
}
// Reset the form after each round
function resetForm(){
    let form = document.getElementById("answerForm").elements[0];
    form.style.backgroundColor = "#FFFFFF";
    form.value = "";
}
function generateRoll(){
    correctlyAnswered = false;
    resetForm();
    // If this is not the first roll (when lastResult is undefined)
    // then add the last result to the history log
    if (lastResult !== undefined){
        document.querySelector('#rollLog').innerHTML = lastResult + document.querySelector('#rollLog').innerHTML;
    }
    // Generate 6d6 and load the images
    const rolls = [];
    let total = 0;
    for (let i = 0; i < numDie; i++) {
        const value = roll();
        rolls.push(value);
        total += transformRoll(value);
        console.log(Handlebars.templates.imageTemplate({'value': value}));
        document.querySelector(`#die${i}`).innerHTML = Handlebars.templates.imageTemplate({"value" : value});
    }

    // Store the result log template for when the next run is initiated
    const templateContent = {
        'values': rolls,
        'total': total
    };
    lastResult = Handlebars.templates.resultTemplate(templateContent);//template({'values': rolls, 'total': total});

    // Rehind the answer and fill in the result value
    //document.getElementById("answer").style.display = "none";
    document.querySelector(("#answer")).innerHTML = "";
    currentAnswer = total;
}

// The answer is hidden by default. This lets the user choose when to show it
function showAnswer(){
    let x = document.getElementById("answer");
    x.innerHTML = "Answer: " + currentAnswer.toString();
}

// This may clutter the page by default, so hide it unless the user requsts it.
function showHistory() {
    let x = document.getElementById("history");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function checkAnswer(){
    const form = document.getElementById("answerForm").elements[0];
    const submittedValue = parseInt(form.value);
    if (submittedValue === currentAnswer){
        form.style.backgroundColor = "#00FF00";
        if (correctlyAnswered === false){
             countCorrect +=1;
             correctlyAnswered = true;
        }
    }
    else{
        form.style.backgroundColor = "#FF0000";
    }
    document.getElementById("correctGuesses").innerHTML = Handlebars.templates.guessCount({"value": countCorrect});
    return false
}
// When the page is done loading, add the onclick functions to the respective buttons
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("rollButton").onclick = () => generateRoll();
    document.getElementById("historyButton").onclick = () => showHistory();
    document.getElementById("answerButton").onclick = () => showAnswer();
    document.getElementById("answerForm").onsubmit = () => checkAnswer();
    document.getElementById("submitButton").onclick = () => checkAnswer();
    //var form = document.getElementById("answer");
    //function handleForm(event) { event.preventDefault(); }
    //form.addEventListener('submit', handleForm);
    generateRoll();

});
