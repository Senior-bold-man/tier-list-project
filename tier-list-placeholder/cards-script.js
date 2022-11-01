const cards = document.querySelectorAll('.card');

const onDragStart=(event)=>{
    console.log("drag");
    event.dataTransfer.setData('id',event.target.id); //finds which card is dragged through it's id
    setTimeout(()=>{
        event.target.style.visibility='hidden';//hides card from original tier
    },50)
}

const onDragEnd =(event)=>{
    console.log("ended drag");
    event.target.style.visibility='visible';//reveals card when dropped
}

cards.forEach((card)=>{
    card.ondragstart = onDragStart;
    card.ondragend = onDragEnd;//listeners
})