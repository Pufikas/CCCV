class Effect {
    constructor(canvas, video) {
        this.canvas = canvas;
        this.video = video;
        this.ctx = canvas.getContext("2d");
        this.particles = [];
        this.prevLoc = { x: 0, y: 0 };
        this.particleCount = 42;
        this.ballSize = 20;
        this.#animate();
        this.#addParticles();
    }

    #addParticles() {
        const moreParticles = document.getElementById("moreParticles");
        moreParticles.addEventListener("click", () => {
        this.particleCount += 0.9;
        this.ballSize += 0.2;
        console.log("clicked")
    });
}

    #animate() {
        const { ctx, canvas, video } = this;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        const locs = getLocationWithColor(imgData, {r:0, g:0, b:255});
       
        const lengthDiv = document.getElementById("lengthDiv");
        const posX = document.getElementById("xPos");
        const posY = document.getElementById("yPos");
        const velocityDiv = document.getElementById("velocity");
        const particleDiv = document.getElementById("particles");
        
    // debug
        // ctx.fillStyle = "yellow";
        // locs.forEach(loc => {
        //     ctx.fillRect(loc.x, loc.y, 1, 1);
        // })

        if (locs.length > 0) {
            const center = average(locs);
            const vel = center.x - this.prevLoc.x;
            this.prevLoc = center;

            
            for (let i = 1; i <= this.particleCount; i++) {
                this.particles.push(new Particle(center));
            }

            ctx.beginPath();
            ctx.fillStyle = `hsla(200, 100%, 50%)`;
            ctx.arc(center.x, center.y, this.ballSize, 0, Math.PI * 2);
            ctx.fill();
    // center
            // ctx.beginPath();
            // ctx.fillStyle = "red";
            // ctx.arc(center.x, center.y, 5, 0, Math.PI * 2);
            // ctx.fill();

            function getLength() {
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
                const center = average(locs);
                posX.innerHTML = `Position x: ${Math.floor(center.x)}`;
                posY.innerHTML = `Position y: ${Math.floor(center.y)}`;
            }

            function velocity() {
                velocityDiv.innerHTML = `Velocity: ${Math.floor(vel)}`
            }

            const currentParticleCount = this.particles.length
            particleDiv.innerHTML = `Particle Count: ${currentParticleCount}`;

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