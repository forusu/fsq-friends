import { Triangle } from "./canvasShapes.js";
import { mouseX, mouseY} from "./mouseData.js"

function canvasInit() {
    window.requestAnimationFrame(canvasDraw)
}

let triangles = [new Triangle({ _x: mouseX, _y: mouseY, _size: 40, _rotSpeed: 0.2 })]

function canvasDraw(time) {
    let canvas = document.getElementById("background-canvas");
    if (canvas.getContext('2d')) {
        // setup the canvas
        let ctx = canvas.getContext('2d')
        const w = window.innerWidth;
        const h = window.innerHeight;
        ctx.canvas.width = w;
        ctx.canvas.height = h;
        ctx.globalCompositeOperation = 'source-over';
        ctx.clearRect(0, 0, w, h);

        // draw circle at curson
        // ctx.arc(mouseX, mouseY, 10,0,Math.PI*2)
        ctx.fillStyle = "#ff0000";
        ctx.fill();

        triangles.forEach((tri, index, array) => {
            // tri.setCoordinates(mouseX, mouseY)

            if (!tri.draw(ctx, time)){
                array.splice(index, 1)
            }
        })
        triangles.push(new Triangle({_x: mouseX, _y: mouseY, _size:40, _rotSpeed: 0.2}))


    }
    window.requestAnimationFrame(canvasDraw)
}



window.addEventListener("load", canvasInit)
