class Particle {
    constructor(location) {
        this.x = location.x;
        this.y = location.y;
        const angle = Math.random() * Math.PI * 2;
        const speed = lerp(2, 2, Math.random());
        this.velocity = {
            x:Math.cos(angle) * speed,
            y:Math.sin(angle) * speed
        }
        this.life = 1;
        this.hue = lerp(220, 100, 50);
        this.#move();
        this.#move();
    }

    #move() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.life -= 0.12;
    }

    update(ctx) {
        const oldLoc = {x:this.x, y:this.y};
        this.#move();

        ctx.beginPath();
        ctx.strokeStyle = `hsla(200, 100%, 50%, ${this.life * 0.10})`;
        ctx.lineWidth = 10;
        ctx.arc(oldLoc.x, (oldLoc.y + 2), 18, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(200, 100%, 50%, 0.01)`
        ctx.fill();
        ctx.stroke();
    }
}