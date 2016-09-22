
export type ACTION_TYPE = 'left' | 'right' | 'double';

export interface Action {
  type: ACTION_TYPE;
  x: number;
  y: number;
  timestamp: number;
}
