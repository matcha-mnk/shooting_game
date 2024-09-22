import { gameManager } from './gameManager.js';
import { createEnemyShot1 } from './enemyShot.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//Enemy1 プロパティ
function createEnemy1(posX, posY){
  gameManager.enemies.push({
    x: posX,
    y: posY,
    width: gameManager.spriteImage.enemy_1.width,
    height: gameManager.spriteImage.enemy_1.height,
    moveX: 0,
    moveY: 5,
    image: gameManager.spriteImage.enemy_1,
    scorePoint: 5,
    isDied: false
  });
}


//Enemy移動
export function moveEnemies(){
  for(const enemy of gameManager.enemies){
    enemy.x += enemy.moveX;
    enemy.y += enemy.moveY;
  }
  gameManager.enemies = gameManager.enemies.filter(enemy =>
    enemy.x < 710 && enemy.x > 250 /*&& enemy.y > 0*/ && enemy.y < 540 && !enemy.isDied
  );
}

//Enemy描画
export function drawEnemies(enemies){
  for(const enemy of gameManager.enemies){
    ctx.drawImage(enemy.image, enemy.x - enemy.width/2, enemy.y - enemy.height/2);
  }
}


//Enemy生成Manager
export function enemyCreateManager(){
  const count = gameManager.count;

  if(count === 50){
    createEnemy1(300, 0);
    createEnemy1(330, 0);
  }
  if(count === 90){
    for(const enemy of gameManager.enemies){
      enemy.moveX = 1.5;
    }
  }
  if(count === 100){
    createEnemy1(canvas.width - 300, 0);
    createEnemy1(canvas.width - 330, 0);
  }
  if(count === 140){
    for(const enemy of gameManager.enemies){
      enemy.moveX = -1.5;
    }
  }
  if(count === 200){
    for(let i=0; i<7; i++){
      createEnemy1(300+25*i, 0-50*i);
      createEnemy1(canvas.width - 300-25*i, 0-50*i);
    }
  }
}

