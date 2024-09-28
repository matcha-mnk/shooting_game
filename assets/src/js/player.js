import { gameManager } from './gameManager.js';
import { isAction } from './input.js';
import { createPlayerShot1, createPlayerShot2 } from './playerShot.js';
import { playSE } from './assetsLoader.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//Player プロパティ
export function createPlayer(){
  gameManager.player = {
    x: gameManager.spriteImage.player_1.width / 2,
    y: canvas.height - gameManager.spriteImage.player_1.height / 2,
    moveX: 0,
    moveY: 0,
    width: gameManager.spriteImage.player_1.width,
    height: gameManager.spriteImage.player_1.height,
    image: gameManager.spriteImage.player_1,
    moveSpeed: 0
  }
}

//Player Shot
export function shotPlayer(){
  if(isAction.isShot && !gameManager.isTalking){
    const intervalShot1 = 3;
    const count = gameManager.count;
    if((count - gameManager.oldCountShot1) > intervalShot1){
      gameManager.oldCountShot1 = count;
      createPlayerShot1(gameManager.player.x, gameManager.player.y - 5, 50);//弾発射
      playSE('assets/sounds/se-shot_1.mp3');
      //console.log('SHOT!');
    }
    if(gameManager.playerLevel >= 1){
      const intervalShot2 = 10;
      if((count -gameManager.oldCountShot2) > intervalShot2){
        gameManager.oldCountShot2 = count;
        createPlayerShot2(gameManager.player.x +30, gameManager.player.y - 5, 20, 20);
        createPlayerShot2(gameManager.player.x -30, gameManager.player.y - 5, 20, 20);
        playSE('assets/sounds/se-shot_1.mp3');
      }
    }
  }

  if(isAction.isBomb && !gameManager.isTalking && !gameManager.onBombKey && gameManager.bombs > 0){
    gameManager.onBombKey = true;
    gameManager.bombs--;
    //TASK:Bomb発射
    //console.log('BOMB!');
  }else if (!isAction.isBomb){
    gameManager.onBombKey = false;
  }
}

//Player移動
export function movePlayer(){
  let speed = gameManager.player.moveSpeed;
  const slowSpeedRatio = 0.4;

  if(!gameManager.isTalking){
    //移動計算
    if((isAction.isMoveRight || isAction.isMoveLeft) && (isAction.isMoveUp || isAction.isMoveDown)){
      if(isAction.isSlowMove) speed = gameManager.player.moveSpeed / 2 * slowSpeedRatio//斜め+低速移動 リファクタできそう
      else speed = gameManager.player.moveSpeed / 2;//斜め移動
    }
    else if (isAction.isSlowMove) speed = gameManager.player.moveSpeed * slowSpeedRatio//低速移動 リファクタできそう
    else speed = gameManager.player.moveSpeed;//通常移動

    if(isAction.isMoveRight && isAction.isMoveLeft) gameManager.player.moveX = 0;//左右同時は停止
    else if(isAction.isMoveRight && gameManager.player.x < 710) gameManager.player.moveX = speed;//右
    else if(isAction.isMoveLeft && gameManager.player.x > 250) gameManager.player.moveX = -speed;//左
    else gameManager.player.moveX = 0;//停止

    if(isAction.isMoveUp && isAction.isMoveDown) gameManager.player.moveY = 0;//上下同時は停止
    else if(isAction.isMoveUp && gameManager.player.y > 0) gameManager.player.moveY = -speed;//上
    else if(isAction.isMoveDown && gameManager.player.y < 540) gameManager.player.moveY = speed;//下
    else gameManager.player.moveY = 0;//停止
  }else{
    gameManager.player.moveX = 0;
    gameManager.player.moveY = 0;
  }

  //移動代入
  gameManager.player.x += gameManager.player.moveX;
  gameManager.player.y += gameManager.player.moveY;
}

//Player描画
export function drawPlayer(){
  if(gameManager.isHitPlayerEffect && gameManager.count % 6 === 0){
    gameManager.player.image = gameManager.spriteImage.player_1_hit;
  }else{
    gameManager.player.image = gameManager.spriteImage.player_1;
  }

  ctx.drawImage(
    gameManager.player.image,
    gameManager.player.x - gameManager.player.width / 2,
    gameManager.player.y - gameManager.player.height / 2
  );
}