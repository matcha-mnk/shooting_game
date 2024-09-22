import { gameManager } from './gameManager.js';
import { gameOver } from './ui.js';

let oldCountHit = 0;//リファクタしてね


//Player当たり判定
export function hitCheckPlayer(){
  for(const enemy of gameManager.enemies) {
    const interval = 25;
    const count = gameManager.count;

    if(
      Math.abs(gameManager.player.x - enemy.x) < gameManager.player.width / 16 + enemy.width * 0.5 / 2 &&
      Math.abs(gameManager.player.y - enemy.y) < gameManager.player.height / 16 + enemy.height * 0.5 /2 &&
      (count - oldCountHit) > interval
    ){
      oldCountHit = count;
      //TASK:被弾表現
      //console.log('HIT!');

      if(gameManager.life > 0){
        gameManager.life--;
      }else{
        gameOver();
      }
    }
  }

  for (const shot of gameManager.enemyShots){
    const interval = 25;
    const count = gameManager.count;

    if(
      Math.abs(gameManager.player.x - shot.x) < gameManager.player.width / 16 + shot.width * 0.5 / 2 &&
      Math.abs(gameManager.player.y - shot.y) < gameManager.player.height / 16 + shot.height * 0.5 /2 &&
      (count - oldCountHit) > interval
    ){
      oldCountHit = count;
      if(gameManager.life > 0){
        gameManager.life--;
      }else{
        gameOver();
      }
    }
  }
}

//PlayerShot当たり判定
export function hitCheckPlayerShot(){
  for(const enemy of gameManager.enemies){
    for(const shot of gameManager.playerShots){
      if(
        Math.abs(shot.x - enemy.x) < shot.width * 0.8 / 2 + enemy.width * 0.7 / 2 &&
        Math.abs(shot.y - enemy.y) < shot.height * 0.6 / 2 + enemy.height * 0.7 /2
      ){
        //console.log('HIT!!!');
        enemy.isDied = true;//Enemy消す
        shot.isDied = true;//Shot消す
        gameManager.score += enemy.scorePoint;//スコア加算
      }
    }
  }
}