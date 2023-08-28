let canvas, ctx, video;
const color = [0, 0, 255];
const threshold = 50;

window.onload = function() {
    load();
};

function load() {
    canvas = document.getElementById("mainCanvas");
    ctx = canvas.getContext("2d");
    video = document.createElement("video");
    video.src = "footage.mp4";
    video.addEventListener("loadedmetadata", function() {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        video.play();
        requestAnimationFrame(effect);
    });
}

function effect() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const locs = [];
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i+1];
        const b = data[i+2];

        if (distance([r,g,b], color) < threshold) {
            const x = (i / 4) % canvas.width;
            const y = Math.floor(i / 4 / canvas.width);
            locs.push({x, y});   
        }
    }

    for (let i = 0; i < locs.length; i++) {
        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.arc(locs[i].x, locs[i].y, 1, 0, Math.PI * 2);
        ctx.fill();
    }
    console.log("Blue", locs.length);
    requestAnimationFrame(effect);
}

function distance(v1, v2) {
    return Math.sqrt(
        (v1[0] - v2[0]) ** 2 +
        (v1[1] - v2[1]) ** 2 +
        (v1[2] - v2[2]) ** 2
    );
};
