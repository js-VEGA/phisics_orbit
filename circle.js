let x, y; // 현재 위치
let cx, cy; // 진동중심 좌표
let amplitude; // 진폭
let angle = 0; // 각도 변수
let period = 2 * Math.PI; // 주기 (2π)
let radius; // 반지름

function setup() {
  createCanvas(400, 400);
  
  cx = width / 2; // 캔버스의 가운데 x 좌표
  cy = height / 2; // 캔버스의 가운데 y 좌표
  amplitude = 100; // 진폭
  radius = width / 4; // 반지름
}

function draw() {
  background(220);
  
  // 단순조화운동 수식을 이용하여 위치 계산
  x = cx + cos(angle) * amplitude;
  y = cy + sin(angle) * amplitude;
  
  // 위치에 원 그리기
  ellipse(x, y, 20, 20);
  
  // 각도 증가 (주기에 따른 속도 조절 가능)
  angle += 0.05;
}
