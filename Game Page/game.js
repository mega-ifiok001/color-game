document.addEventListener('DOMContentLoaded', (event) => {
    animateButtons();
});

function animateButtons() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach((btn, index) => {
        btn.style.animation = `buttonAppear 0.3s forwards ${0.6 + index * 0.2}s`;
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(20px)';
    });

    const container = document.querySelector('.color-container');
    container.style.opacity = '0';
    container.style.transform = 'scale(0.8)';
    container.style.animation = 'containerAppear 0.5s forwards 0.3s';
}

// Selecting elements from the page 
let selectedColor = document.getElementById('selectedbtn');
let guessTheColor = document.querySelector('.guessTheColor');
let colorContainer = document.querySelector('.color-container');
let scoreBox = document.querySelector('.scoreBox');
let scores = document.querySelector('#scores');
let btns = document.querySelectorAll('.btn');
let reset = document.querySelector('.reset');
let gContainer = document.querySelector('.hero-section');

let point = 0;
let intervalId;

function startInterval() {
    intervalId = setInterval(updateCards, 10000);
}

let colors = [
    'red', 'purple', 'blue', 'black', 'green', 'pink',
    'brown', 'orange', 'yellow', 'gray', 'deepskyblue'
];


function getRandomColor() {
    let randomIndex = Math.floor(Math.random() * colors.length);
    console.log(randomIndex);
    return colors[randomIndex];
}

function updateCards() {
    let generatedColors = [];

    while (generatedColors.length < btns.length) {
        let result = getRandomColor();

        if (generatedColors.lastIndexOf(result) == -1) {
            generatedColors.push(result);
        }
    }

    btns.forEach((btn, i) => {
        btn.style.backgroundColor = generatedColors[i];
    });

    let offset = Math.floor(Math.random() * generatedColors.length);
    let selectedBtnColor = generatedColors[offset];

    selectedColor.style.backgroundColor = selectedBtnColor;
}

document.addEventListener('DOMContentLoaded', (event) => {
    updateCards();
    startInterval();
});

btns.forEach((btn) => {
    btn.addEventListener('click', function() {
        if (btn.style.backgroundColor == selectedColor.style.backgroundColor) {
            updateCards();
            guessTheColor.innerText = 'Correct guess!';
            guessTheColor.style.fontSize = '1.3rem';

            setTimeout(() => {
                guessTheColor.innerText = 'Guess The Color!';
                guessTheColor.style.color = 'white';
                guessTheColor.style.fontWeight = 'bold';
                guessTheColor.style.fontSize = '1.3rem';
            }, 1000);

            guessTheColor.style.color = '#47fd10';
            point += 5;
        } else {
            guessTheColor.innerText = 'Incorrect guess!';
            guessTheColor.style.color = 'red';
            guessTheColor.style.fontSize = '1.3rem';

            btn.style.color = 'red';
            gContainer.classList.add('vibrate');
            setTimeout(() => gContainer.classList.remove('vibrate'), 300);
            setTimeout(() => {
                guessTheColor.innerText = 'Guess The Color!';
                guessTheColor.style.color = 'white';
                guessTheColor.style.fontWeight = 'bold';
                guessTheColor.style.fontSize = '1.3rem';
            }, 1000);
            if (point > 0) {
                point -= 5;
            }
        }
        scores.innerText = 'score: ' + point;
    });
});

// Reset button 
reset.addEventListener('click', function() {
    clearInterval(intervalId);
    point = 0;
    scores.innerText = 'Score: 0';
    guessTheColor.innerText = 'Guess the color!';
    updateCards(); // Reset button colors
    startInterval(); // Restart interval
    animateButtons(); // Reapply the animation to buttons
    console.log('Game reset!');
});