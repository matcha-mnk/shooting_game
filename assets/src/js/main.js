const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const spriteNames = ['player_1', 'enemy_1'];
const backgroundNames = ['test'];
const uiNames = ['letter_box'];


const game = {
  timeCounter: 0,
  enemies: [],
  spriteImage: {},
  backgroundImage: {},
  uiImage: {},
  isGameOver: true,
  score: 0,
  timer: null
};


assetLoader();

async function assetLoader(){
  //画像ロード
  const [_spriteImage, _backgroundImage, _uiImage] = await Promise.all([
    imageLoader(spriteNames, 'sprite-'),
    imageLoader(backgroundNames, 'background-'),
    imageLoader(uiNames, 'ui-')
  ]);
  game.spriteImage = _spriteImage;
  game.backgroundImage = _backgroundImage;
  game.uiImage = _uiImage;

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

  ctx.fillStyle = '#2C2C2C';
  ctx.fillRect(0, 0, 200, canvas.height);
  ctx.fillRect(canvas.width-200, 0, 200, canvas.height);
}