//関数
import { enemyCreateManager, moveEnemies, drawEnemies } from './enemy.js';
import { createPlayer, shotPlayer, movePlayer, drawPlayer } from './player.js';
import { movePlayerShots, drawPlayerShots } from './playerShot.js';
import { moveEnemyShots, drawEnemyShot } from './enemyShot.js';
import { drawBackground, createBackgroundStar, moveBackgroundStars, drawBackgroundStars } from './background.js';
import { drawUI } from './ui.js';
import { hitCheckPlayer, hitCheckPlayerShot } from './hitCheck.js';
import { imageLoad } from './assetsLoader.js';
//変数
import { gameManager, gameSceneState, assetsNames } from './gameManager.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');



assetLoader();

//画像ロード
async function assetLoader(){
  const [spriteImage, effectImage, backgroundImage, uiImage] = await Promise.all([
    imageLoad(assetsNames.spriteNames, 'sprite-'),
    imageLoad(assetsNames.effectNames, 'effect-'),
    imageLoad(assetsNames.backgroundNames, 'background-'),
    imageLoad(assetsNames.uiNames, 'ui-')
  ]);
  gameManager.spriteImage = spriteImage;
  gameManager.effectImage = effectImage;
  gameManager.backgroundImage = backgroundImage;
  gameManager.uiImage = uiImage;

  init();
}

//初期化
function init(){
  gameManager.timeCounter = 0;
  gameManager.enemies = [];
  gameManager.isGameOver = false;
  gameManager.life = 5;
  gameManager.bombs = 3;
  gameManager.count = 0;
  gameManager.score = 0;

  gameSceneState.changeScene('titleScene');

  //Player初期設定
  createPlayer();
  gameManager.player.moveSpeed = 10;
  gameManager.player.x = canvas.width / 2;
  gameManager.player.y = canvas.height / 2 + 220;

  gameManager.timer = setInterval(ticker, 30);//カウント開始
}

//Update
function ticker(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);//画面クリア

  //Star生成
  if(Math.floor(Math.random() * 5) === 0){
    createBackgroundStar();
  }

  //処理
  shotPlayer();//PlayerShot処理
  enemyCreateManager();//Enemy生成
  //移動
  moveBackgroundStars();//Star移動
  moveEnemyShots();//EnemyShot移動
  moveEnemies();//Enemy移動
  movePlayerShots();//Shot移動
  movePlayer();//Player移動
  //描画
  drawBackground();//Background描画
  drawBackgroundStars();//Star描画
  drawEnemyShot();//EnemyShot描画
  drawEnemies();//Enemy描画
  drawPlayerShots();//Shot描画
  drawPlayer();//Player描画
  drawUI();//UI描画

  //当たり判定
  hitCheckPlayer();
  hitCheckPlayerShot();

  //カウンタ更新
  gameManager.count++;
  gameManager.timeCounter = (gameManager.timeCounter + 1) & 1000000;
}