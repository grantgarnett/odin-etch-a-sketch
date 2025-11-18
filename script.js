const etchContainer = document.querySelector("#etch-container");
let isMouseDown = false;

document.addEventListener("mousedown", (event) => {
    event.preventDefault();
    isMouseDown = true;
 });
document.addEventListener("mouseup", () => isMouseDown = false);

function enablePenDrag(event) {
    if(isMouseDown === true) {
        event.target.classList.add("black");
    }
}

function enablePenClick(event) {
    event.target.classList.add("black")
}

function enablePen(square) {
    disableEraser(square);
    disableRandomPen(square);
    square.addEventListener("mouseenter", enablePenDrag);
    square.addEventListener("mousedown", enablePenClick);
}

function disablePen(square) {
    square.removeEventListener("mouseenter", enablePenDrag);
    square.removeEventListener("mousedown", enablePenClick);
}

function enableEraserDrag(event) {
    if(isMouseDown === true) {
        event.target.classList.remove("black");
    }
}

function enableEraserClick(event) {
    event.target.classList.remove("black")
}

function enableEraser(square) {
    disablePen(square);
    disableRandomPen(square);
    square.addEventListener("mouseenter", enableEraserDrag);
    square.addEventListener("mousedown", enableEraserClick);
}

function disableEraser(square) {
    square.removeEventListener("mouseenter", enableEraserDrag);
    square.removeEventListener("mousedown", enableEraserClick);
}

function makeRandomColor() {
    return `rgb(${Math.floor(Math.random() * 255)}, \
    ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
}

function enableRandomDrag(event) {
    if(isMouseDown === true) {
        event.target.style.backgroundColor = makeRandomColor();
    }
}

function enableRandomClick(event) {
    event.target.style.backgroundColor = makeRandomColor();
}

function enableRandomPen(square) {
    disablePen(square);
    disableEraser(square);
    square.addEventListener("mouseenter", enableRandomDrag);
    square.addEventListener("mousedown", enableRandomClick);
}

function disableRandomPen(square) {
    square.removeEventListener("mouseenter", enableRandomDrag);
    square.removeEventListener("mousedown", enableRandomClick);
}

function generateSquare(column) {
    const square = document.createElement("div");
    square.classList.add("square");
    enablePen(square);
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