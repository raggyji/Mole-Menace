let currMoleTile;
let currPlantTile1;
let currPlantTile2;
let score = 0;
let gameOver = false;

const startingMinutes = 1;
let time = startingMinutes * 60;

const countdownEl = document.getElementById('countdown');

function updateCountdown() {
    const minutes = Math.floor(time/60);
    let seconds = time % 60;
    if (countdownEl.innerHTML == '0: 0'){
        document.getElementById("score").innerText = "GAME OVER: " + score.toString();
        gameOver = true;
        return;
    }
    if (gameOver){
        return;
    }
    countdownEl.innerHTML = `${minutes}: ${seconds}`;
    time--;
}

const button = document.getElementById("countdown")

button.addEventListener("click", () => {
    button.style.backgroundColor = 'rgb(153, 153, 153)';
})

button.onclick = function(){
    setGame();
}
// window.onload = function(){
//    setGame();
// }

function setGame() {
    // we're gonna setup the grid for game board in HTML
    for (let i=0; i<9; i++){
        let tile= document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile)
    }

    setInterval(setMole, 1000); // 1000ms = 1s
    setInterval(setPlant1, 2000); // 2000ms = 2s
    setInterval(setPlant2, 2000); // 2000ms = 2s
    setInterval(updateCountdown, 1000);
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {

    if (gameOver){
        return;
    }

    if (currMoleTile) {
        currMoleTile.innerHTML = ""
    }

    let mole = document.createElement("img")
    mole.src = "monty-mole.png"

    let num = getRandomTile();

    if (currPlantTile1 && currPlantTile1.id == num){
        return;
    }

    if (currPlantTile2 && currPlantTile2.id == num){
        return;
    }

    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole)
}

function setPlant1() {

    if (gameOver){
        return;
    }

    if (currPlantTile1) {
        currPlantTile1.innerHTML = ""
    }

    let plant = document.createElement("img")
    plant.src = "piranha-plant.png"

    let num = getRandomTile();

    if (currMoleTile && currMoleTile.id == num){
        return;
    }

    currPlantTile1 = document.getElementById(num);
    currPlantTile1.appendChild(plant)

    if (currPlantTile1.id == currPlantTile2.id){
        currPlantTile1.innerHTML = ""
    }
}

function setPlant2() {

    let num = getRandomTile();

    if (gameOver){
        return;
    }

    if (currPlantTile2) {
        currPlantTile2.innerHTML = ""
    }

    let plant = document.createElement("img")
    plant.src = "piranha-plant.png"

    if (currMoleTile && currMoleTile.id == num){
        return;
    }

    currPlantTile2 = document.getElementById(num);
    currPlantTile2.appendChild(plant)

    if (currPlantTile2.id == currPlantTile1.id){
        currPlantTile2.innerHTML = ""
    }
}

function selectTile() {

    if (gameOver){
        return;
    }

    if (this == currMoleTile){
        score += 10;
        document.getElementById("score").innerText  = score.toString(); // gonna keep updating the score
    }

    else if (this == currPlantTile1){
        document.getElementById("score").innerText = "GAME OVER: " + score.toString();
        gameOver = true;
    }

    else if (this == currPlantTile2){
        document.getElementById("score").innerText = "GAME OVER: " + score.toString();
        gameOver = true;
    }
}

// TO MAKE IT YOUR OWN , Make 2 Piranha Plants and set time limit to 1 minute!