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
    }
    
    Update() {
        if (this.grid !== null) {
            this.grid.drawArrow();
        }
        
        super.Update();
    }
    
    cancel() {
        this.selected = false;
        this.grid = null;
        this.position.x = this.prevState.position.x;
        this.position.y = this.prevState.position.y;
        //this.pathStart = -1;
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
            
            if (this.grid === null) {
                this.grid = new Grid(this.position.x,   
                                     this.position.y,
                                     this.stats.speed,
                                     32,this.board,
                                     this.ui);
            }
        } else {
            this.setAnimation(false, 0, 0);
            this.imageIndex.row = 0;
            this.grid = null;
        }
        super.drawSelf();
        noTint();
    }
    
    endTurn() {
        this.ended = true;
        var data = {
            sx: this.prevState.position.x,
            sy: this.prevState.position.y,
            x: this.position.x,
            y: this.position.y,
            path: this.path
        }
        console.log(this.path)
        this.board.socket.emit('move', data);
    }
    
    setPath(path,callback) {
        this.prevState = {position: {x:this.position.x, 
                                     y:this.position.y}
                         };
        this.startPath(path,callback);
    }
}