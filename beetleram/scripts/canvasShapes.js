export class Triangle{
    constructor({_x,_y,_size,_angle=0, _rotSpeed=0, _lifetime=150}){
        this.x = _x
        this.y = _y
        this.size = _size;
        this.angle = _angle;
        this.rotSpeed = _rotSpeed;
        this.previousframe = performance.now()
        this.lifetime = _lifetime;
    }

    draw(ctx, time){
        if(this.lifetime <= 0){
            return false;
        }
        ctx.beginPath()

        ctx.moveTo(
            this.x + this.size*Math.cos((90 +this.angle) * (Math.PI/180)),
            this.y - this.size*Math.sin((90+ this.angle) * (Math.PI/180))
        )

        ctx.lineTo(
            this.x + this.size*Math.cos((210 + this.angle) * (Math.PI/180)),
            this.y - this.size*Math.sin((210 + this.angle) * (Math.PI/180))
        )

        ctx.lineTo(
            this.x + this.size*Math.cos((330 + this.angle) * (Math.PI/180)),
            this.y - this.size*Math.sin((330 + this.angle) * (Math.PI/180))
        )

        ctx.closePath()

        ctx.fillStyle = "#ff0000"
        ctx.fill()
        this.angle = (this.angle+this.rotSpeed*(time-this.previousframe))%360
        this.previousframe = time;
        this.lifetime -=1;
        return true;
    }

    setCoordinates(_x,_y){
        this.x = _x;
        this.y = _y;
    }
}
