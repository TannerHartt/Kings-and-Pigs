const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const parsedCollisions = collisionsLevel1.parse2D();

const collisionBlocks = parsedCollisions.createObjectsFrom2D()


const player = new Player({
    collisionBlocks,
    imageSrc: './img/king/idle.png',
    frameRate:  11,
    animations: {
        idleRight: {
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            imageSrc: './img/king/idle.png'
        },
        idleLeft: {
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            imageSrc: './img/king/idleLeft.png'

        },
        runRight: {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: './img/king/runRight.png'
        },
        runLeft: {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: './img/king/runLeft.png'
        }
    }
});

const doors = [
    new Sprite({
        position: {
            x: 757,
            y: 273
        },
        imageSrc: './img/doorOpen.png',
        frameRate: 5,
        frameBuffer: 8,
        loop: false,
        autoPlay: false
    })
]
const backgroundLevel1 = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/backgroundLevel1.png'
});
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

function init() {

}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    backgroundLevel1.draw();

    collisionBlocks.forEach(collisionBlock => {
        collisionBlock.draw();
    });

    doors.forEach(door => {
        door.draw();
    });

    player.velocity.x = 0;

    if (keys.d.pressed) {
        player.switchSprite('runRight');
        player.velocity.x = 5;
        player.lastDirection = 'right';
    }
    else if (keys.a.pressed) {
        player.switchSprite('runLeft');
        player.velocity.x = -5;
        player.lastDirection = 'left';
    }
    else {
        if (player.lastDirection === 'left') player.switchSprite('idleLeft');
        else player.switchSprite('idleRight');

        player.velocity.x = 0;
    }

    player.update();

}

init();
animate();
