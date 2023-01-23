const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

let keys = {
    space: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
}
const overlay = {
    opacity: 0
}

const player = createAndPopulatePlayer();

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    backgroundLevel.draw();

    // collisionBlocks.forEach(collisionBlock => {
    //     collisionBlock.draw();
    // });

    doors.forEach(door => {
        door.draw();
    });

    player.handleInput(keys);
    player.update();

    ctx.save();
    ctx.globalAlpha = overlay.opacity;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

}

levels[level].init(); // Begin computation at level 1.
animate();
