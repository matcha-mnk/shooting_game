import { gameManager } from './gameManager.js';
import { createEnemy1 } from "./enemy.js";
import { showStory } from './ui.js';

export function startStage(){
  const count = gameManager.count;

  const enemyCountWave1 = 30;
  if(count === enemyCountWave1) createEnemy1(300, 0, 0, 2, 1);
  if(count === enemyCountWave1 + 50) createEnemy1(330, 0, 0, 2, 2);
  if(count === enemyCountWave1 + 120) createEnemy1(canvas.width - 300, 0, 0, 2, 1);
  if(count === enemyCountWave1 + 170) createEnemy1(canvas.width - 330, 0, 0, 2, 2);
  if(count === enemyCountWave1 + 270){
    for(let i=0; i<7; i++){
      createEnemy1(300+25*i, 0-50*i, 0, 3, 0);
      createEnemy1(canvas.width - 300-25*i, 0-50*i, 0, 3, 0);
    }
  }
  if(count === enemyCountWave1 + 390) createEnemy1(canvas.width/2 + 100, 0, 0, 3, 3);
  if(count === enemyCountWave1 + 410) createEnemy1(canvas.width/2 - 100, 0, 0, 3, 4);
  if(count === enemyCountWave1 + 420) createEnemy1(canvas.width/2, 0, 0, 3, 3);
  if(count === enemyCountWave1 + 470) createEnemy1(255, 0, 1.5, 2, 5);
  if(count === enemyCountWave1 + 480) createEnemy1(canvas.width -300, 0, -1.5, 2, 6);
  if(count === enemyCountWave1 + 485) createEnemy1(370, 0, 1.5, 2, 5);
  if(count === enemyCountWave1 + 495) createEnemy1(canvas.width -250, 0, -1.5, 2, 6);
  if(count === enemyCountWave1 + 510) createEnemy1(410, 0, 2, 2, 6);
  if(count === enemyCountWave1 + 515) createEnemy1(100, 50, 3, 0, 1);
  if(count === enemyCountWave1 + 525) createEnemy1(810, 70, -3, 0, 2);
  if(count === enemyCountWave1 + 530) createEnemy1(100, 40, 3, 1, 1);
  if(count === enemyCountWave1 + 540) createEnemy1(810, 90, -3, -1, 2);

  const storyCount1 = 770;

  if(count === enemyCountWave1 + storyCount1){
    gameManager.isTalking = true;
    showStory('バイトから帰るだけなのに道が危なすぎる...', 'char_1_normal_2', 'ユキ');
  }
}