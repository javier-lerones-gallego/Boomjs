import template from './tile.html';

class TileController {
    constructor($element) {
        this.$element = $element;
    }

    get css() {
        if (this.tile.active) {
            return 'btn-primary';
        } else if (this.tile.flagged) {
            return 'btn-warning';
        } else if (this.tile.question) {
            return 'btn-info';
        } else if (this.tile.revealed) {
            return 'btn-default active';
        } else if (this.tile.detonated) {
            return 'btn-danger';
        }

        return 'btn-primary';
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
            } else if (this.tile.active && this.tile.isMine) {
                // Game Over, notify the game
                this.tile.detonate();
                // Tell the board to show all tiles
                this.board.gameOver();
                // Notify the game it has ended
                this.game.gameOver();
            }
        } else if (event.button === 2) {
            // Stop the context menu
            event.preventDefault();

            if (!this.tile.revealed) {
                // if active, switch to flag
                if (this.tile.active) {
                    this.tile.flag();
                    // if the board has all flags in the right place, end the game
                    if (this.board.flagged) {
                        this.game.finish();
                    }
                } else if (this.tile.flagged) {
                    // if flag switch to question
                    this.tile.unknown();
                } else if (this.tile.question) {
                    // if question, switch to active
                    this.tile.activate();
                }
            }
        }
    }

    onDblClick() {
        if (this.tile.revealed) {
            if (this.board.neighbouringFlagCount(this.tile) === this.tile.count) {
                if (this.board.forceRevealNeighbours(this.tile)) {
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
