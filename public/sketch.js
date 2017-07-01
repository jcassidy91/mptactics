var socket;
var port = process.env.PORT || 3000;

function setup() {
    createCanvas(400,400);
    background(50);
    socket = io.connect(port);
    socket.on('mouse', newDrawing);
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
    
    noStroke();
    fill(255);
    ellipse(mouseX,mouseY,20,20);
}

function draw() {
    
}