const addCard = document.querySelector("#addCard");
addCard.onclick = addCard;


const addCard = (event) =>{
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('draggable','true');
    card.id = Date.now();
    card.ondragstart=onDragStart;
    card.ondragend=onDragEnd;
    return card;
}

const addToBoard = (event) =>{
    const card = createCard();
    const firstRow = document.querySelector('.row');
    firstRow.appendChild(card);
}
