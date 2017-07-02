var socket;
var port = process.env.PORT || 3000;

var pieces;
var img; 


function setup() {
    createCanvas(400,400);
    background(50);
    noStroke();
    socket = io.connect(port);
    socket.on('mouse', newDrawing);
    
    pieces = [];
    loadImages();
    setTimeout(init(),500);
}

function init() {
    pieces.push(new Unit(32,32,32,48,img.red))
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
    drawBoard(400,400,32);
    drawPieces();
}

function drawPieces() {

    for (p of pieces) {
        p.Update();
        p.setAnimation(true, 4, 4);
    }

}

function drawBoard(w,h,size) {
    for (let i = 0; i < w; i+=size) {
        for (let j = 0; j < h; j+=size) {
            if ((i + j) % (size*2)) {
                fill(100,200,100);
            } else {
                fill(150,200,100);
            }
            rect(i,j,size,size);
        }
    }
}