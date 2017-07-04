class GameObject {
    constructor(xx,yy,ww,hh,img) {
        this.position = {x: xx, y: yy};
        this.size = {width: ww, height: hh};
        this.img = img;
        this.animated = false;
        this.imageSpeed = 0;
        this.imageIndex = {row: 0, col: 0};
        this.images = 0;
        this.physics = false;
        this.velocity = {x:0, y:0};
        this.gravity = 0;
        this.clock = 0;
        this.visible = true;
        this.imageOrigin = {x:0, y:0};
        this.tag = "default";
        this.destroy = false;
        this.time = 0;
        this.pathStart = -1;
    }
    
    animate() {
        if (this.clock < 60/this.imageSpeed) {
            this.clock++;
        }
        else {
            if (this.imageIndex.row >= this.images-1){
                this.imageIndex.row = 0;
            } else {
                this.imageIndex.row++;
            }
            
            this.clock=0;
        }
    }
    
    distance(x1,y1,x2,y2) {
        return sqrt(pow(x2-x1,2) + pow(y2-y1,2));
    }
    
    drawSelf() {
        image(this.img,
              this.position.x-this.imageOrigin.x,
              this.position.y-this.imageOrigin.y,
              this.size.width, this.size.height,
              this.imageIndex.row*this.size.width,
              this.imageIndex.col*this.size.height,
              this.size.width, this.size.height
             );
    }
    
    doPhysics() {
        alert("No Physics...")
    }
    
    followPath(path) {
        let totalTime = 90;
        let totalDist = this.distance(this.position.x,
                                 this.position.y,
                                path[0].x,
                                path[0].y)
        for (let d = 0; d < path.length - 1; d++) {
            totalDist += this.distance(path[d].x,
                                path[d].y,
                                path[d+1].x,
                                path[d+1].y);
        };
        
        let elapsedTime = this.time - this.pathStart;
        let percent = elapsedTime/totalTime;
        let currentDist = percent * totalDist;
        
        //figure out with path index, i, we are in
        let i = -1;
        let d = 0;
        while(d < currentDist && i < path.length) {
            i++;
            
            if (path.length > i + 1) {
                d += this.distance(path[i].x, path[i].y, 
                            path[i+1].x, path[i+1].y);
            } else {
                d = currentDist;
            }
        }
        
        //now we have distance to current node
        let distFromNode = d - currentDist;
        
        if (distFromNode === 0) {
            this.position.x = path[i].x;
            this.position.y = path[i].y;
        } else {
            this.position.x = path[i+1].x - 
                                this.orthoDirection(path[i].x,
                                                   path[i].y,
                                                   path[i+1].x,
                                                   path[i+1].y).x *
                                distFromNode;
            this.position.y = path[i+1].y - 
                                this.orthoDirection(path[i].x,
                                                   path[i].y,
                                                   path[i+1].x,
                                                   path[i+1].y).y *
                                distFromNode;
        }
    }
    
    orthoDirection(x1,y1,x2,y2) {        
        if (x1 === x2) {
            return (y2 > y1) ? {x: 0, y: 1} : {x: 0, y: -1};
        } else if (y1 === y2) {
            return (x2 > x1) ? {x: 1, y: 0} : {x: -1, y: 0};
        } else {
            alert("orthoDirection problem! (" +
                  x1 + " and " + y2 + "; " + y1 + " and " + y2 +")");
            return {x:0, y:0};
        }
    }
    
    setAnimation(on, num, speed) {
        this.animated = on;
        this.images = num;
        this.imageSpeed = speed;
    }
    
    startPath(path) {
        this.pathStart = this.time;
        this.path = path;
    }
    
    Update() {
        this.time++;
        
        if (this.physics) {
            this.doPhysics();
        }
        if (this.animated) {
            this.animate();
        }
        if (this.visible) {
            this.drawSelf();
        }
        if (this.pathStart > -1) {
            this.followPath(this.path);
        }
    }
}