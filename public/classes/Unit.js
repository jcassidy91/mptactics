class Unit extends GameObject {
    constructor(xx,yy,ww,hh,img,stats,board) {
        super(xx,yy,ww,hh,img);
        this.ended = false;
        this.selected = false;
        this.grid = null;
        this.board = board;
        this.prevState;
        this.state = "idle";
        this.stats = stats;
        this.turnData =[];
    }
    
    Update() {
        if (this.grid !== null && !this.grid.destroy && this.grid.type === "move") {
            this.grid.drawArrow();
        }
        
        super.Update();
    }
    
    cancel() {
        this.selected = false;
        this.grid = null;

        if (!this.ended) {
            this.position.x = this.prevState.position.x;
            this.position.y = this.prevState.position.y;
        }
    }

    createMoveGrid() {
        this.turnData = [];
        this.grid = new Grid("move", this.position.x,   
                                 this.position.y,
                                 this.stats.speed,
                                 32,this.board,
                                 this.ui);
    }
    
    drawSelf() {
        if (this.ended) {
            tint(150);
        }
        if (this.selected) {
            fill(0,200,250,100);
            rect(this.position.x,
                 this.position.y,
                 32,32
                );
            this.setAnimation(true, 4, 4);
        } else {
            this.setAnimation(false, 0, 0);
            this.imageIndex.row = 0;
            this.grid = null;
        }
        super.drawSelf();
        noTint();
    }
    
    endTurn() {
        this.turnData.push(
            {
                type: "end",
                x: this.position.x,
                y: this.position.y
            }
        )
        this.ended = true;
        this.board.cursor.deselectObj();

        try { 
            this.grid.destroySelf();
            this.grid = null;
        } catch (e) {}

        for (let cmd of this.turnData) {
            this.board.socket.emit('move', cmd);
        }
        this.turnData = [];
    }
    
    setPath(path,callback) {
        this.prevState = {position: {x:this.position.x, 
                                     y:this.position.y}
                         };
        this.startPath(path,callback);
    }    

    actionMenu() {
        this.turnData.push(
            {
                type: "move",
                sx: this.prevState.position.x,
                sy: this.prevState.position.y,
                x: this.position.x,
                y: this.position.y,
                path: this.path
            }
        )
        this.board.cursor.actionMenu();
    }
}