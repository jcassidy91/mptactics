class UIObject {
    constructor(xx,yy,ww,hh) {
        this.position = {x:xx, y:yy};
        this.w = ww;
        this.h = hh;
        this.visible = true;
        this.down = false;
        this.hover = false;
        this.destroy = false;
    }
    
    click() {
        
    }
    
    checkHover() {
        return (mouseX > this.position.x &&
                mouseX < this.position.x + this.w &&
                mouseY > this.position.y &&
                mouseY < this.position.y + this.h
               )
    }
    
    mouseUp() {
        if (this.checkHover() && this.down) {
            this.click(); 
            this.down=false
        }
    }
    
    mouseDown() {
        if (this.checkHover()) {this.down = true};
    }
    
    update() {
        this.hover = this.checkHover();
        if (!this.hover) {
            this.down = false;
        } 
    }
}