function Peg (x, y, r) {
    var options = {
        restitution: 1,
        friction: 0,
        frictionStatic: 0,
        frictionAir: 0,
        isStatic: true
    };
    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
    Composite.add(world, this.body);
}


Peg.prototype.show = function() {
    fill(127);
    noStroke();
    var pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    ellipse(0, 0, this.r * 2);
    pop();
}

