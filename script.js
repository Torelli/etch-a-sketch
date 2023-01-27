const html = document.querySelector("html");
const themeButton = document.querySelector("#theme-btn");
const gridContainer = document.querySelector(".grid-container");
const squareList = [];
let down = false;
let downListener = () => down = true;
let upListener = () => down = false;

function changeColor(square) {
    square.setAttribute("style","background-color: black;");
}

function changeSize(size) {
    size = size ** 2;
    for(let i = 0; i < size; i++){
        squareList.push(document.createElement("div"));
        squareList[i].classList.add("square");
        gridContainer.appendChild(squareList[i]);
    }
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




const allSquares = document.querySelectorAll(".square");

gridContainer.addEventListener("mousedown", downListener);

document.body.addEventListener("mouseup", upListener);


allSquares.forEach((square) => {
    square.addEventListener("mouseover",() => {
        if(down) changeColor(square);
    });
    square.addEventListener("click", () => changeColor(square));
});