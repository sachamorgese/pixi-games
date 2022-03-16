export enum SceneState {
  LOAD,
  PROCESS,
  FINALIZE,
  DONE
}
export interface GameScene {
  sceneUpdate(delta: number): void;
}
export abstract class AbstractGameScene implements GameScene {
  protected sceneState: SceneState;
  protected app: PIXI.Application;
  protected sceneSwitcher: (sceneName: string) => void;
  protected fadeInSceneTransition: SceneTransition;
  protected fadeOutSceneTransition: SceneTransition;
  protected sceneContainer: PIXI.Container;
  private onDone: () => void;
  set fadeInTransition(fadeInSceneTransition: SceneTransition) {
    this.fadeInSceneTransition = fadeInSceneTransition;
  }
  set fadeOutTransition(fadeOutSceneTransition: SceneTransition) {
    this.fadeOutSceneTransition = fadeOutSceneTransition;
  }
  init(
    app: PIXI.Application,
    sceneSwitcher: (sceneName: string) => void): void {
    this.app = app;
    this.sceneSwitcher = sceneSwitcher;
  }
  abstract setup(sceneContainer: PIXI.Container): void;
  abstract preTransitionUpdate(delta: number): void;
  abstract sceneUpdate(delta: number): void;
  update(delta: number): void {
    switch (this.sceneState) {
      case SceneState.LOAD:
        this.fadeInSceneTransition.update(delta, () => {
          this.sceneState = SceneState.PROCESS;
        });
        this.preTransitionUpdate(delta);
        break;
      case SceneState.PROCESS:
        this.sceneUpdate(delta);
        break;
      case SceneState.FINALIZE:
        this.fadeOutSceneTransition.update(delta, () => {
          this.sceneState = SceneState.DONE;
          if (this.onDone) {
            this.onDone();
          }
        });
        break;
    }
  }
  setFinalizing(onDone: () => void) {
    this.onDone = onDone;
    this.sceneState = SceneState.FINALIZE;
  }
}
