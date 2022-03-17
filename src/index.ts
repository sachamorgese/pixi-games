import { Application } from 'pixi.js'
import './utils/loader';
import game from './engine/Game';
import Background from './components/Background';
import loader from './utils/loader';
import Ground from './components/Ground';
import TitleScreenScene from './scenes/TitleScreenScene';

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 512,
	height: 288
});

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

loader
	.add("images/background.png")
	.add("images/ground.png")
	.load(() => game.run(loop));
