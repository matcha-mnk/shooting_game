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

export function setKeyBind(action, keyCode){
  if(action in keyActions){
    if(!Object.values(keyActions).includes(keyCode)){
      //KeyBind変更
    keyActions[action] = keyCode;
    }else{
      console.error('既に登録されているキーです');
    }
  }else{
    console.error('不正なAction名');
  }
}