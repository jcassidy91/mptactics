class Button extends UIObject {
    constructor(xx,yy,ww,hh,label,func) {
        super(xx,yy,ww,hh)
        this.func = func;
        this.hoverColor = color(225);
        this.upColor = color(200);
        this.downColor = color(150);
        this.tag = "UI";
        this.label = label;
    }
    
    click() {
        this.func();
    }
    
    drawSelf() {
        if (this.visible) {
            this.down?
                fill(this.downColor):this.hover?
                    fill(this.hoverColor):fill(this.upColor);
            rect(this.position.x,this.position.y,this.w,this.h);
            fill(0);
            text(this.label,this.position.x + 8, this.position.y + 20);
        }
    }
}