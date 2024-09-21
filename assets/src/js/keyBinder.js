//初期設定
const defaultKeyActions = {
  showMenu: 'Tab',
  moveRight: 'ArrowRight',
  moveLeft: 'ArrowLeft',
  fire: 'Space'
}

let keyActions = {
  showMenu: 'Tab',
  moveRight: 'ArrowRight',
  moveLeft: 'ArrowLeft',
  fire: 'Space'
}

export function getKeyBind(action){
  return keyActions[action];
}