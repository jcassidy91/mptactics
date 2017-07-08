class Board {
    constructor(xx,yy,numX,numY,size,ui) {
        this.socket = socket;
        this.ui = ui;
        this.x = xx;
        this.y = yy;
        this.gridSize = size;
        this.w = numX*size;
        this.h = numY*size;
        this.tiles = [];
        this.bounds = {min:{x:this.x, y:this.y},
                       max:{x:this.x + this.w - this.gridSize,
                            y:this.y + this.h - this.gridSize}};
        this.cursor = new Cursor(size, this);
        this.commandBuffer = [];
        this.state = "idle";

        //this.socket.on('move', this.addCommand.bind(this));
        this.socket.on('move', this.addCommand.bind(this));
        
    }

    addCommand(data) {
        this.commandBuffer.push(data);
    }
    
    moveUnit(data) {
        this.state = "moving";
        let unit = this.tiles.find(u => {
            return (u.position.x === data.sx &&
                u.position.y === data.sy)
        })

        try{ 
            unit.setPath(data.path, () => {
                this.state="idle";
                this.commandBuffer.splice(0,1);
                this.nextCommand.bind(this);
            }) 
        } catch(e) {
            alert("desync error has occured");
        }
    }

    nextCommand() {
        console.log("next command");
        const command = this.commandBuffer[0];

        switch (command.type) {
            case "move":
                this.moveUnit(command);
                break;
            default:
                console.log("next command failed: ");
                console.log(command);
                break;
        }
    }

    Draw() {
        for (let i = 0; i < this.w; i+=this.gridSize) {
            for (let j = 0; j < this.h; j+=this.gridSize) {
                if ((i + j) % (this.gridSize*2)) {
                    fill(100,200,100);
                } else {
                    fill(150,200,100);
                }
                rect(i+this.x,j+this.y,this.gridSize,this.gridSize);
            }
        }
        
        for (let t of this.tiles) {
            t.drawSelf();
        }
        
        this.cursor.Update();
    }
    
    Update() {
                this.tiles = this.tiles.filter(t => {return !t.destroy})
        this.Draw();
        
        for(let t of this.tiles) {
            t.Update();
        }

        if (this.state === "idle") {
            if (this.commandBuffer.length > 0) {
                this.nextCommand();
            }
        }
    }

    cursorObject() {
        return this.tiles.find(t => {
            return t.position.x === this.cursor.x &&
                   t.position.y === this.cursor.y
            }
        )
    }
}