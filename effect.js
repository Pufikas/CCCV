class Effect {
    constructor(canvas, video) {
        this.canvas = canvas;
        this.video = video;
        this.ctx = canvas.getContext("2d");
        this.particles = [];
        this.#animate();
    }

    #animate() {
        const { ctx, canvas, video } = this;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        const locs = getLocationWithColor(imgData, {r:0, g:0, b:255});
    
        
    // debug
        // ctx.fillStyle = "yellow";
        // locs.forEach(loc => {
        //     ctx.fillRect(loc.x, loc.y, 1, 1);
        // })

        if (locs.length > 0) {
            const center = average(locs);
            for (let i = 1; i <= 42; i++) {
                this.particles.push(new Particle(center));
            }

            ctx.beginPath();
            ctx.fillStyle = `hsla(200, 100%, 50%)`;
            ctx.arc(center.x, center.y, 20, 0, Math.PI * 2);
           
            ctx.fill();
    // center
            // ctx.beginPath();
            // ctx.fillStyle = "red";
            // ctx.arc(center.x, center.y, 5, 0, Math.PI * 2);
            // ctx.fill();
            function getLength() {
                
                const point = [center.x, center.y - 20];
                const distance = euclideanDistance([245, 5], point);
                
                console.log(distance)
                ctx.strokeStyle = "gray";
                //ctx.arc(245, 5, 1, 0, 1); // dot in the middle of screen
        
                ctx.lineWidth = 2;
                ctx.moveTo(246, 5)
                ctx.lineTo(center.x, (center.y - 20))
                ctx.stroke();
            }
            getLength()
        }

        this.particles.forEach(p => {
            p.update(ctx);
        })
    
        while(this.particles.length > 0 && this.particles[0].life <= 0) {
            this.particles.shift();
        }
        requestAnimationFrame(this.#animate.bind(this));
    }
}