class Button extends UIObject {
    constructor(xx,yy,ww,hh,func) {
        super(xx,yy,ww,hh)
        this.x = xx;
        this.y = yy;
        this.w = ww;
        this.h = hh;
        this.func = func;
        this.myColor = color(200);
        this.tag = "UI"
    }
    
    click() {
        this.func();
    }
    
    drawSelf() {
        fill(this.myColor);
        rect(this.x,this.y,this.w,this.h)
    }
}