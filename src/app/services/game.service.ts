import { IGameService } from './igame.service';
import { IGame } from '../models/game.model';

// type
export type GameDifficulty = 'EASY' | 'MEDIUM' | 'EXPERT';

export default class GameService implements IGameService {
    private _games: Array<IGame>;

    constructor(private Game: any) {
        // The collection of games.
        this._games = [];
    }

    /**
     * Gets the public name of the Service.
     */
    static get name() { return 'GameService'; }

    /**
     * Gets the collection of games. ReadOnly.
     */
    get games() { return this._games; }

    /**
     * Creates a game with the specified difficulty.
     *
     * @param {any} difficulty: Possible values are EASY, MEDIUM, and EXPERT.
     * @returns The new Game object.
     */
    private create(difficulty: GameDifficulty) {
        const newGame: IGame = new this.Game();

        if (difficulty === 'EASY') {
            newGame.easy();
        } else if (difficulty === 'MEDIUM') {
            newGame.medium();
        } else if (difficulty === 'EXPERT') {
            newGame.expert();
        }

        // Generate the board
        newGame.generate();

        // Add it to the local collection
        this._games.push(newGame);

        return newGame;
    }

    /**
     * Create an easy game.
     *
     * @returns
     */
    easy(): IGame {
        return this.create('EASY');
    }

    /**
     * Create a medium game.
     *
     * @returns
     */
    medium(): IGame {
        return this.create('MEDIUM');
    }

    /**
     * Create an expert game.
     *
     * @returns
     */
    expert(): IGame {
        return this.create('EXPERT');
    }

    /**
     * Returns a game by id.
     *
     * @param {any} id
     * @returns
     */
    query(id: string): IGame {
        return this._games.filter(g => g.id === id)[0];
    }
}
GameService.$inject = ['Game'];
