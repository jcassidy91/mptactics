class Cursor {
    constructor(size, board) {
        this.board = board;
        this.bounds = this.board.bounds;
        this.x;
        this.y;
        this.size = size;
        this.Update();
        this.state = "idle";
        this.booped = false;
        this.selectedObj = null;
        this.menu = null;
    }
    
    actionMenu() {
        this.menu = new Menu(this.selectedObj.position.x+this.board.gridSize, this.selectedObj.position.y, ["pokemon", "item", "end"], this.selectedObj);
    }
    
    boop() {
        this.booped = true;
        setTimeout(() => {this.booped = false}, 100);
    }
    
    click() {
        switch (this.state) {
            case "idle":
                this.selectedObj = this.selectObj();
                if (this.selectedObj === undefined) {
                    this.deselectObj();
                }
                break;
            case "moveTile":
                if (this.selectObj() === undefined) {
                    this.deselectObj();
                }
                break;
            case "wait":
                break;
            case "action menu":
                break;
            default:
                console.log("No click action for cursor state: " + this.state)
        }
    }
    
    deselectObj() {
        try {
                this.selectedObj.selected = false;
            } catch (e) {};
        for (let m of this.board.tiles.filter(t => {
                                            return t.tag === "moveTile"}
                                        )) {
            m.destroySelf();
        }
        this.selectedObj = null;
        this.state = "idle";
    }
    
    drawSelf() {
        if (this.booped) {
            fill(150,200,255,150);
        } else {
            fill(50,150,250,100);
        }
        
        rect(this.x,this.y,this.size,this.size);
    }
    
    selectObj() {
        var obj;
        if (obj = this.board.cursorObject()) {
            try {
                if (!obj.ended) {
                    obj.selected = true;
                    return obj;
                } else {
                    return undefined;
                }
            } catch (e) {};
        } else {
            return undefined;
        }
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
            if (this.state === "idle" || this.state === "moveTile") {
                noCursor();
                this.drawSelf();
            } else {
                cursor();
            }
        }
        
    }
    
}