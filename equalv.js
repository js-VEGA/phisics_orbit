let x, v, t, x0, v0; 
let slider, button;

function setup() {
  createCanvas(720,420);

  slider = createSlider(-5, 5, 0, 1);
  slider.position(10, 10);//위치
  slider.style('width', '80px');//css 설정
  slider.changed(event);//변하는 값마다 event 발생
  button = createButton('시작');
  button.position(30, 30);
  button.mousePressed(change);

  t = 0;
  x0 = 100;//처음위치가 0이면 물체가 왼쪽 끝에 있어서 반대방향으로 움직이는 것을 볼 수 없다.
  v0 =0; 
}

function draw() {
  background(100, 100, 100);
  t=t+1;
  x = x0+v0*t	
  circle(x, 30,10);
	
  text(v0, 30, 80);
}

function event(){
  t= 0;// 처음 상태로 돌아오게 하기 위해
  v0 = slider.value();//slider값에 맞게 초기속도가 변한다.
}

function change(){
	t=0;
}