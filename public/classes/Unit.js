class Unit extends GameObject {
    constructor(xx,yy,ww,hh,img) {
        super(xx,yy,ww,hh,img);
        this.ended = false;
        this.selected = false;
    }
    
    Update() {
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
        }
        super.drawSelf();
        noTint();
    }
}