const html = document.querySelector("html");
const themeButton = document.querySelector("#theme-btn");
const gridContainer = document.querySelector(".grid-container");
const sizeDisplay = document.querySelector("#size-display");
const sizeRange = document.querySelector("#size-range");
let squareList = [];
let allSquares = null;
let down = false;
let downListener = () => down = true;
let upListener = () => down = false;

function changeColor(square) {
    square.setAttribute("style","background-color: black;");
}

function clearGrid() {
    allSquares.forEach( (square) => {
        gridContainer.removeChild(square);
    });
}

function changeSize(size) {
    if (allSquares != null) {
        allSquares.forEach((square) => {
            square.removeEventListener("mouseover",() => {
            if(down) changeColor(square);
            });
            square.removeEventListener("click", () => changeColor(square));
        });
        allSquares = null;
    }
    squareList = [];
    if(size == 1) {
        gridContainer.setAttribute("style",`grid-template-columns: 1fr;`);
        squareList.push(document.createElement("div"));
        squareList[0].classList.add("square");
        gridContainer.appendChild(squareList[0]);
    } else {
        gridContainer.setAttribute("style",`grid-template-columns: repeat(${size},1fr);`);
        size = size ** 2;
        for(let i = 0; i < size; i++){
            squareList.push(document.createElement("div"));
            squareList[i].classList.add("square");
            gridContainer.appendChild(squareList[i]);
        }
    }
    allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square) => {
        square.addEventListener("mouseover",() => {
        if(down) changeColor(square);
        });
        square.addEventListener("click", () => changeColor(square));
    });
}

themeButton.addEventListener('click', () => {
    if(html.getAttribute("data-theme") === "dark"){
        html.setAttribute('data-theme','light');
        themeButton.setAttribute("data-tooltip", "Turn on dark mode");
    } else {
        html.setAttribute('data-theme','dark');
        themeButton.setAttribute("data-tooltip", "Turn off dark mode");
    }
});

changeSize(16);

sizeRange.addEventListener("mousemove", (e) => {
    sizeDisplay.textContent = `${e.target.value}x${e.target.value}`;
});

sizeRange.addEventListener("change", (e) => {
    clearGrid();
    // console.log(e.target.value);
    changeSize(e.target.value);
});

gridContainer.addEventListener("mousedown", downListener);

document.body.addEventListener("mouseup", upListener);