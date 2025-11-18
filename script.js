etchContainer = document.querySelector("#etch-container");

function generateSquare(column) {
    const square = document.createElement("div");
    square.classList.toggle("square");
    column.appendChild(square);
}

function generateColumn(columnSize) {
    const column = document.createElement("div");
    column.classList.toggle("column");

    for(i = 0; i < columnSize; i++) {
        generateSquare(column);
    }

    etchContainer.appendChild(column);
}

function generateDrawingBoard(squaresAlongSide) {
    if(+squaresAlongSide && 
        +squaresAlongSide === Math.floor(Math.abs(+squaresAlongSide))) {
        for(let i = 0; i < squaresAlongSide; i++) { 
            generateColumn(squaresAlongSide);
        }
    }
}