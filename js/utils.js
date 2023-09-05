function getLocationWithColor(imgData, color) {
    const locs = [];

    for (let i = 0; i < imgData.data.length; i += 4) {
        const pColor = {
            r:imgData.data[i], 
            g:imgData.data[i+1], 
            b:imgData.data[i+2]
        };

        const pIndex = i / 4;

        const loc = {
            x:pIndex % imgData.width, 
            y:Math.floor(pIndex / imgData.width)
        };

        if (colorMath(pColor, color)) {
            locs.push(loc);
        };
    }
    return locs;
}

function colorMath(c1, c2, threshold = 200) {
    return sqDistance(c1, c2) < threshold * threshold;
}

function sqDistance(c1, c2) {
    return (c1.r - c2.r)** 2 +
        (c1.g - c2.g)** 2 +
        (c1.b - c2.b)** 2
}

// function distance(c1, c2) {
//     return Math.sqrt(sqDistance(c1, c2));
// };

function average(locs) {
    const res = {x:0, y:0};
    locs.forEach(loc => {
        res.x += loc.x;
        res.y += loc.y;
    })
    res.x /= locs.length;
    res.y /= locs.length;
    return res;
}

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function euclideanDistance(p1, p2) {
    if (p1.length != p2.length) {
        throw new Error("Error at distance")
    }
    let sqDist = 0;

    for (let i = 0; i < p1.length; i++) {
        sqDist += (p2[i] - p1[i]) ** 2;
    }
    
    return sqDist ** 0.5;
}