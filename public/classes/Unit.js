class Unit extends GameObject {
    constructor(xx,yy,ww,hh,img,board,ui) {
        super(xx,yy,ww,hh,img);
        this.ended = false;
        this.selected = false;
        this.grid = null;
        this.board = board;
        this.prevState;
        this.state = "idle";
    }
    
    Update() {
        if (this.grid !== null) {
            this.grid.drawArrow();
        }
        
        super.Update();
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
                                     3,32,this.board,
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
    
    setPath(path) {
        this.prevState = {position: this.position};
        followPath(path);
    }
}