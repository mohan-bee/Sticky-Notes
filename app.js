const cardBtn = document.getElementById('cardBtn');
const bgColors = ['lightpink', 'lightgreen', 'lightblue', 'lightcoral', 'lightsteelblue', 'lightgoldenrodyellow', 'lightyellow'];

cardBtn.addEventListener('click', btnFunc);

function randBG(bgColors) {
    let len = bgColors.length;
    let rand = Math.floor(Math.random() * len);
    return bgColors[rand];
}

function randPos() {
    return Math.floor(Math.random() * 6);
}

function btnFunc() {
    let newCard = document.createElement('textarea');
    newCard.classList.add('card');
    newCard.setAttribute('id', 'card')
    newCard.style.position = 'absolute'; // Added to allow free movement of the card
    newCard.style.backgroundColor = randBG(bgColors);
    let posX = (randPos() * 100) + 'px';
    let posY = (randPos() * 100) + 'px';
    newCard.style.left = posX;
    newCard.style.top = posY;
    document.body.appendChild(newCard);
    
    drag(newCard); // Attach the drag functionality to the newly created card
}

function drag(card) {
    let startX = 0;
    let startY = 0;
    let newX = 0;
    let newY = 0;

    // Attach event listeners to the specific card
    card.addEventListener('mousedown', mouseDown);
    card.addEventListener('keypress', (e)=>{
        // console.log(e)
        if(e.key == '~'){
            card.remove()
        }
    })

    function mouseDown(e) {
        startX = e.clientX;
        startY = e.clientY;

        // Listen to movement and release on the specific card
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
    }

    function mouseMove(e) {
        newX = startX - e.clientX;
        newY = startY - e.clientY;
        startX = e.clientX;
        startY = e.clientY;

        let cardPosX = (card.offsetLeft - newX) + 'px';
        let cardPosY = (card.offsetTop - newY) + 'px';
        card.style.left = cardPosX;
        card.style.top = cardPosY;
    }

    function mouseUp(e) {
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
    }
}
