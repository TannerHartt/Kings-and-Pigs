class Player extends Sprite {
    static collisionBuffer = 0.1;
    constructor({ collisionBlocks = [], imageSrc, frameRate, animations, loop }) {
        super({ imageSrc, frameRate, animations, loop });
        this.position = {
            x: 200,
            y: 200
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.gravity = 1;
        this.collisionBlocks = collisionBlocks;
    }


    update() {
        this.draw();

        this.position.x += this.velocity.x;

        this.updateHitBox();
        this.checkForHorizontalCollisions();
        this.applyGravity();
        this.updateHitBox();
        this.checkForVerticalCollisions();

    }

    switchSprite(name) {
        if (this.image === this.animations[name].image) return;

        this.currentFrame = 0;
        this.image = this.animations[name].image;
        this.frameRate = this.animations[name].frameRate;
        this.frameBuffer = this.animations[name].frameBuffer;
        this.loop = this.animations[name].loop;
        this.currentAnimation = this.animations[name];
    }

    checkForHorizontalCollisions() {
        // check horizontal collisions
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];

            // if a collision exists
            if (this.collisionOccurred(collisionBlock)) {

                // Collision on x-axis going to the left
                if (this.velocity.x < 0) {
                    const offset = this.hitbox.position.x - this.position.x;
                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + Player.collisionBuffer
                    break;
                }
                if (this.velocity.x > 0) {
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width;
                    this.position.x = collisionBlock.position.x - offset - Player.collisionBuffer
                    break;
                }
            }
        }
    }

    checkForVerticalCollisions() {
        // check for vertical collisions
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];

            // if a collision exists
            if (this.collisionOccurred(collisionBlock)) {

                // Collision on y-axis
                if (this.velocity.y < 0) {
                    this.velocity.y = 0;
                    const offset = this.hitbox.position.y - this.position.y;
                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + Player.collisionBuffer;
                    break;
                }
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;
                    this.position.y = collisionBlock.position.y - offset - Player.collisionBuffer;
                    break;
                }
            }
        }
    }

    applyGravity() {
        // Apply gravity
        this.velocity.y += this.gravity;
        this.position.y += this.velocity.y;
    }

    collisionOccurred(collisionObject) {
        return (this.hitbox.position.x <= collisionObject.position.x + collisionObject.width &&
            this.hitbox.position.x + this.hitbox.width >= collisionObject.position.x &&
            this.hitbox.position.y + this.hitbox.height >= collisionObject.position.y &&
            this.hitbox.position.y <= collisionObject.position.y + collisionObject.height
        )
    }

    updateHitBox() {
        this.hitbox = {
            position: {
                x: this.position.x + 62,
                y: this.position.y + 34
            },
            width: 50,
            height: 53
        }
    }

    handleInput(keys) {
        if (this.preventInput) return;

        this.velocity.x = 0;
        if (keys.d.pressed) {
            this.switchSprite('runRight');
            this.velocity.x = 5;
            this.lastDirection = 'right';
        }
        else if (keys.a.pressed) {
            this.switchSprite('runLeft');
            this.velocity.x = -5;
            this.lastDirection = 'left';
        }
        else {
            if (this.lastDirection === 'left') this.switchSprite('idleLeft');
            else this.switchSprite('idleRight');

            this.velocity.x = 0;
        }
    }
}

