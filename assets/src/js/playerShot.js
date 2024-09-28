import { gameManager } from './gameManager.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


//Shotプロパティ
export function createPlayerShot1(posX, posY, power){
  // console.log('shot');
  gameManager.playerShots.push({
    id: 1,
    x: posX,
    y: posY,
    width: gameManager.effectImage.player_shot_1.width,
    height: gameManager.effectImage.player_shot_1.height,
    moveX: 0,
    moveY: -20,
    image: gameManager.effectImage.player_shot_1,
    power: power,
    isDied: false
  })
}

export function createPlayerShot2(posX, posY, speed, power){
  gameManager.playerShots.push({
    id: 2,
    x: posX,
    y: posY,
    width: gameManager.effectImage.player_shot_2.width,
    height: gameManager.effectImage.player_shot_2.height,
    speed: speed,
    moveX: 0,
    moveY: 0,
    targetEnemy: null,
    image: gameManager.effectImage.player_shot_2,
    power: power,
    isDied: false
  })
}

//Shot移動
export function movePlayerShots(){
  for(const shot of gameManager.playerShots){
    if(shot.id === 2){
      let targetX;
      let targetY;
      let minDistance = Infinity;

      if(gameManager.enemies[0] && !shot.targetEnemy){
        //一番近い敵の座標取得
        for(const enemy of gameManager.enemies){
          const dx = enemy.x - shot.x;
          const dy = enemy.y - shot.y;
          const distance = dx*dx - dy*dy;
          if(distance < minDistance){
            minDistance = distance;
            shot.targetEnemy = enemy;
          }

          targetX = shot.targetEnemy.x;
          targetY = shot.targetEnemy.y;
        }
      }else if(shot.targetEnemy){
        targetX = shot.targetEnemy.x;
        targetY = shot.targetEnemy.y;
        if(shot.targetEnemy.isDied || shot.targetEnemy == undefined){
          shot.targetEnemy = null;
        }
      }else{
        targetX = shot.x;
        targetY = shot.y - 100;
      }

      //角度計算
      const rad = (Math.atan2(targetY - shot.y, targetX - shot.x));
      //移動量代入
      shot.moveX = Math.cos(rad) * shot.speed;
      shot.moveY = Math.sin(rad) * shot.speed;
    }
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