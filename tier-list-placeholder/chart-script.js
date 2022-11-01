const rows = document.querySelectorAll('.row');

const onDragOver = (event)=>{
    event.preventDefault();
}

const onDrop = (event)=>{
    event.preventDefault();
    const draggedId = event.dataTransfer.getData('id');
    const draggedCard = document.getElementById(draggedId);//access to card
    event.target.appendChild(draggedCard);//puts card into different tiers
    console.log("drop");
}

//reference to function
rows.forEach((row)=>{
    row.ondragover = onDragOver;
    row.ondrop = onDrop; //drop listener
})