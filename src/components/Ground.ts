import {Sprite} from 'pixi.js';
import {config} from '../utils';
import {GROUND_OFFSET, SCREEN_HEIGHT, SCREEN_WIDTH} from '../utils/config';

export default class Ground {
  private ground = Sprite.from("images/ground.png")
  private groundScroll = 0;

  constructor() {
    this.ground.x = 0;
    this.ground.y = SCREEN_HEIGHT - GROUND_OFFSET;
  }

  getObject = () => {
    return this.ground;
  }

  update = (dt: number) => {
    // scroll ground by preset speed * dt, looping back to 0 after the screen width passes
    this.groundScroll = (this.groundScroll + config.GROUND_SCROLL_SPEED * dt)
      % SCREEN_WIDTH;

    this.ground.x = -this.groundScroll;  }
}

