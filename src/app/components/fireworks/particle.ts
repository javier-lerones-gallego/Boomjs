
export class Particle {
    private lastPos: any;
    private alpha: any;
    private gridX: any;
    private gridY: any;
    private GRAVITY: number;
    private easing: any;
    private fade: any;
    private color: any;

    constructor(
        private pos: any,
        private target: any,
        private vel: any,
        private marker: any,
        private usePhysics: any) {
        // properties for animation
        // and colouring
        this.GRAVITY = 0.06;
        this.alpha = 1;
        this.easing = Math.random() * 0.02;
        this.fade = Math.random() * 0.1;
        this.gridX = marker % 120;
        this.gridY = Math.floor(marker / 120) * 12;
        this.color = marker;

        this.pos = {
            x: pos.x || 0,
            y: pos.y || 0,
        };

        this.vel = {
            x: vel.x || 0,
            y: vel.y || 0,
        };

        this.lastPos = {
            x: this.pos.x,
            y: this.pos.y,
        };

        this.target = {
            y: target.y || 0,
        };

        this.usePhysics = usePhysics || false;
    }

    update() {
        this.lastPos.x = this.pos.x;
        this.lastPos.y = this.pos.y;

        if (this.usePhysics) {
            this.vel.y += this.GRAVITY;
            this.pos.y += this.vel.y;

            // since this value will drop below
            // zero we'll occasionally see flicker,
            // ... just like in real life! Woo! xD
            this.alpha -= this.fade;
        } else {
            const distance = (this.target.y - this.pos.y);

            // ease the position
            this.pos.y += distance * (0.03 + this.easing);

            // cap to 1
            this.alpha = Math.min(distance * distance * 0.00005, 1);
        }

        this.pos.x += this.vel.x;

        return (this.alpha < 0.005);
    }

    render(context, fireworkCanvas, smallGlow) {
        const c = context;

        const x = Math.round(this.pos.x);
        const y = Math.round(this.pos.y);
        const xVel = (x - this.lastPos.x) * -5;
        const yVel = (y - this.lastPos.y) * -5;

        c.save();
        c.globalCompositeOperation = 'lighter';
        c.globalAlpha = Math.random() * this.alpha;

        // draw the line from where we were to where
        // we are now
        c.fillStyle = 'rgba(255,255,255,0.75)';
        c.beginPath();
        c.moveTo(this.pos.x, this.pos.y);
        c.lineTo(this.pos.x + 1.5, this.pos.y);
        c.lineTo(this.pos.x + xVel, this.pos.y + yVel);
        c.lineTo(this.pos.x - 1.5, this.pos.y);
        c.closePath();
        c.fill();

        // draw in the images
        c.drawImage(smallGlow, x - 3, y - 3);
        c.drawImage(fireworkCanvas,
            this.gridX, this.gridY, 12, 12,
            x - 6, y - 6, 12, 12);


        c.restore();
    }
}
