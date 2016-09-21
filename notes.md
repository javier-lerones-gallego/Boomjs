# Performance Improvements

Instead of storing all the tiles, each game should only store the bomb locations, the board is generated dynamically depending on the dimensions of the game board.
We also need to store the locations for flags and question marks on the board.

## History

Also instead of storing the state of each tile, we store the click events on each coordinates, the spreading algorithm should work identically if it is the same game.
Doing this we also get the cool side effect of being able to replay a game step by step.

## Tile Click

## Tile Right Click

## Tile Double Click

## Data Tree

```json

{
  "games": {
    "game1": {
      "rows": 9,
      "columns": 10,
      "count": 10,
      "created": 123456789
    }
  },
  "bombs": {
    "game1": {
      "b1": { "x": 1, "y": 5 }, // count number of bombs here
      "b10": { "x": 8, "y": 4 }
    }
  },
  "actions": {
    "game1": {
      "a1": {
        "type": "left" | "right" | "double",
        "x": 2,
        "y": 3,
        "timestamp": 123456789
      }
    }
  }
}
```
