
export type GAME_BOARD = Array<number | Array<number>>;

export interface Board {
  tiles: string;
  width: number;
}

/*
// board: [[0,1],[0,2],0,0,0]

For Example an easy board initially:

An array with 81 [0,0] items, each representing the count of bombs around it, and the state of the tile itself.
[[0,0],[0,0],[0,0], ... ,[0,0]]

After randomizing the bombs, the 10 spots where a bomb is placed will be turned into a single 0, which represents the
state of the bomb tile itself.
*/
