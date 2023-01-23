let backgroundLevel;
let parsedCollisions;
let collisionBlocks = [];
let doors = [];

let level = 1;
let levels = {
    1: {
        init: () => {
            parsedCollisions = collisionsLevel1.parse2D(); // Parses a big array into a 16x9 2D array.
            collisionBlocks = parsedCollisions.createObjectsFrom2D(); // Creates an object collision map from the created 2D array
            player.collisionBlocks = collisionBlocks;
            player.position.x = 244; // Level 1 x axis spawn coordinate
            player.position.y = 350; // Level 1 y axis spawn coordinate

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
            player.position.x = 96; // Starting x position
            player.position.y = 140; // Start y position

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
            player.position.x = 734; // Starting x position
            player.position.y = 209; // Start y position

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
            player.position.x = 760; // Starting x position
            player.position.y = 313; // Start y position

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
            player.position.x = 266; // Start x position
            player.position.y = 333; // Start y position

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


