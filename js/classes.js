class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 100;
        this.height = 100;
        this.sides = {
            bottom: this.position.y + this.height,
        }
        this.gravity = 1;
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();

        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        this.sides.bottom = this.position.y + this.height;

        if (this.sides.bottom + this.velocity.y < canvas.height) {
            this.velocity.y += this.gravity;
        } else {
            this.velocity.y = 0;
        }
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
