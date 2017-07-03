var socket;
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
    socket.on('mouse', newDrawing);
    
    UI = [];
    loadImages();
    setTimeout(init(),500);
}

function init() {
    board = new Board(0,0,12,12,32);
    cam = {x:0,y:0};
    
    let player = new Unit(32,32,32,48,img.red,board);
    player.imageOrigin={x:0, y:16};
    board.tiles.push(player);
    
    let player2 = new Unit(256,256,32,48,img.blue,board);
    player2.imageOrigin={x:0, y:16};
    board.tiles.push(player2);   
    
    let button = new Button(420, 360, 150, 40, function() 
                                            {console.log("boops!")});
    UI.push(button);
}

function newDrawing(data) {
    noStroke();
    fill(0,0,255);
    ellipse(data.x,data.y,20,20);
}

function mouseDragged() {
//    if (mouseButton === RIGHT) {
//        cam.x -= mouseX - mousePoint.x;
//        cam.y -= mouseY - mousePoint.y;
//    }
    mousePoint = {x:mouseX, y:mouseY};
    //socket.emit('mouse',data);
}

function draw() {
    background(51);
    translate(-cam.x,-cam.y);
    board.Update();
    for (e of UI) {
        e.drawSelf();
        e.listenInteract();
    }
}

function deselectObj() {
    try {
            selectedObj.selected = false;
        } catch (e) {};
    for (let m of board.tiles.filter(t => {
                                        return t.tag === "moveTile"}
                                    )) {
        m.destroy = true;
    }
    board.cursor.state = "idle";
}

function mouseClicked() {
    
    var obj;
    if (obj = board.cursorObject()) {
        try {
            obj.selected = true;
            selectedObj = obj;
        } catch (e) {};
    } else {
        deselectObj();
    }
}

function mousePressed() {
    if (mouseButton === RIGHT) {
        deselectObj();
    }
}