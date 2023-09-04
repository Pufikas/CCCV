class Effect {
    constructor(canvas, video) {
        this.canvas = canvas;
        this.video = video;
        this.ctx = canvas.getContext("2d");
        this.particles = [];
        this.prevLoc = { x: 0, y: 0 };
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
            const vel = center.x - this.prevLoc.x;
            this.prevLoc = center;

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
                const lengthDiv = document.getElementById("lengthDiv");
                const distance = Math.sqrt(245 * 245 + 5 * 5);
                let centimeters = distance / (96 / 2.54)
                lengthDiv.innerHTML = "Length" + "\n" + Math.floor(centimeters) + "cm" + "/" + Math.floor(distance) + "px";
                //console.log(distance)
                ctx.strokeStyle = "gray";
                ctx.lineWidth = 2;
                ctx.moveTo(246, 5)
                ctx.lineTo(center.x, (center.y - 20))
                ctx.stroke();
            }

            function centerDot() {
                const posX = document.getElementById("xPos");
                const posY = document.getElementById("yPos");
                const center = average(locs);
                posX.innerHTML = `Position x: ${center.x}`;
                posY.innerHTML = `Position y: ${center.y}`;
            }

            function velocity() {
                const velocityDiv = document.getElementById("velocity");
                

                velocityDiv.innerHTML = `Velocity: ${vel}`
            }

            velocity();
            centerDot();
            getLength();
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