import { gameManager } from './gameManager.js';
import { createEnemyShot1 } from './enemyShot.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//Enemy1 プロパティ
export function createEnemy1(posX, posY,mX, mY, num){
  gameManager.enemies.push({
    x: posX,
    y: posY,
    id: num,
    width: gameManager.spriteImage.enemy_1.width,
    height: gameManager.spriteImage.enemy_1.height,
    moveX: mX,
    moveY: mY,
    image: gameManager.spriteImage.enemy_1,
    scorePoint: 5,
    isDied: false
  });
}


//Enemy移動
export function moveEnemies(){
  for(const enemy of gameManager.enemies){
    if(enemy.id === 5 || enemy.id === 6){
      enemy.x += 0.5*enemy.moveX * enemy.moveX * enemy.moveX;
      enemy.y += 0.5*enemy.moveY * enemy.moveY * enemy.moveY;
    }else{
      enemy.x += enemy.moveX;
      enemy.y += enemy.moveY;
    }

    if((enemy.id === 1 || enemy.id === 5) && gameManager.count % 100 === 0) enemyShot1(enemy);
    if((enemy.id === 2 || enemy.id === 6) && (gameManager.count+50) % 100 === 0) enemyShot1(enemy);
    if((enemy.id === 3 || enemy.id === 4) && gameManager.count % 50 === 0) enemyShot1(enemy);
    if(enemy.id === 3 && gameManager.count === 500) enemy.moveY = 0;
    if(enemy.id === 3 && gameManager.count === 520) enemy.moveY = -3;
    if(enemy.id === 4 && gameManager.count === 510) enemy.moveY = 0;
    if(enemy.id === 4 && gameManager.count === 530){
      enemy.moveY = 1;
      enemy.moveX = -2;
    }
  }
  gameManager.enemies = gameManager.enemies.filter(enemy =>
    enemy.x < 960 && enemy.x > 0 && enemy.y > -400 && enemy.y < 540 && !enemy.isDied
  );
}

//Enemy描画
export function drawEnemies(){
  for(const enemy of gameManager.enemies){
    ctx.drawImage(enemy.image, enemy.x - enemy.width/2, enemy.y - enemy.height/2);
  }
}

//Enemy Shot
function enemyShot1(enemy){
  for(let i=0;i<3;i++){
    createEnemyShot1(enemy.x,enemy.y, -3 + i*i *0.5, 3 + i);
  }
  for(let i=0;i<3;i++){
    createEnemyShot1(enemy.x,enemy.y, 3 + -i*i *0.5, 3 + i);
  }
}