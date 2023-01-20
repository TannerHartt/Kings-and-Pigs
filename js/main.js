const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const player = createAndPopulatePlayer();

let backgroundLevel;
let parsedCollisions;
let collisionBlocks;
let doors = [];

let level = 1;
let levels = {
    1: {
        init: () => {
            parsedCollisions = collisionsLevel1.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            player.position.x = 244;
            player.position.y = 350;

            if (player.currentAnimation) {
                player.currentAnimation.isActive = false;
            }
            backgroundLevel = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/backgroundLevel1.png'
            });
            doors = [
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
            ];
        }
    },

    2: {
        init: () => {
            parsedCollisions = collisionsLevel2.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            player.position.x = 96;
            player.position.y = 140;

            if (player.currentAnimation) {
                player.currentAnimation.isActive = false;
            }

            backgroundLevel = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/backgroundLevel2.png'
            });
            doors = [
                new Sprite({
                    position: {
                        x: 772.00,
                        y: 336
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 8,
                    loop: false,
                    autoPlay: false
                })
            ];
        }
    },

    3: {
        init: () => {
            parsedCollisions = collisionsLevel3.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            player.position.x = 734;
            player.position.y = 209;

            if (player.currentAnimation) {
                player.currentAnimation.isActive = false;
            }
            backgroundLevel = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/backgroundLevel3.png'
            });
            doors = [
                new Sprite({
                    position: {
                        x: 175,
                        y: 333
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 8,
                    loop: false,
                    autoPlay: false
                })
            ];
        }
    },

    4: {
        init: () => {
            parsedCollisions = collisionsLevel4.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            player.position.x = 760;
            player.position.y = 313;

            if (player.currentAnimation) {
                player.currentAnimation.isActive = false;
            }
            backgroundLevel = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/backgroundLevel4.png'
            });
            doors = [
                new Sprite({
                    position: {
                        x: 79,
                        y: 272
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 8,
                    loop: false,
                    autoPlay: false
                })
            ];
        }
    },

    5: {
        init: () => {
            parsedCollisions = collisionsLevel5.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            player.position.x = 266;
            player.position.y = 333;

            if (player.currentAnimation) {
                player.currentAnimation.isActive = false;
            }
            backgroundLevel = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/backgroundLevel5.png'
            });
            doors = [
                new Sprite({
                    position: {
                        x: 654,
                        y: 274
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 8,
                    loop: false,
                    autoPlay: false
                })
            ];
        }
    },

}


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

levels[level].init();
animate();
