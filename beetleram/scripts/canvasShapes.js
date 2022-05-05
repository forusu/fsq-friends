class Renderable{
    constructor({_x,_y,_size,_angle=0, _rotSpeed=0, _lifetime=150, _fallSpeed=0}){
        this.x = _x
        this.y = _y
        this.size = _size;
        this.angle = _angle;
        this.rotSpeed = _rotSpeed;
        this.previousframe = performance.now()
        this.lifetime = _lifetime;
        this.fallSpeed = _fallSpeed;
    }

    draw(ctx, time){

        if(this.lifetime == 0){
            return false;
        }
        this.renderer.draw(ctx, this.x, this.y, this.size, this.angle);

        this.angle = (this.angle+this.rotSpeed*(time-this.previousframe))%360
        this.previousframe = time;
        this.lifetime -=1;
        this.y += this.fallSpeed;
        return true;
    }

    setCoordinates(_x,_y){
        this.x = _x;
        this.y = _y;
    }

}

class TriangleRenderer{
    constructor(_colourH){
        this.colourH = _colourH;
    }

    draw(ctx, x,  y, size, angle){
        ctx.beginPath()

        ctx.moveTo(
            x + size*Math.cos((90 +angle) * (Math.PI/180)),
            y - size*Math.sin((90+ angle) * (Math.PI/180))
        )

        ctx.lineTo(
            x + size*Math.cos((210 + angle) * (Math.PI/180)),
            y - size*Math.sin((210 + angle) * (Math.PI/180))
        )

        ctx.lineTo(
            x + size*Math.cos((330 + angle) * (Math.PI/180)),
            y - size*Math.sin((330 + angle) * (Math.PI/180))
        )

        ctx.fillStyle = `hsl(${this.colourH},100%,50%)`
        ctx.fill()

        ctx.closePath()

    }

}

class ImageRenderer{
    constructor(_image){
        this.image = _image;
    }

    draw(ctx, x,  y, size, angle){
        let imageWidth = this.image.width * size
        let imageHeight =this.image.height * size
        ctx.drawImage(this.image, x-imageWidth/2, y-imageHeight/2, imageWidth, imageHeight)
    }

}


export class Triangle extends Renderable{
    constructor(params){
        super(params)
        this.renderer = new TriangleRenderer(params._colourH | 0)
    }

}

export class Cursor extends Renderable{
    constructor(params){
        super(params)
        let image = new Image()
        image.src="assets/minecraft-logo.png"
        this.renderer = new ImageRenderer(image)
    }
}
