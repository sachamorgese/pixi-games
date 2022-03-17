import { Container, Ticker } from "pixi.js";
import Bird from '../entities/Bird';
import {config, getRandomIntInclusive} from '../utils';
import PipePair from '../components/PipePair';
import { GAP_HEIGHT, GROUND_OFFSET } from '../utils/config';
import Scene from '../engine/Scene';


export default class PlayScene extends Scene {
  private bird: Bird;
  private spawnTimer: number = 0;
  private pipes: Container;
  private lastY: number = getRandomIntInclusive(0, 80) + 20;
  private scrolling: boolean = true;

  constructor(private screenWidth: number, private screenHeight: number) {
    super();
  }

  init() {
    this.pipes = new Container();
    this.pipes.x = 0;
    this.pipes.y = 0;
    this.pipes.width = this.screenWidth;
    this.pipes.height = this.screenHeight;

    this.container.addChild(this.pipes);

    this.bird = new Bird(this.container);
    this.bird.x = this.screenWidth / 2;
    this.bird.y = this.screenHeight / 2;
  }

   update(dt: number): void {
    if (!this.scrolling) {
      return;
    }

    this.spawnTimer += dt;

    if (this.spawnTimer > config.PIPE_SPAWN_TIME) {
      const y = Math.max(10,
        Math.min(this.lastY + getRandomIntInclusive(-50, 50), this.screenHeight - GROUND_OFFSET - GAP_HEIGHT));
      this.lastY = y;

      this.pipes.addChild(new PipePair(this, { y, screenWidth: this.screenWidth, screenHeight: this.screenHeight }));
      this.spawnTimer = 0;
    }

    this.pipes.children.forEach((pair: PipePair) => {
      pair.update(dt);

      if (this.bird?.collides(pair)) {
        this.scrolling = false;
        Ticker.shared.stop();
      }

      if (pair.dead) {
        this.pipes.removeChild(pair);
      }
    });

    if (this.bird) {
      this.bird.update(dt);

      if (this.bird.y > this.screenHeight - GROUND_OFFSET - this.bird.height / 2) {
        this.scrolling = false;
        Ticker.shared.stop();
        this.bird.kill();
        this.bird = null;
      }
    }
  }
}
