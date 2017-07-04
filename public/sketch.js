window.addEventListener('mousedown',onMouseDown,false);
window.addEventListener('mouseup',onMouseUp,false);

var socket;
//socket.emit('mouse',data);
var port = process.env.PORT || 3000;

var board;
var pieces;
var img;
var cam = {x:0, y:0};
var mousePoint;
var selectedObj;

var UI;

function setup() {
    createCanvas(600,400);
    background(50);
    noStroke();
    socket = io.connect(port);
//    socket.on('mouse', newDrawing);
    
    UI = [];
    loadImages();
    setTimeout(init(),500);
}

function init() {
    board = new Board(0,0,12,12,32,UI);
    cam = {x:0,y:0};
    
    let player = new Unit(32,32,32,48,img.red,{speed:8},board);
    player.imageOrigin={x:0, y:16};
    board.tiles.push(player);
    
    let player2 = new Unit(256,256,32,48,img.blue,{speed:6},board);
    player2.imageOrigin={x:0, y:16};
    board.tiles.push(player2);   
    
    let button = new Button(420, 360, 150, 40, function() 
                                            {console.log("boops!")});
    UI.push(button);
}

function draw() {
    checkDestroyed();
    background(51);
    translate(-cam.x,-cam.y);
    
    board.Update();
    
    for (u of UI) {
        u.drawSelf();
        u.update();
    }
}

function checkDestroyed() {
    UI = UI.filter(t => {return !t.destroy});
    board.tiles = board.tiles.filter(t => {return !t.destroy})
    board.ui = UI;
}

function onMouseDown() {
    board.cursor.boop();
    
    for(u of UI) {
        u.mouseDown();
    }
}

function onMouseUp() {
    if (mouseButton === LEFT) {
        board.cursor.click();
    }
    if (mouseButton === RIGHT) {
        board.cursor.deselectObj();
    }
    
    for(u of UI) {
        u.mouseUp();
    }
}