let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove',(event)=>{
    mouseX = event.clientX;
    mouseY = event.clientY;
})


class Triangle{
    constructor({_x,_y,_size,_angle=0, _rotSpeed=0}){
        this.x = _x
        this.y = _y
        this.size = _size;
        this.angle = _angle;
        this.rotSpeed = _rotSpeed;
        this.previousframe = performance.now()
    }

    draw(ctx, time){
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
    }

    setCoordinates(_x,_y){
        this.x = _x;
        this.y = _y;
    }
}

function handleNavigationClick() {
    let navmenu = document.getElementById("navigation-menu");
    if (navmenu.classList.contains("nav-translated")) {
        navmenu.classList.remove("nav-translated")
    } else {
        navmenu.classList.add("nav-translated");
    }

}

function handleDiscordButtonClick() {
    let dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = "Beetleram#1751";
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    setDiscordToolTip();
}
function setDiscordToolTip() {
    let tooltip = document.getElementById("discord-tooltip");
    tooltip.innerHTML = "Beetleram#1751 Copied!";

}
function resetDiscordToolTip() {
    let tooltip = document.getElementById("discord-tooltip");
    tooltip.innerHTML = "Copy Beetleram#1751";
}



function canvasInit(){
    window.requestAnimationFrame(canvasDraw)
}

let triangles = [new Triangle({_x:100,_y:100, _size:40, _rotSpeed:0.2})]

function canvasDraw(time){
    let canvas= document.getElementById("background-canvas");
    if(canvas.getContext('2d')){
        // setup the canvas
        let ctx = canvas.getContext('2d')
        const w = window.innerWidth;
        const h = window.innerHeight;
        ctx.canvas.width=w;
        ctx.canvas.height=h;
        ctx.globalCompositeOperation = 'source-over';
        ctx.clearRect(0,0,w,h);

        // draw circle at curson
        // ctx.arc(mouseX, mouseY, 10,0,Math.PI*2)
        ctx.fillStyle = "#ff0000";
        ctx.fill();

        triangles.forEach((tri)=>{
            tri.setCoordinates(mouseX, mouseY)
            tri.draw(ctx,time)
        })


    }
    window.requestAnimationFrame(canvasDraw)
}



window.addEventListener("load",canvasInit)
