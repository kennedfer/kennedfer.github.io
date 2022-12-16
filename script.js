class Layer {
  constructor(img, layer) {
    this.x = 0;
    this.y = 0;

    this.img = img;
    this.layer = layer;
  }

  update(mx, my) {
    //(this.x - mx / (this.layer)) * 0.5 + 40
    this.x -= ((this.x - mx / (this.layer * this.layer)) * 0.25) + 18;
    this.y -= (this.y - my / (this.layer)) * 0.1 - 2 * this.layer + 12;

    image(this.img, this.x, this.y);
  }
}

class Star {
  constructor() {
    this.x = 0;
    this.y = 0;

    this.trailLenght = 10;
    this.vell = 15;
  }

  randomPos() {
    this.x = (Math.random() * window.innerWidth * 2) - window.innerWidth;
    this.y = -10;
  }

  update() {
    this.x += this.vell;
    this.y += this.vell;

    line(this.x, this.y, this.x - this.vell * 4, this.y - this.vell * 4)



    if (this.y > window.innerHeight) { this.randomPos(); }
  }
}

let star1;
let star2;
let stars = [];
let nStars = Math.random() * 100 + 20;
let index = 0;
let mut = 1;
let bgImg;
let currentHours = (new Date()).getHours();
let imgs = [];
let canvas;
let isDaytime = currentHours < 18 && currentHours > 7;
let styleColor;
let inverseStyleColor;
let currentTime;
let inverseCurrentTime;
let styledElements;
let inverseStyledElements

let lightColor = "#f0bc00";
let darkColor = "#371758";

let messageText;
let infoText;
let footText;
let daytimeText;

let enText = {
  message: "HI FOLKS, I AM ",
  info: 'I am a <i>simple</i> developer.<br>I love <b>game development</b> and I have a great passion for <b>mobile development</b>.<br> I am 19 years old and I live in Brazil, more details on  <a target="_blank" class="colored_by_style"href="https://github.com/kennedfer">Github</a> ❤️<br>',
  foot_message: 'Also try to open on ',
  day_str: "day",
  night_str: "night",
};

let ptText = {
  message: "OI PESSOAL, EU SOU ",
  info: 'Sou um <i>simples</i> desenvolvedor.<br>Adoro <b>desenvolvimento de jogos</b> e tenho uma grande paixão por <b>desenvolvimento mobile</b>.<br> Tenho 19 anos e moro no Brasil, mais detalhes em <a target="_blank" class="colored_by_style"href="https://github.com/kennedfer">Github</a> ❤️<br>',
  foot_message: 'Também tente abrir “de” ',
  day_str: "dia",
  night_str: "noite",
};
let currentLanguage = ptText;
let maxWidth;
let maxHeight

function preload() {

  maxWidth = (window.innerWidth);
  maxHeight = (window.innerHeight);

  if (isDaytime) {
    styleColor = lightColor;
    inverseStyleColor = darkColor;
    currentTime = "day";
    inverseCurrentTime = "night";
  } else {
    styleColor = darkColor;
    inverseStyleColor = lightColor;
    currentTime = "night";
    inverseCurrentTime = "day";
  }

  let path = "imgs/" + currentTime;
  bgImg = loadImage(path + "/7.png");

  for (var i = 1; i < 7; i++) {
    var img = loadImage(path + '/' + (7 - i) + '.png');
    //img.resize(maxWidth, maxHeight);
    imgs.push(new Layer(img, (7 - i)));
  }
}
function setup() {
  star1 = new Star();
  star2 = new Star();

  stroke(255)
  strokeWeight(5);

  for (let i = 0; i < nStars; i++) {
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * (window.innerHeight / 2 + 100);
    stars.push(createVector(x, y));
  }
  /*
  fetch("https://api.github.com/users/kennedfer").then((data) => {
    data.json().then(response => {
      console.log(response)
    });
  });*/

  paintByStyle();
  paintByInverseStyle();

  console.log(inverseStyledElements);

  document.getElementById("translator-button").onclick = () => {
    translatePage();
  }

  let text_name = document.getElementById("name");

  messageText = document.getElementById("message");
  infoText = document.getElementById("info");
  footText = document.getElementById("foot-text");
  daytimeText = document.getElementById("timeday-text");

  document.getElementById("timeday-text").innerHTML = inverseCurrentTime;
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent("canvas");
  canvas.style("width", "100%");
  canvas.style("height", "100%");

  translatePage();
}

function draw() {
  scale((maxHeight + 200) / 720);
  image(bgImg, 0, 0)
  var mx = (mouseX - width / 2) / 10;
  var my = (mouseY - height / 2) / 10;


  if (!isDaytime) {
    star1.update();
    star2.update();

    noStroke();

    stars.forEach((pos, index, arr) => {

      circle(pos.x, pos.y, Math.random() * 5);
    });

    stroke(255)
  }
  imgs.forEach((img, i, arr) => {
    img.update(mx, my);
  });

}

function translatePage() {
  currentLanguage = (currentLanguage == enText) ? ptText : enText;

  animTexts();

  messageText.firstChild.nodeValue = currentLanguage.message;
  infoText.innerHTML = currentLanguage.info;
  footText.firstChild.nodeValue = currentLanguage.foot_message;
  daytimeText.firstChild.nodeValue = isDaytime ? currentLanguage.night_str : currentLanguage.day_str;

  paintByStyle();
}

function animTexts() {
  let texts_animated = document.getElementsByClassName("text-animated");
  texts_animated.forEach((element) => {
    element.style.animation = "none";
    element.offsetHeight;
    element.style.animation = null;
  });
}

function paintByStyle() {
  styledElements = (document.getElementsByClassName("colored_by_style"));
  styledElements.forEach(element => {
    element.style.color = styleColor;
  });
}

function paintByInverseStyle() {
  inverseStyledElements = (document.getElementsByClassName("inverse_colored_by_style"));
  inverseStyledElements.forEach(element => {
    element.style.color = inverseStyleColor;
  });
}
