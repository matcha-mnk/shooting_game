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


  showChapter(15, 1, 'はじまり')
}

function showChapter(startCount, chapNum, title){
  if(gameManager.count >= startCount && gameManager.count <= startCount+86){
    //背景
    ctx.fillStyle = 'rgba(' + [0,0,0,0.5] + ')';
    ctx.fillRect(250, canvas.height/2 -55, 460, 100);
  }
  if(gameManager.count === startCount) drawChapter(chapNum, title);
  if(gameManager.count ===  startCount+2) drawChapter(chapNum, title);
  if(gameManager.count === startCount+4) drawChapter(chapNum, title);
  if(gameManager.count > startCount+5 && gameManager.count <= startCount+80) drawChapter(chapNum, title);
  if(gameManager.count === startCount+80+2) drawChapter(chapNum, title);
  if(gameManager.count === startCount+80+4) drawChapter(chapNum, title);
  if(gameManager.count === startCount+80+6) drawChapter(chapNum, title);
}

function drawChapter(chapNum, title){
  //Chapter
  ctx.font = 'italic 24px misaki_gothic_2nd';
  ctx.fillStyle = '#dbdbdb';
  ctx.fillText('CHAPTER ' + chapNum, 250 + 20, canvas.height/2 - 15);
  //Title
  ctx.font = 'bold 24px misaki_gothic_2nd';
  ctx.fillText(title, 250 + 20, canvas.height/2 + 20);
}