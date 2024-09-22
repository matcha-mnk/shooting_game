//初期設定
const defaultKeyActions = {
  showMenu: 'ControlLeft',
  moveUp: 'ArrowUp',
  moveDown: 'ArrowDown',
  moveRight: 'ArrowRight',
  moveLeft: 'ArrowLeft',
  slowMove: 'ShiftLeft',
  shot: 'KeyZ',
  bomb: 'KeyX'
}

let keyActions = {
  showMenu: 'ControlLeft',
  moveUp: 'ArrowUp',
  moveDown: 'ArrowDown',
  moveRight: 'ArrowRight',
  moveLeft: 'ArrowLeft',
  slowMove: 'ShiftLeft',
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

function setKeyBind(action){
  //TASK:KeyBind変更
}