import FontFaceObserver from 'fontfaceobserver';
import { Text } from 'pixi.js';
import Scene from '../engine/Scene';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../utils/config';
import Keyboard from '../controls/Keyboard';
import game from '../engine/Game';
import PlayScene from './PlayScene';

export default class TitleScreenScene extends Scene {
  constructor() {
    super();
  }

  init(): void {
    const font = new FontFaceObserver('Basic Font');
    const flappy = new FontFaceObserver('Flappy Font');
    Promise.all([font.load(), flappy.load()]).then(() => this.setText());
  }

  setText() {
    const topText = new Text("Sacha's Bird", {
      fontFamily: 'Flappy Font',
      fontSize: 64,
      align: 'center',
    });

    topText.y = 110;
    topText.anchor.set(0.5);
    topText.x = SCREEN_WIDTH / 2;

    this.container.addChild(topText);

    const bottomText = new Text("Press Enter to start", {
      fontFamily: 'Flappy Font',
      fontSize: 14,
      align: 'center',
    });

    bottomText.y = SCREEN_WIDTH / 2 - 90;
    bottomText.anchor.set(0.5);
    bottomText.x = SCREEN_WIDTH / 2;

    this.container.addChild(bottomText);
  }


  update(dt: number): void {
    if (Keyboard.enter()) {
      game.setScene(new PlayScene(SCREEN_WIDTH, SCREEN_HEIGHT))
    }
  }
}
