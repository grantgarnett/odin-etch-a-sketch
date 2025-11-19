const etchContainer = document.querySelector("#etch-container");
let isMouseDown = false;
let isOpacityEnabled = false;

const penButton = document.querySelector("#pen-button");
const eraserButton = document.querySelector("#eraser-button");
const randomButton = document.querySelector("#random-button");
const opacityButton = document.querySelector("#opacity-button");
const resizeButton = document.querySelector("#resize-button");

let squares = document.querySelectorAll(".square");
let columns = document.querySelectorAll(".column");

document.addEventListener("mousedown", (event) => {
    event.preventDefault();
    isMouseDown = true;
 });
document.addEventListener("mouseup", () => isMouseDown = false);

function enablePenDrag(event) {
    if(isMouseDown === true) {
        event.target.style.backgroundColor = "black";
    }
}

function enablePenClick(event) {
    event.target.style.backgroundColor = "black";
}

function enableSquarePen(square) {
    disableSquareEraser(square);
    disableSquareRandomPen(square);
    square.addEventListener("mouseenter", enablePenDrag);
    square.addEventListener("mousedown", enablePenClick);
}

function enablePen() {
    squares.forEach(enableSquarePen);
}

function disableSquarePen(square) {
    square.removeEventListener("mouseenter", enablePenDrag);
    square.removeEventListener("mousedown", enablePenClick);
}

function enableEraserDrag(event) {
    if(isMouseDown === true) {
        event.target.style.backgroundColor = "white";
    }
}

function enableEraserClick(event) {
    event.target.style.backgroundColor = "white";
}

function enableSquareEraser(square) {
    disableSquarePen(square);
    disableSquareRandomPen(square);
    square.addEventListener("mouseenter", enableEraserDrag);
    square.addEventListener("mousedown", enableEraserClick);
}

function enableEraser() {
    squares.forEach(enableSquareEraser);
}

function disableSquareEraser(square) {
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

function enableSquareRandomPen(square) {
    disableSquarePen(square);
    disableSquareEraser(square);
    square.addEventListener("mouseenter", enableRandomDrag);
    square.addEventListener("mousedown", enableRandomClick);
}

function enableRandomPen() {
    squares.forEach(enableSquareRandomPen);
}

function disableSquareRandomPen(square) {
    square.removeEventListener("mouseenter", enableRandomDrag);
    square.removeEventListener("mousedown", enableRandomClick);
}

function enableOpacityDrag(event) {
    if((isMouseDown === true) && (event.target.style.opacity < 1)) {;
        const opacity = +event.target.style.opacity + 0.1;
        event.target.style.opacity = `${opacity}`;
    }
}

function enableOpacityClick(event) {
    if(event.target.style.opacity < 1) {
        const opacity = +event.target.style.opacity + 0.1;
        event.target.style.opacity = `${opacity}`;
    }
}

function enableSquareOpacity(square) {
    square.addEventListener("mouseenter", enableOpacityDrag);
    square.addEventListener("mousedown", enableOpacityClick);
    square.style.opacity = "0";
}

function enableOpacity() {
    isOpacityEnabled = true;
    squares.forEach(enableSquareOpacity);
}

function disableSquareOpacity(square) {
    square.removeEventListener("mouseenter", enableOpacityDrag);
    square.removeEventListener("mousedown", enableOpacityClick);
    square.style.opacity = "1";
}

function disableOpacity() {
    isOpacityEnabled = false;
    squares.forEach(disableSquareOpacity);
}

function toggleOpacity() {
    if (isOpacityEnabled === false) {
        enableOpacity();
    }
    else {
        disableOpacity();
    }
}

function generateSquare(column) {
    const square = document.createElement("div");
    square.classList.add("square");
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
    columns.forEach((column) => column.remove());
    // if input is a natural number
    if(+squaresAlongSide && 
        +squaresAlongSide === Math.floor(Math.abs(+squaresAlongSide))) {
        for(let i = 0; i < squaresAlongSide; i++) { 
            generateColumn(squaresAlongSide);
        }
    }
    squares = document.querySelectorAll(".square");
    columns = document.querySelectorAll(".column");
}

function makeNewGrid() {
    const input = +prompt(`Please input a whole number between \
1 and 64. This will create an n x n grid for you to draw in!`);
    generateDrawingBoard(input);
}

generateDrawingBoard(16);

penButton.addEventListener("click", enablePen);
eraserButton.addEventListener("click", enableEraser);
randomButton.addEventListener("click", enableRandomPen);
opacityButton.addEventListener("click", toggleOpacity);
resizeButton.addEventListener("click", makeNewGrid);