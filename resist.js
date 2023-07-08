let x, y; // 현재 위치
let vx, vy; // 현재 속도
let cx, cy; // 진동중심 좌표
let amplitude; // 진폭
let angle = 0; // 각도 변수
let period = 2 * Math.PI; // 주기 (2π)
let radius; // 반지름
let dampingSlider; // 저항력 슬라이드 바

function setup() {
  createCanvas(400, 400);

  cx = width / 2; // 캔버스의 가운데 x 좌표
  cy = height / 2; // 캔버스의 가운데 y 좌표
  amplitude = 100; // 진폭
  radius = width / 4; // 반지름

  // 저항력 슬라이드 바 생성
  dampingSlider = createSlider(0, 1, 0.05, 0.01);
  dampingSlider.position(10, 10);
}

function draw() {
  background(220);

  // 저항력 값 가져오기
  let damping = dampingSlider.value();

  // 단순조화운동 수식을 이용하여 위치 및 속도 계산
  let omega = sqrt(1 - damping * damping);
  x = cx + cos(omega * angle) * amplitude * exp(-damping * angle);
  y = cy + sin(omega * angle) * amplitude * exp(-damping * angle);
  vx = -amplitude * damping * exp(-damping * angle) * (cos(omega * angle) * omega + sin(omega * angle));
  vy = amplitude * damping * exp(-damping * angle) * (sin(omega * angle) * omega - cos(omega * angle));

  // 위치에 원 그리기
  ellipse(x, y, 20, 20);

  // 속도 벡터 그리기
  drawVelocityVector();

  // 각도 증가 (주기에 따른 속도 조절 가능)
  angle += 0.05;
}

function drawVelocityVector() {
  // 속도 벡터 그리기
  let scale = 10; // 벡터 길이 배율
  let arrowSize = 5; // 화살표 크기

  let endX = x + vx * scale;
  let endY = y + vy * scale;

  stroke(255, 0, 0); // 빨간색으로 설정
  strokeWeight(2); // 선 두께
  line(x, y, endX, endY);

  push();
  translate(endX, endY);
  rotate(atan2(vy, vx));
  fill(255, 0, 0); // 빨간색으로 설정
  noStroke();
  triangle(-arrowSize, arrowSize / 2, -arrowSize, -arrowSize / 2, 0, 0);
  pop();
}
