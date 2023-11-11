
var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")

var keys = {}
var mouse = {x: 0, y: 0, down: false}

canvas.addEventListener("mousedown", () => {
	mouse.down = true
})

canvas.addEventListener("mouseup", () => {
	mouse.down = false
})

addEventListener("keydown", (event) => {
	keys[event.code] = true
})

canvas.addEventListener("mousemove", (event) => {
	mouse.x = event.clientX
	mouse.y = event.clientY
})

addEventListener("keyup", (event) => {
	delete keys[event.code]
})