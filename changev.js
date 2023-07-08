let x, v, t, x0, v0,a; 
let slider, button;

function setup() {
  createCanvas(720,420);

  slider = createSlider(-0.5, 0.5, 0, 0.1);
  slider.position(10, 10);//위치
  slider.style('width', '80px');//css 설정
  slider.changed(event);//변하는 값마다 event 발생
  button = createButton('시작');
  button.position(30, 30);
  button.mousePressed(reset);

  t = 0;
  x0 = 100;//처음위치가 0이면 물체가 왼쪽 끝에 있어서 반대방향으로 움직이는 것을 볼 수 없다.
  v0 =0; 
  a =0;
}

function draw() {
  background(100, 100, 100);
  t=t+1;
  v= v0+a*t
  x = x0+v0*t+a/2*t**2	
  x = constrain(x, 0, 720);
  if(x == 0 | x ==720){
    v = v0;
  }
	
  text("위치" + int(x), 50, 60);
  text("속도: " + int(v), 50, 100);
  text("가속도: " + a, 50, 140);
	
	
  circle(x, 30,10);
	
  
}

function event(){
  t= 0;
  x0 = x;
  v0 = v;//지금 속도를 저장하고 처음속도로 바꿔준다. 없으면 어떻게 될까?
  a = slider.value();
}
function reset(){
	t=0;
	x0=100;
	v0=0;
}