import { gameManager } from './gameManager.js';
import { createEnemy1 } from "./enemy.js";
import { showStory } from './ui.js';
import { isAction } from './input.js';

let onEnterKey = false;
let storyNum = 0;
let textData = [];
let endStoryCount;
let lock;//TASK:名称変更

//CSV 読み込み
export function loadCsv(){
  fetch('assets/src/csv/story_text.csv')
    .then(res => {
      if (!res.ok) {
        throw new Error('fetch失敗');
      }
      return res.text();
    })
    .then(data => {
      textData = data.split('\n').map(row => {
        const[charId, name, text] = row.split(',');
        return{ CharId: charId, Name: name, Text: text};
      })
    })
    .catch((error) => {
      console.error('CSV読み込みエラー:', error);
    });
}


export function startStage(){
  //Enter 入力検知
  if(isAction.isShot && !onEnterKey && gameManager.isTalking){
    onEnterKey = true;
    storyNum++;
  }else if(!isAction.isShot){
    onEnterKey = false;
  }

  const count = gameManager.count;

  //描画タイミング的に先に読み込む
  if(textData[storyNum].CharId === ''){
    gameManager.isTalking = false;
    storyNum++;
  }else if(textData[storyNum].CharId === 'end'){
    //TASK:ゲームクリア処理
  }else{
    showStory(textData[storyNum].Text, textData[storyNum].CharId, textData[storyNum].Name);
  }

  //Story終了時のCountを保持
  if(gameManager.isTalking){
    lock = false;
  }else if(!lock){
    endStoryCount = count;
    lock = true;
  }


  //Wave 1
  const countEnemyWave1 = 30;
  if(count === countEnemyWave1) createEnemy1(300, 0, 0, 2, 1);
  if(count === countEnemyWave1 + 50) createEnemy1(330, 0, 0, 2, 2);
  if(count === countEnemyWave1 + 120) createEnemy1(canvas.width - 300, 0, 0, 2, 1);
  if(count === countEnemyWave1 + 170) createEnemy1(canvas.width - 330, 0, 0, 2, 2);
  if(count === countEnemyWave1 + 270){
    for(let i=0; i<7; i++){
      createEnemy1(300+25*i, 0-50*i, 0, 3, 0);
      createEnemy1(canvas.width - 300-25*i, 0-50*i, 0, 3, 0);
    }
  }
  if(count === countEnemyWave1 + 390) createEnemy1(canvas.width/2 + 100, 0, 0, 3, 3);
  if(count === countEnemyWave1 + 410) createEnemy1(canvas.width/2 - 100, 0, 0, 3, 4);
  if(count === countEnemyWave1 + 420) createEnemy1(canvas.width/2, 0, 0, 3, 3);
  if(count === countEnemyWave1 + 470) createEnemy1(255, 0, 1.5, 2, 5);
  if(count === countEnemyWave1 + 480) createEnemy1(canvas.width -300, 0, -1.5, 2, 6);
  if(count === countEnemyWave1 + 485) createEnemy1(370, 0, 1.5, 2, 5);
  if(count === countEnemyWave1 + 495) createEnemy1(canvas.width -250, 0, -1.5, 2, 6);
  if(count === countEnemyWave1 + 510) createEnemy1(410, 0, 2, 2, 6);
  if(count === countEnemyWave1 + 515) createEnemy1(100, 50, 3, 0, 1);
  if(count === countEnemyWave1 + 525) createEnemy1(810, 70, -3, 0, 2);
  if(count === countEnemyWave1 + 530) createEnemy1(100, 40, 3, 1, 1);
  if(count === countEnemyWave1 + 540) createEnemy1(810, 90, -3, -1, 2);

  //Story 1
  const countStory1 = 780;
  if(count === countEnemyWave1 + countStory1){
    gameManager.isTalking = true;
    if(isAction.isShot)isAction.isShot = false;//脳筋だけどまあ一旦動く TASK:リファクタ
  }

  //Wave 2
  const countEnemyWave2 = 50;
  if(storyNum === 10){
    if(count === endStoryCount + countEnemyWave2)createEnemy1(canvas.width/2 - 100, 0, 1, 3, 1);
    if(count === endStoryCount + countEnemyWave2 +10)createEnemy1(canvas.width/2 + 100, 0, -1, 3, 2);
    if(count === endStoryCount + countEnemyWave2 +15)createEnemy1(canvas.width/2 - 200, 0, 1, 3, 1);
    if(count === endStoryCount + countEnemyWave2 +20)createEnemy1(canvas.width/2 + 150, 0, -1, 3, 2);
    if(count === endStoryCount + countEnemyWave2 +30)createEnemy1(canvas.width/2 - 180, 0, 1, 3, 2);
    if(count === endStoryCount + countEnemyWave2 +35)createEnemy1(canvas.width/2 + 110, 0, -1, 3, 1);
    if(count === endStoryCount + countEnemyWave2 +40)createEnemy1(canvas.width/2 + 250, 0, -1, 3, 1);
    if(count === endStoryCount + countEnemyWave2 +50)createEnemy1(canvas.width/2 + 50, 0, -1, 3, 2);
    if(count === endStoryCount + countEnemyWave2 +60)createEnemy1(canvas.width/2 - 120, 0, 1, 3, 1);
    if(count === endStoryCount + countEnemyWave2 +65)createEnemy1(canvas.width/2 + 200, 0, -1, 3, 2);
    if(count === endStoryCount + countEnemyWave2 +70)createEnemy1(canvas.width/2 - 100, 0, 1, 3, 1);
    if(count === endStoryCount + countEnemyWave2 +75)createEnemy1(canvas.width/2 + 100, 0, -1, 3, 2);
    if(count === endStoryCount + countEnemyWave2 +85)createEnemy1(canvas.width/2 - 200, 0, 1, 3, 1);
    if(count === endStoryCount + countEnemyWave2 +90)createEnemy1(canvas.width/2 + 150, 0, -1, 3, 2);
    if(count === endStoryCount + countEnemyWave2 +100)createEnemy1(canvas.width/2 - 180, 0, 1, 3, 2);
    if(count === endStoryCount + countEnemyWave2 +105)createEnemy1(canvas.width/2 + 110, 0, -1, 3, 1);
    if(count === endStoryCount + countEnemyWave2 +115)createEnemy1(canvas.width/2 + 250, 0, -1, 3, 1);
    if(count === endStoryCount + countEnemyWave2 +125)createEnemy1(canvas.width/2 + 50, 0, -1, 3, 2);
    if(count === endStoryCount + countEnemyWave2 +130)createEnemy1(canvas.width/2 - 120, 0, 1, 3, 1);
    if(count === endStoryCount + countEnemyWave2 +135)createEnemy1(canvas.width/2 + 200, 0, -1, 3, 2);
  }

  //Story 2
  const countStory2 = 330;
  if(storyNum === 10 && count === endStoryCount + countEnemyWave2 + countStory2){
    gameManager.isTalking = true;
    if(isAction.isShot)isAction.isShot = false;
  }
}