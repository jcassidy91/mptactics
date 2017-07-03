class MoveTile extends GameObject{
    constructor(xx,yy,size,board) {
        super(xx,yy,size,size,null);
        this.size = size;
        this.selected = false;
        this.board = board;
    }
    
    Update() {
        if (this.board.cursor.state === "idle") {
            this.board.cursor.state = "moveTile";
        }
    }
    
    drawSelf() {
        //fill(150,200,250,100+50*sin(millis()*1000/TWO_PI));
        fill(150,200,250,100);
        rect(this.position.x,this.position.y,this.size,this.size);
    }
}

class Grid {
    constructor(xx,yy,steps,size,board) {
        this.x = xx;
        this.y = yy;
        this.steps = steps;
        this.gridSize = size;
        this.board = board;
        this.Init();
    }
    
    Init() {
        for (let i = -this.steps; i <= this.steps; i++) {
            for (let j = -this.steps; j <= this.steps; j++) {
                if (abs(i)+abs(j) <= this.steps) {
                    let m = new MoveTile(
                                          this.x + i*this.gridSize,
                                          this.y + j*this.gridSize, this.gridSize, this.board
                                         )
                    m.tag = "moveTile";
                    this.board.tiles.push(m);
                }
            }
        }
    }
}

