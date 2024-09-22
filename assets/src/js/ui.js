import { gameManager } from './gameManager.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//UI描画
export function drawUI(){
  //Letter Box
  ctx.fillStyle = '#1e1e1e';
  ctx.fillRect(0, 0, 250, canvas.height);
  ctx.fillRect(canvas.width-250, 0, 250, canvas.height);

  //Score
  ctx.textAlign = 'left';
  ctx.font = '13px misaki_gothic_2nd';
  ctx.fillStyle = '#dbdbdb';
  ctx.fillText('SCORE', 730, 25);
  ctx.font = '24px misaki_gothic_2nd';
  ctx.textAlign = 'right';
  ctx.fillStyle = '#dbdbdb';
  ctx.fillText(gameManager.score, canvas.width-10, 50);

  //Level
  ctx.textAlign = 'left';
  ctx.font = 'italic 24px misaki_gothic_2nd';
  ctx.fillStyle = '#dbdbdb';
  ctx.fillText('LV.', 730, 150);
  ctx.font = ' 48px misaki_gothic_2nd';
  ctx.fillStyle = '#dbdbdb';
  ctx.fillText(gameManager.playerLevel, 785, 150);

  //Life
  ctx.font = '24px misaki_gothic_2nd';
  ctx.fillStyle = '#dbdbdb';
  ctx.fillText(`LIFE ${gameManager.life}`, 730, 210);

  //Bomb
  ctx.font = '24px misaki_gothic_2nd';
  ctx.fillStyle = '#dbdbdb';
  ctx.fillText(`BOMB ${gameManager.bombs}`, 730, 250);


  //Count TASK:後で消す!!!
  ctx.font = '24px misaki_gothic_2nd';
  ctx.fillStyle = '#dbdbdb';
  ctx.fillText(`COUNT ${gameManager.count}`, 730, 320);
}

//GameOver
export function gameOver(){
  gameSceneState.changeScene('keyBindingScene');
  //GameOver表現
  ctx.font = '50px misaki_gothic_2nd';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.fillText(`Game Over`, 480, 270);

  clearInterval(gameManager.timer);
}
