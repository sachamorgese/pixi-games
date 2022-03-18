import { DisplayObject } from 'pixi.js';
export * as config from './config';

export function checkCollision(objA: DisplayObject, objB: DisplayObject, offset: number = 0): boolean {
  const a = objA.getBounds();
  const b = objB.getBounds();

  const rightmostLeft = a.left + offset < b.left ? b.left : a.left + offset;
  const leftmostRight = a.right - offset * 2 > b.right ? b.right : a.right - offset * 2;

  if (leftmostRight <= rightmostLeft) {
    return false;
  }

  const bottommostTop = a.top + offset < b.top ? b.top : a.top + offset;
  const topmostBottom = a.bottom - offset > b.bottom ? b.bottom : a.bottom - offset;

  return topmostBottom > bottommostTop;
}

export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
