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

        if (this.animations) { // If the object has animations (Player and pig)
            for (let key in this.animations) { // Loop through each of them
                const image = new Image(); // Create an image object
                image.src = this.animations[key].imageSrc; // Set its source property to the src defined for the specified animation.
                this.animations[key].image = image; // Setting the image element to the newly created image object
            }
        }
    }

    draw() {
        if (!this.loaded) return; // If the image hasn't loaded yet, don't compute.
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
                this.currentAnimation.onComplete();
                this.currentAnimation.isActive = true;
            }
        }
    }

    play() {
        this.autoPlay = true;
    }
}

