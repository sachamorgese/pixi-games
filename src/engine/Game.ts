import {Application, Container, DisplayObject, Ticker } from 'pixi.js';
import * as sound from '@pixi/sound';
import Scene from './Scene';
import Keyboard from "../controls/Keyboard";
import loader from '../utils/loader';

Keyboard.initialize();

class Game {
  private gameUpdate: (dt: number) => void
  private scene: Scene;
  private gameContainer: Container;
  score: number = 0;

  constructor() {
    this.gameContainer = new Container();
    this.gameContainer.sortableChildren = true;
  }

  init(app: Application) {
    app.stage.addChild(this.gameContainer);
  }

  reset = () => {
    this.score = 0;
  }

  addChild(child: DisplayObject) {
    this.gameContainer.addChild(child);
  }

  setScene(scene: Scene) {
    this.scene?.emptyContainer();
    this.scene = scene;
    this.scene.init();
    this.gameContainer.addChild(scene.getContainer());
  }

  run(gameUpdate = (dt?: number) => {}) {
    this.gameUpdate = gameUpdate;
    Ticker.shared.add(this.update, this);

    const bg = sound.sound.find('bg-sound');
    bg.play();
    bg.loop = true;
  };

  update(dt: number) {
    if (!this.scene) {
      throw new Error('No scene set');
    }

    this.scene.update(dt);
    this.gameUpdate(dt);
  }
}

const game = new Game();

export default game;
