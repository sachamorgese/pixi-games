import Scene from '../engine/Scene';
import FontFaceObserver from 'fontfaceobserver';
import {Text} from 'pixi.js';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../utils/config';
import game from '../engine/Game';
import Keyboard from '../controls/Keyboard';
import PlayScene from './PlayScene';

export default class ScoreScene extends Scene {
  constructor() {
    super();
  }

  init(): void {
    const font = new FontFaceObserver('Basic Font');
    const flappy = new FontFaceObserver('Flappy Font');
    Promise.all([font.load(), flappy.load()]).then(() => this.setText());
  }

  setText() {
    const topText = new Text("Oof! You lost!", {
      fontFamily: 'Flappy Font',
      fontSize: 28,
      align: 'center',
    });

    topText.y = 110;
    topText.anchor.set(0.5);
    topText.x = SCREEN_WIDTH / 2;

    this.container.addChild(topText);

    const scoreText = new Text(`Score: ${game.score}`, {
      fontFamily: 'Basic Font',
      fontSize: 14,
      align: 'center',
    });

    scoreText.y = SCREEN_HEIGHT / 2;
    scoreText.anchor.set(0.5);
    scoreText.x = SCREEN_WIDTH / 2;

    this.container.addChild(scoreText);

    const enterText = new Text("Press Enter to Play Again", {
      fontFamily: 'Basic Font',
      fontSize: 14,
      align: 'center',
    });

    enterText.y = SCREEN_HEIGHT / 2 + 90;
    enterText.anchor.set(0.5);
    enterText.x = SCREEN_WIDTH / 2;

    this.container.addChild(enterText);
  }

  public update(deltaTime: number): void {
    if (Keyboard.enter()) {
      game.reset();
      game.setScene(new PlayScene(SCREEN_WIDTH, SCREEN_HEIGHT))
    }
  }
}
