import { ICustomStateService } from './icustomstateservice';

Run.$inject = ['$state', '$transitions', 'GameService'];
export default function Run(
    $state: ICustomStateService,
    $transitions: any,
    GameService: any) {
    // If game is started and we go anywhere, pause the game.
    $transitions.onStart({ from: 'root.game' }, () => {
        const game = GameService.query($state.params.id);
        if (game.isStarted) {
            game.pause();
        }
    });

    // Initially redirect to the home to avoid errors on game states
    $state.go('root.home');
}
