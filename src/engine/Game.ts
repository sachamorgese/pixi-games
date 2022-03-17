import {Application, Container, DisplayObject, Ticker} from 'pixi.js';
import Scene from './Scene';
import Keyboard from "../controls/Keyboard";

Keyboard.initialize();

class Game {
  private gameUpdate: (dt: number) => void
  private scene: Scene;
  private gameContainer: Container;

  constructor() {
    this.gameContainer = new Container();
  }

  init(app: Application) {
    app.stage.addChild(this.gameContainer);
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

  run(gameUpdate = () => {}) {
    this.gameUpdate = gameUpdate;
    Ticker.shared.add(this.update, this);
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
