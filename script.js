var sizeX = 120
var sizeY = 120
var world = []
var sizeX2 = 640 / sizeX
var sizeY2 = 640 / sizeY
var tile = 1

var airButton = document.getElementById("air")
airButton.onclick = () => {
	tile = 0
}
var sandButton = document.getElementById("sand")
sandButton.onclick = () => {
	tile = 1
}
var waterButton = document.getElementById("water")
waterButton.onclick = () => {
	tile = 2
}
var metalButton = document.getElementById("metal")
metalButton.onclick = () => {
	tile = 3
}

for (let i = 0; i < sizeX * sizeY; i++) {
	world.push(0)
}

function render() {
	if (keys["KeyA"]) {
		tile = 0
	}
	if (keys["KeyS"]) {
		tile = 1
	}
	if (keys["KeyW"]) {
		tile = 2
	}
	if (keys["KeyD"]) {
		tile = 3
	}

	let gridX = Math.floor((mouse.x-sizeX2/2) / sizeX2)
	let gridY = Math.floor((mouse.y-sizeY2/2) / sizeY2)

	if (mouse.down) {
		world[gridX * sizeY + gridY] = tile
	}

	var setsPos = []
	var setsSet = []

	for (let i = 0; i < world.length; i++) {
		let t = world[i]
		let x = Math.floor(i / sizeY)
		let y = i % sizeY
		if (t == 1 && y < sizeY - 1) {
			if (world[i + 1] == 0 && !setsPos.includes(i + 1)) {
				setsPos.push(i)
				setsSet.push(0)
				setsPos.push(i+1)
				setsSet.push(1)
			}
			if (world[i + 1] == 2 && !setsPos.includes(i + 1)) {
				setsPos.push(i)
				setsSet.push(2)
				setsPos.push(i+1)
				setsSet.push(1)
			}
			if (Math.random() > 0.5 && world[i + sizeY + 1] == 0 && world[i + 1] != 0 && !setsPos.includes(i + 1 + sizeY)) {
				setsPos.push(i)
				setsSet.push(0)
				setsPos.push(i + 1 + sizeY)
				setsSet.push(1)
			}
			if (Math.random() > 0.5 && world[i - sizeY + 1] == 0 && world[i + 1] != 0 && !setsPos.includes(i + 1 - sizeY)) {
				setsPos.push(i)
				setsSet.push(0)
				setsPos.push(i + 1 - sizeY)
				setsSet.push(1)
			}
		}
		if (t == 2 && y < sizeY - 1) {
			if (world[i + 1] == 0 && !setsPos.includes(i + 1)) {
				setsPos.push(i)
				setsSet.push(0)
				setsPos.push(i + 1)
				setsSet.push(2)
			}
			var moved = false
			if (Math.random() > 0.5 && world[i + sizeY + 1] == 0 && world[i + 1] != 0 && !setsPos.includes(i + 1 + sizeY)) {
				setsPos.push(i)
				setsSet.push(0)
				setsPos.push(i + 1 + sizeY)
				setsSet.push(2)
				moved = true
			}
			if (Math.random() > 0.5 && world[i - sizeY + 1] == 0 && world[i + 1] != 0 && !setsPos.includes(i + 1 - sizeY)) {
				setsPos.push(i)
				setsSet.push(0)
				setsPos.push(i + 1 - sizeY)
				setsSet.push(2)
				moved = true
			}
			if (!moved && world[i + 1] != 0) {
				if (Math.random() > 0.5) {
					if (world[i+sizeY] == 0 && !setsPos.includes(i + sizeY)) {
						setsPos.push(i)
						setsSet.push(0)
						setsPos.push(i + sizeY)
						setsSet.push(2)
					}
				} else {
					if (world[i-sizeY] == 0 && !setsPos.includes(i - sizeY)) {
						setsPos.push(i)
						setsSet.push(0)
						setsPos.push(i - sizeY)
						setsSet.push(2)
					}
				}
			}
		}
	}

	for (let i in setsPos) {
		let set = [setsPos[i], setsSet[i]]
		world[set[0]] = set[1]
	}

	var colours = ["white", "yellow", "blue", "gray"]
	
	ctx.fillStyle = "white"
	ctx.fillRect(0, 0, 640, 640)
	ctx.globalAlpha = 1
	for (let x = 0; x < sizeX; x++) {
		for (let y = 0; y < sizeY; y++) {
			ctx.fillStyle = colours[world[x * sizeY + y]]
			ctx.fillRect(x * sizeX2, y * sizeY2, sizeX2, sizeY2)
		}
	}

	ctx.globalAlpha = 0.25
	ctx.fillStyle = colours[tile]
	ctx.fillRect(gridX*sizeX2, gridY*sizeY2, sizeX2, sizeY2)
}

setInterval(render, 1000 / 60)

