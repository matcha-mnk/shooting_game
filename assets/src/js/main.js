const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const spriteNames = ['player_1', 'enemy_1'];
const backgroundNames = ['test', 'test_2'];


//データのオブジェクト
const game = {
  timeCounter: 0,
  enemies: [],
  spriteImage: {},
  backgroundImage: {},
  isGameOver: true,
  score: 0,
  timer: null
};


assetLoader();

async function assetLoader(){
  //画像ロード
  game.spriteImage = await imageLoader(spriteNames, 'sprite-');
  game.backgroundImage = await imageLoader(backgroundNames, 'background-');

  init();
}

function imageLoader(imgNames, imgType){
  return new Promise((resolve) => {
    let imageLoadCounter = 0;
    let img={};

    for(const imageName of imgNames){
      const imagePath = `assets/images/${imgType}${imageName}.png`;
      img[imageName] = new Image();
      img[imageName].src = imagePath;
      img[imageName].onload = () => {
        imageLoadCounter += 1;
        if(imageLoadCounter === imgNames.length){
          console.log(`${imgType}:画像ロード完了`);
          resolve(img);
        }
      };
      img[imageName].onerror = () => {
        console.log(`${imgType}:${imagePath}の画像ロード失敗`);
      };
    }
  })
}

//初期化
function init(){
  game.timeCounter = 0;
  game.enemies = [];
  game.isGameOver = false;
  game.score = 0;
  ctx.drawImage(game.spriteImage.player_1, 500, 320);
  ctx.drawImage(game.spriteImage.enemy_1, 300, 320);
}