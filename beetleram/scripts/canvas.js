import { Cursor, Triangle } from "./canvasShapes.js";
import { getRndFloat, getRndInteger } from "./helpers.js"
import { mouseX, mouseY } from "./mouseData.js"

function canvasInit() {
    window.requestAnimationFrame(canvasDraw)
}

let triangles = []
// let cursor = new Triangle({ _x: mouseX, _y: mouseY, _size: 40, _rotSpeed: 0.2, _lifetime: -1, _rotSpeed: 0, _colourH: 0})
let cursor = new Cursor({ _x: mouseX, _y: mouseY, _size: 0.02, _rotSpeed: 0.2, _lifetime: -1, _rotSpeed: 0})

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

        ctx.fillStyle = "#ff0000";
        ctx.fill();


        triangles.forEach((tri, index, array) => {

            if (!tri.draw(ctx, time)) {
                array.splice(index, 1)
            }
        })

        cursor.setCoordinates(mouseX, mouseY)
        cursor.draw(ctx, time)

        triangles.push(new Triangle({
            _x: mouseX + getRndFloat(-10, 10),
            _y: mouseY + getRndFloat(-10, 10),
            _size: getRndInteger(5,10),
            _angle: getRndInteger(0,180),
            _rotSpeed: 0.4,
            _colourH: getRndInteger(0,360),
            _fallSpeed: 10,
            _lifetime: 10
        }))

    }
    window.requestAnimationFrame(canvasDraw)
}



window.addEventListener("load", canvasInit)
