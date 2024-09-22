import { getKeyBind } from './keyBinder.js';


export const isAction ={
  isMoveRight: false,
  isMoveLeft: false,
  isMoveUp: false,
  isMoveDown: false,
  isSlowMove: false,

  isShot: false,
  isBomb: false
}


document.addEventListener('keydown', event => {
  //一応拡張しやすいように残しておく
  let isKeyMoveRight = event.code === getKeyBind('moveRight');
  let isKeyMoveLeft = event.code === getKeyBind('moveLeft');
  let isKeyMoveUp = event.code === getKeyBind('moveUp');
  let isKeyMoveDown = event.code === getKeyBind('moveDown');

  //移動
  if(isKeyMoveRight) isAction.isMoveRight = true;
  if(isKeyMoveLeft) isAction.isMoveLeft = true;
  if(isKeyMoveUp) isAction.isMoveUp = true;
  if(isKeyMoveDown) isAction.isMoveDown = true;
  if(event.code === getKeyBind('slowMove')) isAction.isSlowMove = true;

  //shot
  if(event.code === getKeyBind('shot')) isAction.isShot = true;
  //bomb
  if(event.code === getKeyBind('bomb')) isAction.isBomb = true;
});
document.addEventListener('keyup', event => {
  let isKeyMoveRight = event.code === getKeyBind('moveRight');
  let isKeyMoveLeft = event.code === getKeyBind('moveLeft');
  let isKeyMoveUp = event.code === getKeyBind('moveUp');
  let isKeyMoveDown = event.code === getKeyBind('moveDown');

  if(isKeyMoveRight) isAction.isMoveRight = false;
  if(isKeyMoveLeft) isAction.isMoveLeft = false;
  if(isKeyMoveUp) isAction.isMoveUp = false;
  if(isKeyMoveDown) isAction.isMoveDown = false;
  if(event.code === getKeyBind('slowMove')) isAction.isSlowMove = false;

  if(event.code === getKeyBind('shot')) isAction.isShot = false;
  if(event.code === getKeyBind('bomb')) isAction.isBomb = false;
});