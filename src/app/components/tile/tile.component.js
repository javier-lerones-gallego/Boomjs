import template from './tile.html';

/* ngInject */
class TileController {
    constructor($element) {
        this.$element = $element;
    }

    get css() {
        if (this.game.debug) {
            if (this.tile.highlight) {
                return 'btn-debug btn-default';
            }
            return this.tile.isMine ? 'btn-debug btn-danger' : 'btn-debug btn-primary';
        }

        if (this.tile.active) {
            return 'btn-primary';
        } else if (this.tile.flagged) {
            return 'btn-warning';
        } else if (this.tile.question) {
            return 'btn-info';
        } else if (this.tile.revealed) {
            return 'btn-default active';
        } else if (this.tile.detonated) {
            return 'btn-danger disabled';
        }

        return 'btn-primary';
    }

    onMouseDown(event) {
        if (event.button === 1) {
            // Cancel the scrolling for the middle button
            return false;
        } else if (event.button === 2 && this.tile.revealed && this.tile.count > 0) {
            // If the square is revealed highlight the neighbours on mousedown
            // TODO: Right mouse highlight neighbours

            return true;
        }
        return true;
    }

    onMouseUp(event) {
        if (event.button === 0) {
            if (this.tile.active && !this.tile.isMine) {
                // if not a bomb, reveal it and trigger the neighbour reveal
                this.tile.reveal();
            } else if (this.tile.active && this.tile.isMine) {
                // Game Over, notify the board
                this.tile.detonate();
            }
        } else if (event.button === 2) {
            // Stop the context menu
            event.preventDefault();

            if (!this.tile.revealed) {
                // if active, switch to flag
                if (this.tile.active) {
                    this.tile.flag();
                } else if (this.tile.flagged) {
                    // if flag switch to question
                    this.tile.unknown();
                } else if (this.tile.question) {
                    // if question, switch to active
                    this.tile.activate();
                }
            } else if (this.tile.count > 0) {
                // highlight the neighbours
            }
        }

        // Trigger the clicked event, only used to start the timer

        // Remove the focus to avoid the shadowed blue that stays after clicking
        this.$element[0].blur();
    }

    onDblClick() {
        if (this.tile.revealed && !this.tile.isMine && this.tile.hasMineAround) {
            // Will trigger a special reveal in all neighbours
            // if there is the same amount of flags in them as
            // the number of mines around it.
            // If a neighbour with a mine wasn't covered with
            // a flag is revealed, it will detonate the mine
            if (this.tile.neighbouringFlagCount === this.tile.count) {
                // pubsubService.publish('square.neighbours.click', { id: self.id });
            }
        }
    }

    highlightNeighbours() {
        this.board.highlightNeighbours(this.tile);
    }
}

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
