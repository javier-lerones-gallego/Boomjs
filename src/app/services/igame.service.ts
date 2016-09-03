import { IGame } from '../models/game.model';

export interface IGameService {
    games: Array<IGame>;

    easy(): IGame;
    medium(): IGame;
    expert(): IGame;

    query(id: string): IGame;
}
