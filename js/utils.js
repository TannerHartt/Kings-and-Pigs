addEventListener('keydown', ({ key }) => {
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
