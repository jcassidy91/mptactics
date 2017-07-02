var socket;
var port = process.env.PORT || 3000;

var board;
var pieces;
var img;


function setup() {
    createCanvas(600,400);
    background(50);
    noStroke();
    socket = io.connect(port);
    socket.on('mouse', newDrawing);
    
    
    pieces = [];
    loadImages();
    setTimeout(init(),500);
}

function init() {
    board = new Board(0,0,12,12,32);
    
    let player = new Unit(32,32,32,48,img.red);
    player.imageOrigin={x:0, y:16};
    player.setAnimation(true,4,4);
    board.tiles.push(player);
    
    let player2 = new Unit(256,256,32,48,img.blue);
    player2.imageOrigin={x:0, y:16};
    board.tiles.push(player2);    
}

function newDrawing(data) {
    noStroke();
    fill(0,0,255);
    ellipse(data.x,data.y,20,20);
}

function mouseDragged() {
    
    var data = {
        x:mouseX,
        y:mouseY
    };
    
    socket.emit('mouse',data);
    
    
    fill(255);
    ellipse(mouseX,mouseY,20,20);
}

function draw() {
    background(51);
    board.Update();
}