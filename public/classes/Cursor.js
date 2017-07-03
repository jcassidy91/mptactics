class Cursor {
    constructor(size, board) {
        this.board = board;
        this.bounds = this.board.bounds;
        this.x;
        this.y;
        this.size = size;
        this.Update();
        this.state = "idle";
    }
    
    Update() {
        this.x = min(max(floor(mouseX/this.size)*this.size,
                         this.bounds.min.x
                        ),
                     this.bounds.max.x
                    );
        
        this.y = min(max(floor(mouseY/this.size)*this.size,
                         this.bounds.min.y
                        ),
                     this.bounds.max.y
                    );
        
        if (mouseX > this.bounds.max.x + this.size ||
            mouseY > this.bounds.max.y + this.size) {
            cursor();
        } else {
            noCursor();
            this.drawSelf();
        }
        
    }
    
    drawSelf() {
        fill(50,150,250,100);
        rect(this.x,this.y,this.size,this.size);
    }
}