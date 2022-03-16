import { Application } from 'pixi.js'
import PlayScene from './scenes/PlayScene';
import './utils/loader';

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 512,
	height: 288
});

// pass in the screen size to avoid "asking up"
const sceny: PlayScene = new PlayScene(app.screen.width, app.screen.height);

app.stage.addChild(sceny)
