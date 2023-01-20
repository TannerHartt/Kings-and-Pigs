class Sprite {
    constructor({
            position,
            imageSrc,
            frameRate = 1,
            animations,
            frameBuffer = 2,
            loop = true,
            autoPlay = true
        }) {
        this.position = position;
        this.image = new Image();
        this.image.onload = () => {
            this.loaded = true;
            this.width = this.image.width / this.frameRate;
            this.height = this.image.height;
        }
        this.image.src = imageSrc;
        this.loaded = false;
        this.frameRate = frameRate
        this.currentFrame = 0;
        this.elapsedFrames = 0;
        this.frameBuffer = frameBuffer;
        this.animations = animations;
        this.loop = loop;
        this.autoPlay = autoPlay;
        this.currentAnimation = undefined;

        if (this.animations) {
            for (let key in this.animations) {
                const image = new Image();
                image.src = this.animations[key].imageSrc;
                this.animations[key].image = image;
            }
        }
    }

    draw() {
        if (!this.loaded) return;
        const cropBox = {
            position: {
                x: this.width * this.currentFrame,
                y: 0
            },
            width: this.width,
            height: this.height
        }

        ctx.drawImage(
            this.image,
            cropBox.position.x,
            cropBox.position.y,
            cropBox.width,
            cropBox.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );

        this.updateFrames();
    }

    updateFrames() {
        if (!this.autoPlay) return;
        this.elapsedFrames++;

        if (this.elapsedFrames % this.frameBuffer === 0) {
            if (this.currentFrame < this.frameRate - 1) {
                this.currentFrame++;
            } else if (this.loop) {
                this.currentFrame = 0;
            }
        }

        if (this.currentAnimation?.onComplete) {
            if (this.currentFrame === this.frameRate - 1 && !this.currentAnimation.isActive) {
                this.currentAnimation.onComplete()
                this.currentAnimation.isActive = true;
            }
        }
    }

    play() {
        this.autoPlay = true;
    }
}

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


class CollisionBlock {
    static width = 64;
    static height = 64;
    constructor({ position }) {
        this.position = position;
        this.width = 64;
        this.height = 64;
    }

    draw() {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
