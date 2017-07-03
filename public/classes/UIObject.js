class UIObject {
    constructor(xx,yy,ww,hh) {
        this.x = xx;
        this.y = yy;
        this.w = ww;
        this.h = hh;
    }
    
    click() {
        
    }
    
    listenInteract() {
        if (this.checkClick()) {
            this.click()
        }
    }
    
    checkHover() {
        return (mouseX > this.x &&
                mouseX < this.x + this.w &&
                mouseY > this.y &&
                mouseY < this.y + this.h
               )
    }
    
    checkClick() {
        return (this.checkHover() && mouseIsPressed && mouseButton === LEFT)
    }
}