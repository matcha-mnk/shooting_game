import { gameManager } from './gameManager.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let storySpeakerName;
let storySpeakerImgPath;
let storyText;

export function reset(){
  storyText = 0;
}

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
  ctx.fillText(('000000000000000000' + gameManager.score).slice(-18), canvas.width-10, 55);

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


  //Count
  // ctx.font = '24px misaki_gothic_2nd';
  // ctx.fillStyle = '#dbdbdb';
  // ctx.fillText(`COUNT ${gameManager.count}`, 730, 320);

  //Character 描画
  let charImgPath;
  if(gameManager.count %200 === 0){
    charImgPath = gameManager.spriteImage.char_1_normal_2;
  }else if((gameManager.count +1) %200 === 0){
    charImgPath = gameManager.spriteImage.char_1_normal_3;
  }else{
    charImgPath = gameManager.spriteImage.char_1_normal_1;
  }
  ctx.drawImage(charImgPath, 730, canvas.height - charImgPath.height);

  //Story 描画
  if(gameManager.isTalking){
    //背景
    ctx.fillStyle = 'rgba(' + [0,0,0,0.5] + ')';
    ctx.fillRect(250, canvas.height -100 -50, 460, 100);

    //Char 画像
    ctx.drawImage(storySpeakerImgPath, canvas.width-250-storySpeakerImgPath.width, canvas.height -150 - storySpeakerImgPath.height);

    ctx.textAlign = 'left';//一応
    //Speaker Name
    ctx.font = 'italic bold 15px misaki_gothic_2nd';
    ctx.fillStyle = '#dbdbdb';
    ctx.fillText(storySpeakerName, 250 + 20, canvas.height -130);

    //Text
    ctx.font = '15px misaki_gothic_2nd';
    ctx.fillText(storyText, 250 + 20, canvas.height -100);
  }


  showChapter(15, 1, 'はじまり')
}

//Chapter 表示処理
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

//Chapter 描画
function drawChapter(chapNum, title){
  ctx.textAlign = 'left';//一応

  //Chapter
  ctx.font = 'italic 24px misaki_gothic_2nd';
  ctx.fillStyle = '#dbdbdb';
  ctx.fillText('CHAPTER ' + chapNum, 250 + 20, canvas.height/2 - 15);
  //Title
  ctx.font = 'bold 24px misaki_gothic_2nd';
  ctx.fillText(title, 250 + 20, canvas.height/2 + 20);
}


//Story 表示処理
export function showStory(text, charId, charName){
  storySpeakerName = charName;
  storySpeakerImgPath = gameManager.spriteImage[charId];
  storyText = text;
}