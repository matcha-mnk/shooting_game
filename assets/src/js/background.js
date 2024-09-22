import { gameManager } from './gameManager.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//Background描画
export function drawBackground(){
  ctx.drawImage(
    gameManager.backgroundImage.space_1,
    canvas.width / 2 - gameManager.backgroundImage.space_1.width/2, 0
  );
}

//Star
//Starプロパティ
export function createBackgroundStar(){
  const size = 1;
  const starX = Math.random() * (460 - size) + 250;
  gameManager.stars.push({
    x: starX,
    y: 0,
    width: size,
    height: size,
    moveY: 10
  });
}

//Star移動
export function moveBackgroundStars(){
  for(const star of gameManager.stars){
    star.y += star.moveY;
  }
  gameManager.stars = gameManager.stars.filter(star => star.y > -star.width);
}

//Star描画
export function drawBackgroundStars(){
  ctx.fillStyle = 'white';
  for(const star of gameManager.stars){
    ctx.fillRect(star.x - star.width / 2, star.y - star.height / 2,  star.width, star.height);
  }
}