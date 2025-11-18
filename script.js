const etchContainer = document.querySelector("#etch-container");
let isMouseDown = false;

document.addEventListener("mousedown", (event) => {
    event.preventDefault();
    isMouseDown = true;
 });
document.addEventListener("mouseup", () => isMouseDown = false);

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
    // if input is a natural number
    if(+squaresAlongSide && 
        +squaresAlongSide === Math.floor(Math.abs(+squaresAlongSide))) {
        for(let i = 0; i < squaresAlongSide; i++) { 
            generateColumn(squaresAlongSide);
        }
    }
}

generateDrawingBoard(64);