class Button extends UIObject {
    constructor(xx,yy,ww,hh,func) {
        super(xx,yy,ww,hh)
        this.func = func;
        this.hoverColor = color(225);
        this.upColor = color(200);
        this.downColor = color(150);
        this.tag = "UI";
    }
    
    click() {
        this.func();
    }
    
    drawSelf() {
        if (this.visible) {
            this.down?
                fill(this.downColor):this.hover?
                    fill(this.hoverColor):fill(this.upColor);
            rect(this.position.x,this.position.y,this.w,this.h)
        }
    }
}