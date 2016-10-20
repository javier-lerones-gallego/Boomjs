## Performance Improvements

Expert level performance issues:

On first click this happens:
1. Randomize Board Triggered
2. For each bomb location randomized (99x)
  2.1 Update the tile to be a mine, 99 updates.
  2.2 Get neighbours and +1 the count for each, on average per tile 7.4 neighbours, so 99 x 7.4 = 733 firebase updates.
3. Wait for 450 object change to be detected by Angular.

This takes about 3.5 seconds to complete in my Mac, during which nothing happens visibly and the DOM is blocked. Unacceptable.

### Test 1

Instead of storing tiles as an individual object for each coordinate, store an object with a string array with this format:
```
[
  { x: 0, y: 0, m: 0, c: 0, s: 0 }
]
```

Where:
x and y are the coordinates, int numbers max 2 digits.
m is a 0/1 boolean indicating if the tile is a bomb or not.
c is an integer with the count of bombs around it, only for tiles that are no bomb.
s is the state of the tile, 0: active, 1: flagged, 2: unknown, 3: revealed, 4: detonated

No Bombs:
{"x":99,"y":99,"m":0,"c":9,"s":9} // 34 characters for no bombs
{"x":9,"y":9,"m":0,"c":9,"s":9} // 32 characters for no bombs

72 x 33 = 2232 characters in easy
200 x 33 = 6200 characters in medium
351 x 33 = 15795 characters for no bombs in expert

Bombs:
{"x":99,"y":99,"m":1,"s":9} // 28 characters for bombs
{"x":9,"y":9,"m":1,"s":9} // 26 characters for bombs

9 x 27 = 243 characters for bombs in easy
40 x 27 = 1080 characters for bombs in medium
99 x 27 = 2673 characters for bombs in expert

2232 + 243 = 2475 characters for easy game. 2KB
6200 + 1080 = 7280 characters for medium game. 7KB
15795 + 15795 = 18468 characters for an expert game. 1 byte each character, 18KB data transfer for an expert game.

### Compressing The Board
We can compress each tile object in the board string even more by removing the keys and storing only numbers, for example.

A tile with this format:
{"x":99,"y":99,"m":0,"c":9,"s":9} // the longest one with 34 characters
Can be converted into:
{"99x99":[0,9,9]} // 18 characters

So:

No Bombs:
{"99x99":[0,9,9]} // 18 characters for no bombs
{"9x9":[0,9,9]} // 16 characters for no bombs
17 characters avg.
72 x 17 = 1224
200 x 17 = 3400
351 x 17 = 5967

Bombs:
{"99x99":[1,9]} // 16 characters for bombs
{"9x9":[1,9]} // 14 characters for bombs
15 characters avg.
9 x 15 = 135
40 x 15 = 600
99 x 15 = 1485

easy: 1359 bytes
medium: 4000 bytes
expert: 7452 bytes

### Further more compression

The mine "m" parameter is not necessary, if the tile has one number in the array, m === 1 so it is a bomb, and it indicates the state.
IF the tile array has two numbers then m === 0 and the two numbers are the count of mines around it, and the state.

So:

No Bombs: the key is the coordinates, the value
{"99x99":[99]} // 15 characters for no bombs
{"9x9":[99]} // 13 characters for no bombs
14 characters avg.
72 x 15 = 1080
200 x 15 = 3000
351 x 15 = 5265

Bombs, the key is the coordinates, the value is the state of the tile.
{"99;99":9} // 12 characters for bombs
{"9;9":9} // 10 characters for bombs
11 characters avg.
9 x 11 = 99
40 x 11 = 440
99 x 11 = 1089

easy: 1179 bytes from 2475 initially
medium: 3440 bytes from 7280 initially
expert: 6354 bytes from 18468 initially -65%

### Note on even more compression

I could do this:
{[99,99,9,9]} for no bombs
{[99,99,9]} for bombs
Effectively chopping the size even more, but this way finding the tile by coordinates is very hard in the code.

### Array index conversion to the rescue

Storing the coordinates is kind of stupid when we can just store the state of each tile and calculate the coordinates
based on the index of the array. For example

A 15x30 board can be flattened into a 450 items array as long as we know each row has 30 items.

So instead of an object with a bunch of coordinate keys like "9x14":9, we only store either one number for bombs, and two numbers array for no bombs
```
[[0,1],[0,2],0,0,0] // And so on
```

For expert board, there are 450 indexes with 449 commas in between
449 commas
99 bombs with just one digits
351 no bombs with two digits array [9,9] 5 bytes each
2 brackets around

Total 2305 bytes long string for expert board, over the initial 18468 of a JSON object, -87% in size.












### Math
On a 30x15 board, there are:
450 tiles total
4 tiles with 3 neighbours
82 tiles with 5 neighbours
364 tiles with 8 neighbours
So the average neighbours per tile is:
((4 * 3) + (82 * 5) + (364 * 8)) / 450 = 7.4 neighbours.
