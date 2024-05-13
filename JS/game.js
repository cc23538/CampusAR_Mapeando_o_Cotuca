const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const canvasWidth = window.innerWidth
const canvasHeight = innerHeight

canvas.width = canvasWidth
canvas.height = canvasHeight

const desiredFPS = 120
const frameTime = 1000 / desiredFPS

let prevTime = performance.now()
let lag = 0

animate()

function animate(){
    const currentTime = performance.now()
    const elapsed = currentTime - prevTime
    prevTime = currentTime
    lag += elapsed

    handleControls()

    while(lag >= frameTime){
        ctx.fillStyle = "black"
        ctx.fillRect(0,0, canvasWidth, canvasHeight)
    
        background.update()
        player.update()

        lag -= frameTime
    }

    window.requestAnimationFrame(animate)
}