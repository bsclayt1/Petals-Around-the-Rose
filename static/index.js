const numDie = 6;
let count = 0;
const template = Handlebars.compile(document.querySelector('#result').innerHTML);
const imgTemplate = Handlebars.compile("<img src=\"img/{{ value }}.png\">")

function roll(){
    return Math.floor(Math.random() * 6) +  1;
}

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

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#roll').onclick = () =>{
        const rolls = [];
        let total = 0;
        for (let i = 0; i < numDie; i++) {
            const value = roll();
            rolls.push(value);
            total += transformRoll(value);
            const imgContent = imgTemplate({'value': value});
            document.querySelector(`#die${i}`).innerHTML = imgContent;
        }
        const content = template({'values': rolls, 'total': total, 'count':count});
        document.querySelector('#rollLog').innerHTML += content;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#reveal').onclick = () =>{

        var x = document.getElementById("#results");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }

});

function ShowHide(){
    var x = document.getElementById("#results");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}