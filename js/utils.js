Array.prototype.parse2D = function() {
    const rows = [];

    for (let i = 0; i < this.length; i += 16) {
        rows.push(this.slice(i, i + 16));
    }
    return rows;
}

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
