

class Menu {
    constructor(xx, yy, a, unit) {
        this.x = xx;
        this.y = yy;
        this.a = a;
        this.unit = unit;
        this.buttons = [];
        
        this.init();
        this.click = click.bind(this);
        window.addEventListener("mousedown",this.click,true);
        
    }  
    
    init() {
        
        let i = 0;
        for (let item of this.a) {
            let btn = new Button(this.x,this.y - 
                                 this.unit.imageOrigin.y + 
                                 32*i,64,32,item,() => this.do(item,this));
            this.buttons.push(btn);
            i++;
        }
        for (let b of this.buttons) {
            this.unit.board.ui.push(b);
        }
    }
    
    do(func, instance) {
        switch(func) {
            case "end":
                instance.unit.endTurn();
                break;
            case "pokemon":
                let u = instance.unit;
                u.grid = new Grid("pokeball",
                                     u.position.x,   
                                     u.position.y,
                                     3,
                                     32,
                                     u.board,
                                     u.ui);
                u.grid.params = {unit: this.unit};
                break;
            default:
                console.log("menu default");
                break;
        }
        this.destroySelf();
    }
    
    destroySelf() {
        for (let b of this.buttons) {
            b.destroy = true;
        }
        this.destroy = true;
        this.unit.board.cursor.state = "idle";
        window.removeEventListener("mousedown",this.click,true);
    }
}

var click = function() {
    let check = false;
    for(let b of this.buttons) {
        if (b.hover) {
            check = true;
        }
    }
    if (!check) {
        this.unit.board.cursor.state = "idle";
        this.unit.cancel();
        this.destroySelf();
    }
}