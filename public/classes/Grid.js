class GridTile extends UIObject{
    constructor(xx,yy,size,grid) {
        super(xx,yy,size,size,null);
        this.size = size;
        this.selected = false;
        this.grid = grid;
        this.init();
        this.tag;
        this.button;
        this.params;
    }
    
    init() {
        this.button = new Button(this.position.x,this.position.y,
                                 this.size,this.size,
                                 "",
                                 this.getFunc.bind(this)
                                )
        this.button.visible = false;
        this.grid.board.ui.push(this.button);
    }

    getFunc() {
        if (this.tag === "moveTile") {
            this.setPath();
        } else {
            switch(this.type) {
                case "pokeball":
                    let unit = this.grid.params.unit
                    unit.turnData.push(
                        {
                            type: "pokeball",
                            startPos: unit.position,
                            endPos: this.getPosition()
                        }
                    )
                    unit.endTurn();
                    let p = new Pokeball(unit.position,
                                this.getPosition(),
                                this.grid.params.pokemon,
                                this.grid.board);
                    this.grid.board.tiles.push(p);
                    break;
                default:
                    console.log("no function for: " + this.type);
                    break;
            }
        }
    }
    
    getPosition() {
        return {x:this.position.x, y:this.position.y};
    }
    
    setPath() {
        const selectedObj = this.grid.board.cursor.selectedObj;
        selectedObj.setPath(this.grid.path,
                            selectedObj.actionMenu.bind(selectedObj));
        let unit = this.grid.board.cursor.selectedObj;
        //this.grid.board.cursor.deselectObj();

        this.grid.board.cursor.selectedObj = unit;
        this.grid.board.cursor.state = "wait";
        this.grid.destroySelf();
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
        if (this.tag === "moveTile") {
            fill(150,200,250,100);
        } else {
            fill(200,50,50,100);
        }
        rect(this.position.x,this.position.y,this.size,this.size);
    }
}

class Grid {
    constructor(type, xx,yy,steps,size,board) {
        this.type = type;
        this.position = {x:xx, y:yy};
        this.steps = steps;
        this.gridSize = size;
        this.board = board;
        this.path = [];
        this.myTiles = [];
        this.Init();
    }

    destroySelf() {
        this.destroy = true;
        for (let t of this.myTiles) {
            t.destroySelf();
        }
    }
    
    drawArrow() {
        
        //Find moveTile under cursor (or undefined)
        let m = this.board.tiles.find(e => {
            return (e.id !== undefined &&
                e.id.x * this.gridSize + this.position.x === this.board.cursor.x &&
                e.id.y * this.gridSize + this.position.y === this.board.cursor.y
            )
        })
        
        if (m === undefined) {
            //Off Grid
            this.path = [{x: this.position.x, y: this.position.y}];
        } else if (this.path.length < this.steps+1 &&
                   (abs(this.path[this.path.length-1].x - 
                   this.board.cursor.x) +
                  abs(this.path[this.path.length-1].y - 
                   this.board.cursor.y) === this.gridSize)
                   ) {
            if (this.path.find(t => 
                                    (t.x === this.board.cursor.x &&
                                    t.y === this.board.cursor.y)
                            ) !== undefined) {
                //Visiting duplicate square
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
            //Generate Path
            this.path = [];
            while(m !== undefined) {
                this.path.push({x: m.position.x, y:m.position.y});
                m = m.parent;
            }
            this.path.reverse();
        }

        //Draw Path
        fill(255,100,100,100);
        for (let p of this.path) {
            rect(p.x, p.y, this.gridSize, this.gridSize);
        }
    }
    
    Init() {
        this.path.push({x: this.position.x, y: this.position.y});
        var tiles = [];
        
        //Create tiles
        for (let i = -this.steps; i <= this.steps; i++) {
            for (let j = -this.steps; j <= this.steps; j++) {
                if (abs(i)+abs(j) <= this.steps) {

                    let m = new GridTile(this.position.x + 
                                          i*this.gridSize,
                                          this.position.y + 
                                          j*this.gridSize, 
                                          this.gridSize, this 
                                         )
                    m.tag = (this.type === "move")?"moveTile":"attackTile";
                    m.type = this.type;
                    m.id = {x:i, y:j};
                    tiles.push(m);
                }
            }
        }
        
        //Set parent
        if (this.type === "move" ) {
            for (let m of tiles) {
                let j = m.id.y;
                let i = m.id.x;
                if (abs(j) > 0) {
                        m.parent = tiles.find(e => {
                            return ((e.id.x === i) &&
                            (e.id.y === (j - Math.sign(j))));
                        });                            
                    } 

                    if (m.parent === undefined && abs(i) > 0) {
                        m.parent = tiles.find(e => {
                            return ((e.id.x === (i - Math.sign(i))) &&
                            (e.id.y === j));
                        });   
                    }
            }
        }
        //Add to board tiles
        for (let m of tiles) {
            this.board.tiles.push(m);
            this.myTiles.push(m);
        }
    }

}

