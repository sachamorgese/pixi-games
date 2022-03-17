import {Sprite, Texture} from 'pixi.js';
import {PIPE_HEIGHT, PIPE_WIDTH} from '../utils/config';
import PlayScene from '../scenes/PlayScene';

type Options = {
  y: number;
  orientation: 1 | -1;
}

export default class Pipe extends Sprite {
  constructor(private scene: PlayScene, private opts: Options) {
    super();

    this.texture = Texture.from("images/pipe.png");
    this.x = 0;
    this.y = opts.y;
    this.height = PIPE_HEIGHT;
    this.width = PIPE_WIDTH
    this.scale.set(1, opts.orientation)
  }
}
