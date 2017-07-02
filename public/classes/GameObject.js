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
    }
    
    Update() {
        if (this.physics) {
            this.doPhysics();
        }
        if (this.animated) {
            this.animate();
        }
        if (this.visible) {
            this.drawSelf();
        }
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
    
    setAnimation(on, num, speed) {
        this.animated = on;
        this.images = num;
        this.imageSpeed = speed;
    }
}