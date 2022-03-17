import {Container} from 'pixi.js';

export default abstract class Scene {
  protected container: Container;

  protected constructor() {
    this.container = new Container();
  }

  abstract init(): void;

  getContainer(): Container {
    return this.container;
  }

  emptyContainer(): void {
    this.container.removeChildren();
  }

  abstract update(dt: number): void
}
