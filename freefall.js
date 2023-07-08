let x, y, v, vx, vy, t, x0, y0, vx0, vy0, ay;//변수가 많이 지정되어 있는데 이것은 뒤에서 좀 더 간결해진다.
let slider, slider1, slider2, button;
let trigger;

function setup() {
  createCanvas(720,420);

  slider = createSlider(-0.5, 0.5, 0, 0.1);
  slider.position(10, 10);
  slider.style('width', '80px');
  slider.changed(event);

  slider1 = createSlider(-5,5, 0, 1);
  slider1.position(100, 10);
  slider1.style('width', '80px');
  slider1.changed(event1);

  slider2 = createSlider(-5, 5, 0, 1);
  slider2.position(190, 10);
  slider2.style('width', '80px');
  slider2.changed(event2);

  t = 0;
  x0 = 100;
  y0 = 100;
  vx0 = 0;
  vy0 = 0;
  ay = 0; 
}

function draw() {
  background(100, 100, 100);
  if(trigger){
    t=t+1;
  }//slider만 조절할때 시간이 가게 하기위해 trigger를 이용했다.

  x = x0+vx0*t
  y = y0+vy0*t+ay/2*t**2
  vx = vx0
  vy = vy0+ay*t

  if(x < 0 | x >720){
    vx = 0
  } 

  if(y < 0 | y >420){
    vy = 0
  }

  x = constrain(x, 0, 720);
  y = constrain(y, 0, 420);
  v = sqrt(vx**2+vy**2);

  textSize(32);
  fill(200, 102, 153);
  text("위치" + int(x)+","+int(y), 50, 60);
  text("속력: " + int(v), 50, 100);
  text("가속도: " + ay, 50, 140);

  circle(x, y,10);
}

function event(){
  trigger = true;
  t= 0;
  x0 = x;
  y0 = y;
  vx0 = vx;
  vy0 = vy
  ay = slider.value();
}

function event1(){
  trigger = false;
  t =0;
  vx0 = slider1.value(); 
}

function event2(){
  trigger = false;
  t =0;
  vy0 = slider2.value(); 
}