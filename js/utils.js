// Custom array function to parse a large array and convert it to a 16x9 2D array.
Array.prototype.parse2D = function() {
    const rows = [];

    for (let i = 0; i < this.length; i += 16) {
        rows.push(this.slice(i, i + 16));
    }
    return rows;
}

/*
 Custom array function to parse a 2D array and create collision objects based on the elements positions.
 Returns an array containing objects that represent the locations of collisions on the map.
 */
Array.prototype.createObjectsFrom2D = function () {
    const objects = [];
    this.forEach((row, yIndex) => {
        row.forEach((symbol, xIndex) => {
            if (symbol === 292) {
                objects.push(new CollisionBlock({
                    position: {
                        x: xIndex * CollisionBlock.width,
                        y: yIndex * CollisionBlock.height
                    }
                }));
            }
        });
    });
    return objects;
}

// This function tracks if the player object collides with a door object.
function doorCollision(door) {
    return (
        player.hitbox.position.x + player.hitbox.width <= door.position.x + door.width &&
        player.hitbox.position.x >= door.position.x &&
        player.hitbox.position.y + player.hitbox.height >= door.position.y &&
        player.hitbox.position.y <= door.position.y + door.height
    )
}


addEventListener('keydown', ({ key }) => {
    if (player.preventInput) return;
    switch (key) {
        case ' ':
            keys.space.pressed = true;
            if (player.velocity.y === 0) player.velocity.y = -20;
            break;
        case 'a':
            keys.a.pressed = true;
            break;
        case 'd':
            keys.d.pressed = true;
            break;
        case 'w':
            for (let i = 0; i < doors.length; i++) {
                const door = doors[i];

                if (doorCollision(door)) {
                    player.velocity.y = 0;
                    player.velocity.x = 0;
                    player.preventInput = true;
                    player.switchSprite('enterDoor');
                    door.play();
                    return;
                }
            }
            break;
    }
});

// Listens for the movement and jump keys to be released.
addEventListener('keyup', ({ key }) => {
    switch (key) {
        case ' ':
            keys.space.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
    }
});

/**
 * This function handles the instantiation and population of a player object.
 * @returns {Player} object containing all initial properties and animations.
 */
function createAndPopulatePlayer() {
    return (
        new Player({
            imageSrc: './img/king/idle.png',
            frameRate:  11,
            animations: {
                idleRight: {
                    frameRate: 11,
                    frameBuffer: 4,
                    loop: true,
                    imageSrc: './img/king/idle.png'
                },
                idleLeft: {
                    frameRate: 11,
                    frameBuffer: 4,
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
                },
                enterDoor: {
                    frameRate: 8,
                    frameBuffer: 4,
                    loop: false,
                    imageSrc: './img/king/enterDoor.png',
                    onComplete: () => {
                        gsap.to(overlay, {
                            opacity: 1,
                            onComplete: () => {
                                level++;

                                if (level === 6) level = 1;
                                levels[level].init();
                                player.switchSprite('idleRight');
                                player.preventInput = false;

                                gsap.to(overlay, {
                                    opacity: 0,
                                    doors: [],
                                })
                            }
                        })
                    }
                }
            }
        })
    )
}
