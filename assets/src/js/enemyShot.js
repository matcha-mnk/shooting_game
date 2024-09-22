import { gameManager } from './gameManager.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


//プロパティ
export function createEnemyShot1(posX, posY, mX, mY){
  gameManager.enemyShots.push({
    x: posX,
    y: posY,
    width: gameManager.effectImage.enemy_shot_1.width,
    height: gameManager.effectImage.enemy_shot_1.height,
    moveX: mX,
    moveY: mY,
    image: gameManager.effectImage.enemy_shot_1,
    isDied: false
  })
}

//移動
export function moveEnemyShots(){
  for(const shot of gameManager.enemyShots){
    shot.x += shot.moveX;
    shot.y += shot.moveY;
  };
  gameManager.enemyShots = gameManager.enemyShots.filter(shot =>
    shot.x < 710 && shot.x > 250 && shot.y > 0 && shot.y < 540 && !shot.isDied
  );
}

//描画
export function drawEnemyShot(){
  for(const shot of gameManager.enemyShots){
    ctx.drawImage(shot.image, shot.x - shot.width/2, shot.y - shot.height/2);
  }
}