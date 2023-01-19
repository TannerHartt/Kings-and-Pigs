class Player {
    static collisionBuffer = 0.1;
    constructor({ collisionBlocks = []}) {
        this.position = {
            x: 200,
            y: 200
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 25;
        this.height = 25;
        this.sides = {
            bottom: this.position.y + this.height,
        }
        this.gravity = 1;
        this.collisionBlocks = collisionBlocks;
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();

        this.position.x += this.velocity.x;

        this.checkForHorizontalCollisions();

        this.applyGravity();

        this.checkForVerticalCollisions();

    }

    checkForHorizontalCollisions() {
        // check horizontal collisions
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];

            // if a collision exists
            if (this.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.position.x + this.width >= collisionBlock.position.x &&
                this.position.y + this.height >= collisionBlock.position.y &&
                this.position.y <= collisionBlock.position.y + collisionBlock.height
            ) {
                // Collision on x-axis going to the left
                if (this.velocity.x < 0) {
                    this.position.x = collisionBlock.position.x + collisionBlock.width + Player.collisionBuffer
                    break;
                }
                if (this.velocity.x > 0) {
                    this.position.x = collisionBlock.position.x - this.width - Player.collisionBuffer
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
            if (this.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.position.x + this.width >= collisionBlock.position.x &&
                this.position.y + this.height >= collisionBlock.position.y &&
                this.position.y <= collisionBlock.position.y + collisionBlock.height
            ) {
                // Collision on y-axis
                if (this.velocity.y < 0) {
                    this.velocity.y = 0;
                    this.position.y = collisionBlock.position.y + collisionBlock.height + Player.collisionBuffer
                    break;
                }
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    this.position.y = collisionBlock.position.y - this.height - Player.collisionBuffer
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
}

class Sprite {
    constructor({ position, imageSrc }) {
        this.position = position;
        this.image = new Image();
        this.image.onload = () => {
            this.loaded = true;
        }
        this.image.src = imageSrc;
        this.loaded = false;
    }

    draw() {
        if (!this.loaded) return;
        ctx.drawImage(this.image, this.position.x, this.position.y);
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
