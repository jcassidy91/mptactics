class MoveTile extends UIObject{
    constructor(xx,yy,size,grid) {
        super(xx,yy,size,size,null);
        this.size = size;
        this.selected = false;
        this.grid = grid;
        this.init();
        this.tag = "moveTile";
        this.button;
    }
    
    init() {
        this.button = new Button(this.position.x,this.position.y,this.size,this.size,
                                 () => {this.setPath()}
              )
        this.button.visible = false;
        this.grid.board.ui.push(this.button);
    }
    
    getPosition() {
        return {x:this.position.x, y:this.position.y};
    }
    
    setPath() {
        this.grid.board.cursor.selectedObj.setPath(this.grid.path);
        this.grid.board.cursor.deselectObj();
    }
    
    Update() {
        if (this.grid.board.cursor.state === "idle") {
            this.grid.board.cursor.state = "moveTile";
        }
    }
    
    destroySelf() {
        this.button.destroy = true;
        this.destroy = true;
    }
    
    drawSelf() {
        //fill(150,200,250,100+50*sin(millis()*1000/TWO_PI));
        fill(150,200,250,100);
        rect(this.position.x,this.position.y,this.size,this.size);
    }
}

class Grid {
    constructor(xx,yy,steps,size,board) {
        this.position = {x:xx, y:yy};
        this.steps = steps;
        this.gridSize = size;
        this.board = board;
        this.path = [];
        this.Init();
    }
    
    drawArrow() {
        fill(255,100,100,100);
        let m = this.board.tiles.find(e => {
            return (e.id !== undefined &&
                e.id.x * this.gridSize + this.position.x === this.board.cursor.x &&
                e.id.y * this.gridSize + this.position.y === this.board.cursor.y
            )
        })
        
        if (m === undefined) {
            console.log("off path");
            this.path = [{x: this.position.x, y: this.position.y}];
        } else if (this.path.length < this.steps+1 &&
                   (abs(this.path[this.path.length-1].x - 
                   this.board.cursor.x) +
                  abs(this.path[this.path.length-1].y - 
                   this.board.cursor.y) === this.gridSize)
                   ) {
            console.log("Next to tile");
            if (this.path.find(t => 
                                    (t.x === this.board.cursor.x &&
                                    t.y === this.board.cursor.y)
                            ) !== undefined) {
                    let newPath = [];
                    let i = 0;
                    while (this.path[i].x !== this.board.cursor.x ||
                          this.path[i].y !== this.board.cursor.y) {
                        newPath.push(this.path[i]);
                        i++;
                    }
                    this.path = newPath;
                }
            
            this.path.push({x: this.board.cursor.x, 
                            y: this.board.cursor.y});
        } else if (this.path[this.path.length-1].x !== 
                   this.board.cursor.x ||
                    this.path[this.path.length-1].y !== 
                   this.board.cursor.y) {
            this.path = [];
            while(m !== undefined) {
                this.path.push({x: m.position.x, y:m.position.y});
                m = m.parent;
            }
            this.path.reverse();
            console.log("repath");
        }
        
        
        
        //GenPath
        for (let p of this.path) {
            rect(p.x, p.y, this.gridSize, this.gridSize);
        }
    }
    
    Init() {
        this.path.push({x: this.position.x, y: this.position.y});
        var moveTiles = [];
        
        //Create tiles
        for (let i = -this.steps; i <= this.steps; i++) {
            for (let j = -this.steps; j <= this.steps; j++) {
                if (abs(i)+abs(j) <= this.steps) {
                    let m = new MoveTile(
                                          this.position.x + i*this.gridSize,
                                          this.position.y + j*this.gridSize, this.gridSize, this 
                                         )
                    m.tag = "moveTile";
                    m.id = {x:i, y:j};
                    moveTiles.push(m);
                }
            }
        }
        
        //Set parent
        for (let m of moveTiles) {
            let j = m.id.y;
            let i = m.id.x;
            if (abs(j) > 0) {
                    m.parent = moveTiles.find(e => {
                        return ((e.id.x === i) &&
                        (e.id.y === (j - Math.sign(j))));
                    });                            
                } 

                if (m.parent === undefined && abs(i) > 0) {
                    m.parent = moveTiles.find(e => {
                        return ((e.id.x === (i - Math.sign(i))) &&
                        (e.id.y === j));
                    });   
                }
        }
        
        //Add to board tiles
        for (let m of moveTiles) {
            this.board.tiles.push(m);
        }
    }
    
    getPath() {
        
    }
}

