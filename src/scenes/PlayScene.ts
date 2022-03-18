import {Container, Text, Ticker} from 'pixi.js';
import Bird from '../entities/Bird';
import {config, getRandomIntInclusive} from '../utils';
import PipePair from '../components/PipePair';
import {GAP_HEIGHT, GROUND_OFFSET, PIPE_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH} from '../utils/config';
import Scene from '../engine/Scene';
import game from '../engine/Game';
import ScoreScene from './ScoreScene';
import {sound} from '@pixi/sound';

export default class PlayScene extends Scene {
  private bird: Bird;
  private spawnTimer: number = 0;
  private pipes: Container;
  private lastY: number = getRandomIntInclusive(0, 80) + 20;
  private scoreText: Text;

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

    this.scoreText = new Text(`Score: ${game.score}`, {
      fontFamily: 'Basic Font',
      fontSize: 14,
      align: 'center',
    });

    this.scoreText.y = 10;
    this.scoreText.x = 30;

    this.container.addChild(this.scoreText);

    this.bird = new Bird(this.container);
    this.bird.anchor.set(0.5);
    this.bird.x = this.screenWidth / 2;
    this.bird.y = this.screenHeight / 2;
  }

   update(dt: number): void {
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
        sound.play('explosion');
        sound.play('hurt');
        game.setScene(new ScoreScene());
      }

      if (!pair.scored) {
        if (pair.x + PIPE_WIDTH < this.bird.x) {
          sound.play('score');
          pair.scored = true;
          game.score++;
          this.scoreText.text = `Score: ${game.score}`;
        }
      }

      if (pair.dead) {
        this.pipes.removeChild(pair);
      }
    });

    if (this.bird) {
      this.bird.update(dt);

      if (this.bird.y > this.screenHeight - GROUND_OFFSET - this.bird.height / 2 ||
        this.bird.y < -this.bird.height) {
        sound.play('explosion');
        sound.play('hurt');

        this.bird.kill();
        this.bird = null;

        game.setScene(new ScoreScene());
      }
    }
  }
}
