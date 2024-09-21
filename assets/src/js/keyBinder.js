//初期設定
const defaultKeyActions = {
  showMenu: 'Tab',
  moveUp: 'ArrowUp',
  moveDown: 'ArrowDown',
  moveRight: 'ArrowRight',
  moveLeft: 'ArrowLeft',
  shot: 'KeyZ',
  bomb: 'KeyX'
}

let keyActions = {
  showMenu: 'Tab',
  moveUp: 'ArrowUp',
  moveDown: 'ArrowDown',
  moveRight: 'ArrowRight',
  moveLeft: 'ArrowLeft',
  shot: 'KeyZ',
  bomb: 'KeyX'
}

export function getKeyBind(action){
  if(action in keyActions){
    return keyActions[action];
  }else{
    console.error('不正なAction名');
  }
}

function newKeyBind(action){
  //KeyBind変更
}