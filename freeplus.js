let x, y, v, vx, vy, t, x0, y0, vx0, vy0, ax, ay;
let slider, slider1, slider2, button, button1;
let trigger = false;
let scale, move, over;

function setup() {
  createCanvas(720,420);

  slider = createSlider(-0.5, 0.5, 0, 0.1);
  slider.position(10, 10);
  slider.style('width', '80px');

  slider0 = createSlider(-0.5, 0.5, 0, 0.1);
  slider0.position(100, 10);
  slider0.style('width', '80px');

  slider1 = createSlider(-5,5, 0, 1);
  slider1.position(190, 10);
  slider1.style('width', '80px');

  slider2 = createSlider(-5, 5, 0, 1);
  slider2.position(280, 10);
  slider2.style('width', '80px');

  button = createButton('시작');
  button.position(30, 50);
  button.mousePressed(start_event);

  button1 = createButton('정지');
  button1.position(80, 50);
  button1.mousePressed(stop_event);

  t = 0;
  x0 = 100;
  y0 = 100;
  vx0 = 0;
  vy0 = 0;
  ax = 0;
  ay = 0; 
  scale = 30;
}

function draw() {
  background(100, 100, 100);
  if(trigger){
    t=t+1;
  }

  x = x0+vx0*t+ax/2*t**2
  y = y0+vy0*t+ay/2*t**2
  vx = vx0+ax*t
  vy = vy0+ay*t
//width와 height를 이용하여 제한을 두었다.
  if(x < 0 | x >width){
    vx = 0
  } 

  if(y < 0 | y >height){
    vy = 0
  }

  x = constrain(x, 0, width);
  y = constrain(y, 0, height);

  textSize(32);
  fill(200, 102, 153);

  text("위치" + int(x)+","+int(y), 50, 60);
  text("속도: " + int(vx) +","+int(vy), 50, 100);
  text("처음속도: " + int(slider1.value()) +","+int(slider2.value()), 50, 140);//처음속도를 추가한다.
  text("가속도: " + slider.value() +","+slider0.value(), 50, 180);

  drag()

  circle(x, y, scale);
}

function start_event() {
  trigger = true;
//시작 버튼을 누르면 값을 적용한다.
  ax = slider.value();
  ay = slider0.value();
  vx0 = slider1.value();
  vy0 = slider2.value();
}

function stop_event() {
  trigger = false;
  t=0;
  x0 = x;
  y0 = y;
  vx0 = vx;
  vy0 = vy; 
}

function drag() {
  if ( !move ) {
  }
  half_scale = scale/2
  if (mouseX > x0-half_scale && mouseX < x0+half_scale && mouseY > y0-half_scale && mouseY < y0+half_scale) {
    over = true;
  } else {
    over = false;
  }

  if (move) {
    x0 = mouseX
    y0 = mouseY

    let word ="("+int(x0)+","+int(y0)+")"
    text(word, x0+30, y0+30);
  }
}

function mousePressed() {
  if (over) {
    move = true;
  }
}

function mouseReleased() {
  move = false;
}
