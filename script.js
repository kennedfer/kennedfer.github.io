let imgs = [];
let canvas;


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
let n_stars = Math.random() * 100 + 20;
let index = 0;
let mut = 1;
let bg_img;
let current_hours = (new Date()).getHours();

let is_daytime = current_hours < 18 && current_hours > 7;
let style_color;
let inverse_style_color;
let current_time;
let inverse_current_time;
let styled_elements;
let inverse_styled_elements

let light_color = "#f0bc00";
let dark_color = "#371758";

let message_text;
let info_text;
let foot_text;
let daytime_text;

let en_text = {
  message: "HI FOLKS, I AM ",
  info: 'I am a <i>simple</i> developer.<br>I love <b>game development</b> and I have a great passion for <b>mobile development</b>.<br> I am 19 years old and I live in Brazil, more details on  <a target="_blank" class="colored_by_style"href="https://github.com/kennedfer">Github</a> ❤️<br>',
  foot_message: 'Also try to open on ',
  day_str: "day",
  night_str: "night",
};

let pt_text = {
  message: "OI PESSOAL, EU SOU ",
  info: 'Sou um <i>simples</i> desenvolvedor.<br>Adoro <b>desenvolvimento de jogos</b> e tenho uma grande paixão por <b>desenvolvimento mobile</b>.<br> Tenho 19 anos e moro no Brasil, mais detalhes em <a target="_blank" class="colored_by_style"href="https://github.com/kennedfer">Github</a> ❤️<br>',
  foot_message: 'Também tente abrir “de” ',
  day_str: "dia",
  night_str: "noite",
};
let current_language = pt_text;
let maxWidth;
let maxHeight

function preload() {

  maxWidth = (window.innerWidth);
  maxHeight = (window.innerHeight);

  if (is_daytime) {
    style_color = light_color;
    inverse_style_color = dark_color;
    current_time = "day";
    inverse_current_time = "night";
  } else {
    style_color = dark_color;
    inverse_style_color = light_color;
    current_time = "night";
    inverse_current_time = "day";
  }

  let path = "imgs/" + current_time;
  bg_img = loadImage(path + "/7.png");

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

  for (let i = 0; i < n_stars; i++) {
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

  console.log(inverse_styled_elements);

  document.getElementById("translator-button").onclick = () => {
    translatePage();
  }

  let text_name = document.getElementById("name");

  message_text = document.getElementById("message");
  info_text = document.getElementById("info");
  foot_text = document.getElementById("foot-text");
  daytime_text = document.getElementById("timeday-text");

  document.getElementById("timeday-text").innerHTML = inverse_current_time;
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent("canvas");
  canvas.style("width", "100%");
  canvas.style("height", "100%");

  translatePage();
}

function draw() {
  scale((maxHeight + 200) / 720);
  image(bg_img, 0, 0)
  var mx = (mouseX - width / 2) / 10;
  var my = (mouseY - height / 2) / 10;


  if (!is_daytime) {
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
  current_language = (current_language == en_text) ? pt_text : en_text;

  animTexts();

  message_text.firstChild.nodeValue = current_language.message;
  info_text.innerHTML = current_language.info;
  foot_text.firstChild.nodeValue = current_language.foot_message;
  daytime_text.firstChild.nodeValue = is_daytime ? current_language.night_str : current_language.day_str;

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
  styled_elements = (document.getElementsByClassName("colored_by_style"));
  styled_elements.forEach(element => {
    element.style.color = style_color;
  });
}

function paintByInverseStyle() {
  inverse_styled_elements = (document.getElementsByClassName("inverse_colored_by_style"));
  inverse_styled_elements.forEach(element => {
    element.style.color = inverse_style_color;
  });
}
