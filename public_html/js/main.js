var offset = null;
var width = 700, height = 700;
var bound = 200;
var boardWidth = width - bound, boardHeight = height - bound;
var canvas = null, ctx = null;
var xElem = 25, yElem = 25;
var counter = 0;
var cellSize = Math.round((boardWidth - 1) / xElem);
//var numX = new Array();
//var numY = new Array();
var board = new Array(xElem);
var numbersX, numbersY;
for (i = 0; i < board.length; i++) {
    board[i] = new Array(yElem);
    for (j = 0; j < board[i].length; j++) {
        board[i][j] = 0;
    }
}
//
//for (i = 0; i < xElem; i++) {
//    numX[i] = new Array();
//}
//
//for (i = 0; i < xElem; i++) {
//    var ammount = Math.floor(Math.random() * 6 + 1);
//    for (j = 0; j < ammount; j++) {
//        numX[i].push(Math.floor(Math.random() * 10 + 1));
//    }
//}


function draw() {
    canvas = document.getElementById('canvas');
    offset = $(canvas).offset();
    canvas.width = width;
    canvas.height = height;
    canvas.addEventListener("click", drawElem, false);
    canvas.addEventListener("contextmenu", drawX, false);
    if (canvas.getContext) {
        ctx = canvas.getContext("2d");


        drawBoard();
        // drawNumbers();
    }
}

function drawNumbers() {
    ctx.font = "bold 10px sans-serif";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (i = 0; i < numbersX.length; i++) {
        var ammountX = numbersX[i].length;
        var ammountY = numbersY[i].length;
        var amm;
        if(ammountX>ammountY) amm = ammountX;
        else amm = ammountY;
        
        var startX = bound - ammountX * 20;
        var startY = bound - ammountY *20;
        for (j = 0; j < amm; j++) {
            if(numbersX[i][j]!== undefined){
            ctx.fillText(numbersX[i][j], startX + 12 * j, cellSize * i + bound + 6);
            }
            if(numbersY[i][j]!== undefined){
            ctx.fillText(numbersY[i][j], cellSize * i + bound + 6, startY + 12 * j);
            }
        }

    }
}

function drawX(e) {
    e.preventDefault();
    var x = e.pageX - offset.left - bound;
    var y = e.pageY - offset.top - bound;
    console.log(x + ' : ' + y);
    console.log(cellSize);
    var rectX = parseInt(x / cellSize);
    var rectY = parseInt(y / cellSize);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    var startX = rectX * cellSize + bound;
    var startY = rectY * cellSize + bound;
    var offX = 0, offY = 0;
    if (xElem - rectX == 1) {
        offX = 1;
    }
    if (yElem - rectY == 1) {
        offY = 1;
    }
    if (board[rectX][rectY] == 1) {
        ctx.clearRect(rectX * cellSize + 3 + bound, rectY * cellSize + 3 + bound, cellSize - 6 - offX, cellSize - 6 - offY);
    }
    ctx.beginPath();
    ctx.moveTo(startX + 5, startY + 5);
    ctx.lineTo(startX + cellSize - 5, startY + cellSize - 5);
    ctx.moveTo(startX + cellSize - 5, startY + 5);
    ctx.lineTo(startX + 5, startY + cellSize - 5);
    ctx.stroke();
    board[rectX][rectY] = -1;
}

function drawBoard() {
    ctx.strokeStyle = "#b0b0b0";
    for (i = 0; i <= xElem; i++) {
        if (counter == 5) {
            ctx.lineWidth = 2;
            counter = 0;
        }
        else {
            ctx.lineWidth = 1;
        }
        ctx.beginPath();
        ctx.moveTo(0 + bound, i * cellSize + bound);
        ctx.lineTo(width, i * cellSize + bound);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(i * cellSize + bound, 0 + bound);
        ctx.lineTo(i * cellSize + bound, height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(i * cellSize + bound, 0);
        ctx.lineTo(i * cellSize + bound, bound);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * cellSize + bound);
        ctx.lineTo(bound, i * cellSize + bound);
        ctx.stroke();
        counter++;
    }
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.strokeRect(bound - 1, bound - 1, boardWidth, boardHeight);
}


function drawElem(e) {
    var x = e.pageX - offset.left - bound;
    var y = e.pageY - offset.top - bound;
    var offX = 0, offY = 0;
    var rectX = parseInt(x / cellSize);
    var rectY = parseInt(y / cellSize);
    ctx.fillStyle = "rgb(0,0,0)";
    if (xElem - rectX == 1) {
        offX = 1;
    }
    if (yElem - rectY == 1) {
        offY = 1;
    }
    if (board[rectX][rectY] == 0 || board[rectX][rectY] == -1) {

        ctx.fillRect(rectX * cellSize + 3 + bound, rectY * cellSize + 3 + bound, cellSize - 6 - offX, cellSize - 6 - offY);

        board[rectX][rectY] = 1;

    }
    else {
        ctx.clearRect(rectX * cellSize + 3 + bound, rectY * cellSize + 3 + bound, cellSize - 6 - offX, cellSize - 6 - offY);

        board[rectX][rectY] = 0;
    }
}
function computeNumbers() {
    var counterX = 0;
    var counterY = new Array(xElem);

    numbersX = new Array(yElem);
    numbersY = new Array(xElem);

    for (i = 0; i < numbersY.length; i++) {
        numbersY[i] = new Array();
        counterY[i] = 0;
    }
    for (i = 0; i < numbersY.length; i++) {
        numbersX[i] = new Array();

        for (j = 0; j < numbersX.length; j++) {
            if (board[j][i] == 1) {
                counterX++;
            }
            else {
                if (counterX != 0) {
                    numbersX[i].push(counterX);
                    counterX = 0;
                }

            }
            if (board[j][i] == 1) {
                counterY[j]++;
            }
            
            else {
                if (counterY[j] != 0) {
                    numbersY[j].push(counterY[j]);
                    counterY[j] = 0;
                }

            }
        }


    }
}

function logArrayElements(element, index, array) {
    if (element == 1) {

    }
}
function save() {

}
$(document).ready(function() {
    draw();
    $('#table').click(function() {
        computeNumbers();
    });
        $('#numbers').click(function() {
        drawNumbers();
    });
});