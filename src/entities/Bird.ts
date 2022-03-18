import { Sprite, Texture, Container } from 'pixi.js';
import { GRAVITY, JUMP_VELOCITY } from '../utils/config';
import Keyboard from "../controls/Keyboard";
import { checkCollision } from '../utils';
import PipePair from '../components/PipePair';

export default class Bird extends Sprite {
  private dy: number = 0;

  constructor(private scene: Container) {
    super();

    this.texture = Texture.from("images/bird.png");
    this.anchor.set(0.5);
    this.height = 24;
    this.width = 38;

    scene.addChild(this);
  }

  update(dt: number) {
    this.dy += GRAVITY * dt;

    if (Keyboard.action()) {
      this.dy = JUMP_VELOCITY;
    }

    this.y += this.dy;
  }

  collides(pipes: PipePair) {
    if (checkCollision(this, pipes.getPipe('upper'), 4)) {
      return true;
    }
    return checkCollision(this, pipes.getPipe('lower'), 4);
  }

  kill() {
    this.scene.removeChild(this);
  }
}
