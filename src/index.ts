import { Application } from 'pixi.js'
import './utils/loader';
import game from './engine/Game';
import Background from './components/Background';
import Ground from './components/Ground';
import TitleScreenScene from './scenes/TitleScreenScene';
import {sound} from '@pixi/sound';
import loader from './utils/loader';

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 512,
	height: 288
});

sound.add('bg-sound', 'sounds/marios_way.mp3');
sound.add('explosion', 'sounds/explosion.wav');
sound.add('hurt', 'sounds/hurt.wav');
sound.add('jump', 'sounds/jump.wav');
sound.add('score', 'sounds/score.wav');

// pass in the screen size to avoid "asking up"
const sceny = new TitleScreenScene();

const backGround = new Background();
const ground = new Ground();

game.init(app);
game.addChild(backGround.getObject());
game.setScene(sceny);
game.addChild(ground.getObject());

const loop = (dt) => {
	backGround.update(dt)
	ground.update(dt)
};

game.run(loop);
