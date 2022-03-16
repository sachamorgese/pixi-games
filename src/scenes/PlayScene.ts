import { Container, Sprite, Ticker } from "pixi.js";
import Bird from '../entities/Bird';
import loader from '../utils/loader';
import Keyboard from "../controls/Keyboard";
import {config, getRandomIntInclusive} from '../utils';
import PipePair from '../components/PipePair';
import {GAP_HEIGHT, GROUND_OFFSET} from '../utils/config';

Keyboard.initialize();

export default class PlayScene extends Container {
  private background: Sprite;
  private ground: Sprite;
  private backgroundScroll: number = 0;
  private groundScroll: number = 0;
  private bird: Bird;
  private spawnTimer: number =0;
  private pipes: Container;
  private lastY: number = getRandomIntInclusive(0, 80) + 20;
  private scrolling: boolean = true;

  constructor(private screenWidth: number, private screenHeight: number) {
    super();

    loader
      .add("images/background.png")
      .add("images/ground.png")
      .load(this.init.bind(this));
  }

  private init() {
    this.background = Sprite.from("images/background.png");
    this.pipes = new Container();
    this.ground = Sprite.from("images/ground.png");
    this.ground.x = 0;
    this.ground.y = this.screenHeight - GROUND_OFFSET;

    this.addChild(this.background);
    this.addChild(this.pipes);
    this.addChild(this.ground);

    this.bird = new Bird(this);
    this.bird.x = this.screenWidth / 2;
    this.bird.y = this.screenHeight / 2;

    Ticker.shared.add(this.update, this);
  }

  private update(dt: number): void {
    if (!this.scrolling) {
      return;
    }
    // scroll background by preset speed * dt, looping back to 0 after the looping point
    this.backgroundScroll = (this.backgroundScroll + config.BACKGROUND_SCROLL_SPEED * dt)
      % config.BACKGROUND_LOOPING_POINT

    this.spawnTimer += dt;
    // scroll ground by preset speed * dt, looping back to 0 after the screen width passes
    this.groundScroll = (this.groundScroll + config.GROUND_SCROLL_SPEED * dt)
      % this.screenWidth;

    this.background.x = -this.backgroundScroll;

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
        console.debug('COLLIDED')
        this.scrolling = false;
      }

      if (pair.dead) {
        this.pipes.removeChild(pair);
      }
    });

    this.ground.x = -this.groundScroll;

    if (this.bird) {
      this.bird.update(dt);

      if (this.bird.y > this.screenHeight - GROUND_OFFSET - this.bird.height / 2) {
        this.bird.kill();
        this.bird = null;
        this.scrolling = false;
      }
    }
  }
}
