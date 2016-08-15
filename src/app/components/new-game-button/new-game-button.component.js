import template from './new-game-button.html';

class NewGameButtonController {
    constructor(GameService, $state, UtilsService) {
        this.GameService = GameService;
        this.$state = $state;
        this.UtilsService = UtilsService;
    }

    $onInit() {
        // Make sure difficulty param is valid.
        if (this.difficulty !== 'EASY' ||
            this.difficulty !== 'MEDIUM' ||
            this.difficulty !== 'EXPERT') {
            this.difficulty = 'EASY';
        }
    }

    get difficultyLabel() { return this.UtilsService.toTitleCase(this.difficulty); }

    get css() {
        switch (this.difficulty) {
            case 'EASY':
                return this.class ? 'btn-success '.concat(this.class) : 'btn-success';
            case 'MEDIUM':
                return this.class ? 'btn-warning '.concat(this.class) : 'btn-warning';
            case 'EXPERT':
                return this.class ? 'btn-danger '.concat(this.class) : 'btn-danger';
            default:
                return this.class ? 'btn-success '.concat(this.class) : 'btn-success';
        }
    }

    get gridSize() {
        if (!this.showSize) {
            return '';
        }

        switch (this.difficulty) {
            case 'EASY':
                return '(9x9)';
            case 'MEDIUM':
                return '(16x16)';
            case 'EXPERT':
                return '(30x16)';
            default:
                return '';
        }
    }

    newGame() {
        switch (this.difficulty) {
            case 'EASY':
                this.easy();
                break;
            case 'MEDIUM':
                this.medium();
                break;
            case 'EXPERT':
                this.expert();
                break;
            default:
                this.easy();
                break;
        }
    }

    easy() {
        this.goToGame(this.GameService.easy());
    }

    medium() {
        this.goToGame(this.GameService.medium());
    }

    expert() {
        this.goToGame(this.GameService.expert());
    }

    goToGame(game) {
        this.$state.go('root.game', { id: game.id });
    }
}
NewGameButtonController.$inject = ['GameService', '$state', 'UtilsService'];

export const NewGameButtonComponent = {
    name: 'newGameButton',
    bindings: {
        showSize: '<',
        difficulty: '@',
        class: '@',
    },
    controller: NewGameButtonController,
    template,
};
