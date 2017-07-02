class Board {
    constructor(xx,yy,numX,numY,size) {
        this.x = xx;
        this.y = yy;
        this.gridSize = size;
        this.w = numX*size;
        this.h = numY*size;
        this.tiles = [];
        this.cursor = new Cursor(size,{min:{x:this.x,
                                            y:this.y},
                                       max:{x:this.x +
                                              this.w -
                                              this.gridSize,
                                            y:this.y +
                                              this.h -
                                              this.gridSize
                                           }
                                      }
                                );
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
        this.Draw();
        
        for(let t of this.tiles) {
            t.Update();
        }
    }
}