import template from './tile.html';

class TileController {
    constructor($element) {
        this.$element = $element;
    }

    get css() {
        if (this.tile.active) {
            return 'md-raised md-primary';
        } else if (this.tile.flagged) {
            return 'md-raised md-warn';
        } else if (this.tile.question) {
            return 'md-raised md-primary';
        } else if (this.tile.revealed) {
            return 'md-default active';
        } else if (this.tile.detonated) {
            return 'md-raised md-warn';
        }

        return 'md-primary';
    }

    onMouseDown(event) {
        if (event.button === 1) {
            // Cancel the scrolling for the middle button
            return false;
        }
        return true;
    }

    onMouseUp(event) {
        if (event.button === 0) {
            this.onLeftMouse();
        } else if (event.button === 2) {
            this.onRightMouse();
        }
    }

    onLeftMouse() {
        // If it is the first tile revealed, randomize the mines first
        if (this.board.first) {
            // Safe first click
            this.board.generate(this.tile);
            // Start the timer
            this.game.start();
        }

        // Proceed after checking if it is the first click
        if (this.tile.active && !this.tile.isMine) {
            // if not a bomb, reveal it
            this.tile.reveal();
            // notify the board a tile has been revealed
            this.board.reveal(this.tile);
            // if the board is completed, end the game
            if (this.board.completed) {
                this.game.finish();
            }
        }

        if (this.tile.active && this.tile.isMine) {
            // Game Over, notify the game
            this.tile.detonate();
            // Tell the board to show all tiles
            this.board.gameOver();
            // Notify the game it has ended
            this.game.gameOver();
        }
    }

    onRightMouse() {
        if (!this.tile.revealed) {
            // Switch the state of the tile, active, flagged, question mark
            this.tile.toggle();

            // if the board has all flags in the right place, end the game
            if (this.tile.flagged && this.board.completed) {
                this.game.finish();
            }
        }
    }

    onDblClick() {
        if (this.tile.revealed) {
            if (this.board.neighbouringFlagCount(this.tile) === this.tile.count) {
                if (this.board.forceRevealNeighbours(this.tile)) {
                    // If there was a bomb revealed, game over
                    this.game.gameOver();
                } else {
                    // If no boom, check for game finish
                    if (this.board.completed) {
                        this.game.finish();
                    }
                }
            }
        }
    }
}
TileController.$inject = ['$element'];

export const TileComponent = {
    name: 'tile',
    bindings: {
        board: '<',
        tile: '<',
        game: '<',
    },
    controller: TileController,
    template,
};
