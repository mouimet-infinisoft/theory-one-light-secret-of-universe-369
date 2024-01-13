const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let triangle = {
    vertices: [{ x: 100, y: 100 }, { x: 150, y: 50 }, { x: 200, y: 100 }],
    targets: [{ x: 200, y: 100 }, { x: 100, y: 100 }, { x: 150, y: 50 }],
    movingTowards: [true, true, true],
    forceFactor: 0.02
};

function moveVertex(vertex, target, movingTowards, forceFactor) {
    if (movingTowards) {
        vertex.x += (target.x - vertex.x) * forceFactor;
        vertex.y += (target.y - vertex.y) * forceFactor;

        // Check if the vertex has passed the target
        if ((forceFactor > 0 && vertex.x >= target.x && vertex.y >= target.y) ||
            (forceFactor < 0 && vertex.x <= target.x && vertex.y <= target.y)) {
            return false; // Start moving back
        }
    } else {
        vertex.x -= (target.x - vertex.x) * forceFactor;
        vertex.y -= (target.y - vertex.y) * forceFactor;

        // Check if the vertex has returned to original position
        if ((forceFactor > 0 && vertex.x <= target.x && vertex.y <= target.y) ||
            (forceFactor < 0 && vertex.x >= target.x && vertex.y >= target.y)) {
            return true; // Start moving towards again
        }
    }
    return movingTowards;
}

function applyForces(triangle) {
    triangle.vertices.forEach((vertex, i) => {
        triangle.movingTowards[i] = moveVertex(vertex, triangle.targets[i], triangle.movingTowards[i], triangle.forceFactor);
    });
}

function drawTriangle(triangle) {
    ctx.beginPath();
    ctx.moveTo(triangle.vertices[0].x, triangle.vertices[0].y);
    for (let i = 1; i < triangle.vertices.length; i++) {
        ctx.lineTo(triangle.vertices[i].x, triangle.vertices[i].y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    applyForces(triangle);
    drawTriangle(triangle);
    requestAnimationFrame(animate);
}

animate();
