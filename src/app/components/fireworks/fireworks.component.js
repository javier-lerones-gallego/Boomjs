import template from './fireworks.html';

window.requestAnimFrame = (() =>
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function timeout(callback) {
        window.setTimeout(callback, 1000 / 60);
    }
)();

class Particle {
    constructor(pos, target, vel, marker, usePhysics) {
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

export default class FireworksController {
    constructor($element, $window, $timeout) {
        this.$element = $element;
        this.$window = $window;
        this.$timeout = $timeout;

        this._visible = false;

        // declare the variables we need
        this.particles = [];
        this.mainCanvas = null;
        this.mainContext = null;
        this.fireworkCanvas = null;
        this.fireworkContext = null;
        this.viewportWidth = 0;
        this.viewportHeight = 0;

        // Store the timeout so we can kill it on destroy
        this._timeout = null;
    }

    $onInit() {
        // Subscribe to the WIN event.
        this.game.subscribe('WIN', () => this.animate());

        // create a canvas for the fireworks
        this.mainCanvas = document.getElementById('fireworks_canvas');
        this.mainContext = this.mainCanvas.getContext('2d');

        // and another one for, like, an off screen buffer
        // because that's rad n all
        this.fireworkCanvas = document.createElement('canvas');
        this.fireworkContext = this.fireworkCanvas.getContext('2d');

        this.bigGlow = document.getElementById('big-glow');
        this.smallGlow = document.getElementById('small-glow');

        // Create the palette
        this.createFireworkPalette(12);

        this.viewportWidth = this.$window.innerWidth;
        this.viewportHeight = this.$window.innerHeight - 60;

        this.mainCanvas.width = this.viewportWidth;
        this.mainCanvas.height = this.viewportHeight;

        // Set it off
        this.update();
    }

    $onDestroy() {
        this.$timeout.cancel(this._timeout);
    }

    delayedParticle() {
        this._timeout = this.$timeout(() => {
            this.createParticle();
            this.delayedParticle();
        }, 750);
    }

    get visible() { return this._visible; }

    animate() {
        this._visible = true;

        this.delayedParticle();
    }

    update() {
        this.clearContext();
        window.requestAnimFrame(() => this.update());
        this.drawFireworks();
    }

    clearContext() {
        this.mainContext.fillStyle = 'rgba(0,0,0,0.2)';
        this.mainContext.fillRect(0, 0, this.viewportWidth, this.viewportHeight);
    }

    createFireworkPalette(gridSize) {
        const size = gridSize * 10;
        this.fireworkCanvas.width = size;
        this.fireworkCanvas.height = size;
        this.fireworkContext.globalCompositeOperation = 'source-over';

        // create 100 blocks which cycle through
        // the rainbow... HSL is teh r0xx0rz
        for (let c = 0; c < 100; c++) {
            const marker = (c * gridSize);
            const gridX = marker % size;
            const gridY = Math.floor(marker / size) * gridSize;

            this.fireworkContext.fillStyle = `hsl(${Math.round(c * 3.6)},100%,10%)`;
            this.fireworkContext.fillRect(gridX, gridY, gridSize, gridSize);
            this.fireworkContext.drawImage(
                this.bigGlow,
                gridX,
                gridY);
        }
    }

    createParticle(pos, target, vel, color, usePhysics) {
        const p = pos || {};
        const t = target || {};
        const v = vel || {};

        this.particles.push(
            new Particle(
                // position
                {
                    x: p.x || this.viewportWidth * 0.5,
                    y: p.y || this.viewportHeight + 10,
                },

                // target
                {
                    y: t.y || 150 + Math.random() * 100,
                },

                // velocity
                {
                    x: v.x || Math.random() * 3 - 1.5,
                    y: v.y || 0,
                },

                color || Math.floor(Math.random() * 100) * 12,

                usePhysics)
        );
    }

    drawFireworks() {
        let a = this.particles.length;

        while (a--) {
            const firework = this.particles[a];

            // if the update comes back as true
            // then our firework should explode
            if (firework.update()) {
                // kill off the firework, replace it
                // with the particles for the exploded version
                this.particles.splice(a, 1);

                // if the firework isn't using physics
                // then we know we can safely(!) explode it... yeah.
                if (!firework.usePhysics) {
                    if (Math.random() < 0.8) {
                        this.star(firework);
                    } else {
                        this.circle(firework);
                    }
                }
            }

            // pass the canvas context and the firework
            // colours to the
            firework.render(this.mainContext, this.fireworkCanvas, this.smallGlow);
        }
    }

    circle(firework) {
        let count = 100;
        const angle = (Math.PI * 2) / count;
        while (count--) {
            const randomVelocity = 4 + Math.random() * 4;
            const particleAngle = count * angle;

            this.createParticle(
                firework.pos,
                null,
                {
                    x: Math.cos(particleAngle) * randomVelocity,
                    y: Math.sin(particleAngle) * randomVelocity,
                },
                firework.color,
                true);
        }
    }

    star(firework) {
        // set up how many points the firework
        // should have as well as the velocity
        // of the exploded particles etc
        const points = 6 + Math.round(Math.random() * 15);
        const jump = 3 + Math.round(Math.random() * 7);
        const subdivisions = 10;
        const radius = 80;
        const randomVelocity = -(Math.random() * 3 - 6);

        let start = 0;
        let end = 0;
        const circle = Math.PI * 2;
        const adjustment = Math.random() * circle;

        do {
            // work out the start, end
            // and change values
            start = end;
            end = (end + jump) % points;

            const sAngle = (start / points) * circle - adjustment;
            const eAngle = ((start + jump) / points) * circle - adjustment;

            const startPos = {
                x: firework.pos.x + Math.cos(sAngle) * radius,
                y: firework.pos.y + Math.sin(sAngle) * radius,
            };

            const endPos = {
                x: firework.pos.x + Math.cos(eAngle) * radius,
                y: firework.pos.y + Math.sin(eAngle) * radius,
            };

            const diffPos = {
                x: endPos.x - startPos.x,
                y: endPos.y - startPos.y,
                a: eAngle - sAngle,
            };

            // now linearly interpolate across
            // the subdivisions to get to a final
            // set of particles
            for (let s = 0; s < subdivisions; s++) {
                const sub = s / subdivisions;
                const subAngle = sAngle + (sub * diffPos.a);

                this.createParticle(
                    {
                        x: startPos.x + (sub * diffPos.x),
                        y: startPos.y + (sub * diffPos.y),
                    },
                    null,
                    {
                        x: Math.cos(subAngle) * randomVelocity,
                        y: Math.sin(subAngle) * randomVelocity,
                    },
                    firework.color,
                    true);
            }

            // loop until we're back at the start
        } while (end !== 0);
    }
}
FireworksController.$inject = ['$element', '$window', '$timeout'];

export const FireworksComponent = {
    name: 'fireworks',
    bindings: {
        game: '<',
    },
    controller: FireworksController,
    template,
};
