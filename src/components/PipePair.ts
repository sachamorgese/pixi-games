import {Container} from 'pixi.js';
import PlayScene from '../scenes/PlayScene';
import Pipe from '../entities/Pipe';
import {GAP_HEIGHT, PIPE_SCROLL_SPEED, PIPE_WIDTH} from '../utils/config';

type Options = {
  y: number;
  screenWidth: number;
  screenHeight: number;
}

type Pipes = {
  'upper': Pipe;
  'lower': Pipe;
}

export default class PipePair extends Container {
  private pipes: Pipes;
  private deadPipes: boolean = false;
  scored: boolean = false;

  constructor(playScene: PlayScene, opts: Options) {
    super();

    this.x = opts.screenWidth + 32;

    this.y = 0;

    this.pipes = {
      'upper': new Pipe(playScene, {
        orientation: -1,
        y: opts.y,
      }),
      'lower': new Pipe(playScene, {
        orientation: 1,
        y: opts.y + GAP_HEIGHT,
      }),
    }

    this.addChild(this.pipes.upper);
    this.addChild(this.pipes.lower);
  }

  get dead() {
    return this.deadPipes;
  }

  update(dt: number) {
    if (this.x < -PIPE_WIDTH * 3) {
      this.deadPipes = true;
    } else {
      this.x -= -dt * PIPE_SCROLL_SPEED;
    }
  }

  getPipe(pipe: 'upper' | 'lower'): Pipe {
    return this.pipes[pipe];
  }
}
