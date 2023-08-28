class Effect {
    constructor(canvas, video) {
        this.canvas = canvas;
        this.video = video;
        this.ctx = canvas.getContext("2d");
        this.#animate();
    }

    #animate() {
        const { ctx, canvas, video } = this;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        requestAnimationFrame(this.#animate.bind(this));
    }
}