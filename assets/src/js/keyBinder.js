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
      //保存
      localStorage.setItem('keyBind', JSON.stringify(keyActions));
    }else{
      alert('既に登録されているキーです');
    }
  }else{
    console.error('不正なAction名');
  }
}

export function loadKeyBind(){
  if(localStorage.getItem('keyBind') != null){
    keyActions = JSON.parse(localStorage.getItem('keyBind'));
  }else{
    // console.log('KeyBind変更はまだしていない');
  }
}