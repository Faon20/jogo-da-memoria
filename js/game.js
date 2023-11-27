const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer')

const characters = [
    'beth',
    'pessoa-passaro',
    'meeseeks',
    'morty',
    'jerry',
    'scroopy',
    'summer',
    'rick',
    'pickle-rick',
    'jessica',
];

const createElement = (tag,className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard =  '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if(disabledCards.length == 20) {
        clearInterval(this.loop);
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML} segundos`);
    }
}


const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter == secondCharacter) {

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard =  '';
        secondCard =  '';

        checkEndGame();


    } else {

        setTimeout(() => {

        firstCard.classList.remove('reveal-card');
        secondCard.classList.remove('reveal-card');

        firstCard =  '';
        secondCard =  '';

        }, 500 ); 
    }
}

const revealCard = ({ target }) => {

    if(target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if(firstCard == '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;

    } else if(secondCard == '') {
        target.parentNode.classList.add('reveal-card')
        secondCard = target.parentNode;


        checkCards();
    }

}

const createrCard = (character) => {
 
    const card = createElement('div','card');
    const front = createElement('div','face Frente');
    const back = createElement('div','face Costa');

    front.style.backgroundImage = `url('../imagens/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character)

    return card;    
}

const loadGame = () => {

    const duplicateCharacter = [ ...characters, ...characters ];

    const shuffledArrray = duplicateCharacter.sort(() => Math.random() -0.5);

    shuffledArrray.forEach((character) => {

        const card = createrCard(character);
        grid.appendChild(card);

    });
}

const startTime = () => {

    this.loop = setInterval (() => {
        const curreTime = +timer.innerHTML;
        timer.innerHTML = curreTime + 1;
    }, 1000);

}

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTime();
    loadGame();
}


