declare function require(module: string): any;

import { Particle } from './particle';

function requestAnimFrame(callback: FrameRequestCallback): any {
    return window.requestAnimationFrame ||
        window['webkitRequestAnimationFrame'] ||
        window['mozRequestAnimationFrame'] ||
        window['oRequestAnimationFrame'] ||
        window['msRequestAnimationFrame'] ||
        function timeout(callback: FrameRequestCallback) {
            window.setTimeout(callback, 1000 / 60);
        };
};

export default class FireworksController {
    private _visible: boolean;

    private particles: Array<any>;
    private mainCanvas: any;
    private mainContext: any;
    private fireworkCanvas: any;
    private fireworkContext: any;
    private viewportWidth: number;
    private viewportHeight: number;

    private _timeout: any;

    private game: any;
    private bigGlow: any;
    private smallGlow: any;

    constructor(
        private $element: any,
        private $window: any,
        private $timeout: any
    ) {
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
        requestAnimFrame(() => this.update());
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

    createParticle(pos?, target?, vel?, color?, usePhysics?) {
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
    template: require('./fireworks.html'),
};
