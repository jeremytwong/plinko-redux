var Engine = Matter.Engine,
    Bodies = Matter.Bodies,
    Body = Matter.Body
    Composite = Matter.Composite;


var engine;
var world;
var particles = [];
var pegs = [];
var bounds = [];
var cols = 3;
var rows = 5;
var brackets = [];
var pegSize = 20;
var particleSize = 10;
var spawnRate = 50;
var topOffset = 125;
var pegOffset = 100;
var spawnVariance = 5;
var boundaryHeight = 180;


function setup() {
    createCanvas(900, 900);
    engine = Engine.create();
    world = engine.world;
    newParticle();
    createPegs(rows, cols);
    createBoundary(cols);
    
}

function createBoundary(num, boundaryHeight = 180) {
    for (var i = 0; i < bounds.length; i++) {
        Composite.remove(world, bounds[i].body);
    }
    bounds = [];

    // bottom floor
    var b = new Boundary(width/2, height + 30, width, 100);
    bounds.push(b);

    spacing = width / num;
    if (num != 0) {
        for (var i = 0; i <= num; i++) {
            var x = i * spacing;
            var w = 10;
            var y = height - boundaryHeight / 2;
            var b = new Boundary(x, y, w, boundaryHeight);
            bounds.push(b);
        }
    }
}


function createPegs(row, col) {
    for (var i = 0; i < pegs.length; i++) {
        Composite.remove(world, pegs[i].body);
    }
    pegs = [];

    var middle = width / 2;
    
    for (var j = 0; j < row; j++) {
        var y = j * 75 + topOffset;
        let offset = 0;

        // odd number of pegs; middle peg
        if (j % 2 == 0) {
            var p = new Peg(middle, y, pegSize);
            pegs.push(p);
            offset = 0;
        } else {
            offset = pegOffset / 2;
        }

        for (var k = 0; k < Math.floor(col / 2); k++) {
            if (offset == 0) {
                var p = new Peg(middle - (pegOffset * (k + 1)), y, pegSize);
            } else {
                var p = new Peg(middle - offset - (pegOffset * k), y, pegSize);
            }
            pegs.push(p);
        }

        for (var k = 0; k < Math.floor(col / 2); k++) {
            if (offset == 0) {
                var p = new Peg(middle + (pegOffset * (k + 1)), y, pegSize);
            } else {
                var p = new Peg(middle + offset + (pegOffset * k), y, pegSize);
            }
            pegs.push(p);
        }
        col++;
    }
}

function newParticle() {
    var p = new Particle(width / 2, 20, particleSize, spawnVariance);
    particles.push(p);
}

function changeParticleSize(value) {
    particleSize = value;
    document.getElementById("particleSize").innerHTML = "Particle Size: " + particleSize;
}

function changeSpawnRate(value) {
    spawnRate = value;
    document.getElementById("spawnRate").innerHTML = "Spawn Rate: " + spawnRate;
}

function changePegSize(value) {
    let size = 20 * value;
    for (let i = 0; i < pegs.length; i++) {
        pegs[i].r = size;
        Body.scale(pegs[i].body, size /pegs[i].body.circleRadius, size /pegs[i].body.circleRadius);
    } 
    pegSize = 20 * value;
    document.getElementById("pegSize").innerHTML = "Peg Size: " + Math.round(value * 100) + "%";
}

function clearParticles() {
    for (var i = 0; i < particles.length; i++) {
        Composite.remove(world, particles[i].body);
    }
    particles = [];
}

function changeRowsSize(value) {
    rows = value;
    document.getElementById("rowsCount").innerHTML = "Rows: " + rows;
    createPegs(rows, cols);
    
}

function changeColsSize(value) {
    cols = value;
    document.getElementById("colsCount").innerHTML = "Columns: " + cols;
    createPegs(rows, cols);
}

function changeSpawnVariance(value) {
    spawnVariance = value;
    document.getElementById("spawnVarianceNum").innerHTML = "Spawn Variance: " + spawnVariance;
    createPegs(rows, cols);
}

function changeBoundaryNum(value) {
    createBoundary(value, boundaryHeight);
    document.getElementById("boundaryNum").innerHTML = "Collectors: " + value;
}

function changeBoundaryHeight(value) {
    boundaryHeight = value;
    createBoundary(bounds.length - 2, value);
    document.getElementById("boundaryHeight").innerHTML = "Collector Height: " + boundaryHeight;
}


function pauseLoop() {
    noLoop();
}

function continueLoop() {
    loop();
}

function draw () {
    if (frameCount % (101 - spawnRate) == 0) {
        newParticle();
    }

    background(51);
    Engine.update(engine);
    for (var i = 0; i < particles.length; i++) {
        particles[i].show();
        if (particles[i].isOffScreen()) {
            Composite.remove(world, particles[i].body);
            particles.splice(i, 1);
            i--;
        }
    }

    for (var i = 0; i < pegs.length; i++) {
        pegs[i].show();
    }

    for (var i = 0; i < bounds.length; i++) {
        bounds[i].show();
    }
}