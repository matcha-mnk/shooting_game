import { gameManager, gameSceneState } from './gameManager.js';
import { playSE } from './assetsLoader.js';

//Player当たり判定
export function hitCheckPlayer(){
  const interval = 25;
  const count = gameManager.count;

  //EnemyとHit
  for(const enemy of gameManager.enemies) {
    if(
      Math.abs(gameManager.player.x - enemy.x) < gameManager.player.width / 16 + enemy.width * 0.5 / 2 &&
      Math.abs(gameManager.player.y - enemy.y) < gameManager.player.height / 16 + enemy.height * 0.5 /2 &&
      (count - gameManager.oldCountHit) > interval
    ){
      gameManager.oldCountHit = count;
      //console.log('HIT!');
      gameManager.isHitPlayerEffect = true;
      playSE('assets/sounds/se-died_1.mp3');

      if(gameManager.life > 0){
        gameManager.life--;
      }else{
        gameSceneState.changeScene('gameOverScene');
      }
    }
  }

  //EnemyShotとHit
  for (const shot of gameManager.enemyShots){
    if(
      Math.abs(gameManager.player.x - shot.x) < gameManager.player.width / 16 + shot.width * 0.5 / 2 &&
      Math.abs(gameManager.player.y - shot.y) < gameManager.player.height / 16 + shot.height * 0.5 /2 &&
      (count - gameManager.oldCountHit) > interval
    ){
      gameManager.oldCountHit = count;
      gameManager.isHitPlayerEffect = true;
      playSE('assets/sounds/se-died_1.mp3');

      if(gameManager.life > 0){
        gameManager.life--;
      }else{
        gameSceneState.changeScene('gameOverScene');
      }
    }
  }

  if((count - gameManager.oldCountHit) > interval && gameManager.isHitPlayerEffect) gameManager.isHitPlayerEffect = false;
}

//PlayerShot当たり判定
export function hitCheckPlayerShot(){
  for(const enemy of gameManager.enemies){
    for(const shot of gameManager.playerShots){
      if(
        Math.abs(shot.x - enemy.x) < shot.width * 0.3 / 2 + enemy.width * 0.7 / 2 &&
        Math.abs(shot.y - enemy.y) < shot.height * 0.3 / 2 + enemy.height * 0.7 /2
      ){
        //console.log('HIT!!!');
        enemy.isDied = true;//Enemy消す
        shot.isDied = true;//Shot消す
        gameManager.score += enemy.scorePoint;//スコア加算
        playSE('assets/sounds/se-kill_1.mp3');
      }
    }
  }
}