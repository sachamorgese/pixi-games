import {Sprite} from 'pixi.js';
import {config} from '../utils';

export default class Background {
  private background = Sprite.from("images/background.png")
  private backgroundScroll = 0;

  getObject = () => {
    return this.background;
  }

  update = (dt: number) => {
    // scroll background by preset speed * dt, looping back to 0 after the looping point
      this.backgroundScroll = (this.backgroundScroll + config.BACKGROUND_SCROLL_SPEED * dt)
      % config.BACKGROUND_LOOPING_POINT

      this.background.x = -this.backgroundScroll;
  }
}

