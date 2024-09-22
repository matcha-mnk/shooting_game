import { gameManager } from './gameManager.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


//Shotプロパティ
export function createPlayerShot1(posX, posY){
  // console.log('shot');
  gameManager.playerShots.push({
    x: posX,
    y: posY,
    width: gameManager.effectImage.player_shot_1.width,
    height: gameManager.effectImage.player_shot_1.height,
    moveX: 0,
    moveY: -20,
    image: gameManager.effectImage.player_shot_1,
    isDied: false
  })
}

//Shot移動
export function movePlayerShots(){
  for(const shot of gameManager.playerShots){
    shot.x += shot.moveX;
    shot.y += shot.moveY;
  };
  gameManager.playerShots = gameManager.playerShots.filter(shot =>
    shot.x < 710 && shot.x > 250 && shot.y > 0 && shot.y < 540 && !shot.isDied
  );
}

//Shot描画
export function drawPlayerShots(){
  for(const shot of gameManager.playerShots){
    ctx.drawImage(shot.image, shot.x - shot.width/2, shot.y - shot.height/2);
  }
}