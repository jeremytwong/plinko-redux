function Particle (x, y, r, offset) {
    var options = {
        restitution: 0.3,
        friction: 0,
        frictionStatic: 0,
        frictionAir: 0,
        density: 0.5
    };
    x += random((offset * -1), (offset));
    this.body = Bodies.circle(x, y, r, options)
    this.r = r;
    Composite.add(world, this.body);
}


Particle.prototype.isOffScreen = function() {
    var x = this.body.position.x;
    var y = this.body.position.y;
    return (x < -50 || x > width + 50 || y > height);
}
Particle.prototype.show = function() {
    fill(255);
    stroke(255);
    var pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    ellipse(0, 0, this.r * 2);
    pop();
}