let angle = 0; // 각도 변수
let amplitudeSlider; // 진폭 슬라이드 바
let periodSlider; // 주기 슬라이드 바

function setup() {
  createCanvas(400, 400);

  amplitudeSlider = createSlider(0, 100, 50, 1); // 진폭 슬라이드 바
  amplitudeSlider.position(10, 10);

  periodSlider = createSlider(0, 2 * Math.PI, Math.PI, 0.1); // 주기 슬라이드 바
  periodSlider.position(10, 30);
}

function draw() {
  background(220);

  let amplitude = amplitudeSlider.value(); // 진폭 값 가져오기
  let period = periodSlider.value(); // 주기 값 가져오기

  let x = width / 2 + amplitude * cos(angle);
  let y = height / 2 + amplitude * sin(angle);

  // 진자 그리기
  fill(0);
  ellipse(x, y, 20, 20);

  // 시간 증가
  angle += period;

  // 속도 벡터 그리기
  drawVelocityVector(x, y, amplitude);
}

function drawVelocityVector(x, y, amplitude) {
  // 속도 벡터 그리기
  let scale = 10; // 벡터 길이 배율
  let arrowSize = 5; // 화살표 크기

  let endX = x + amplitude * cos(angle) * scale;
  let endY = y + amplitude * sin(angle) * scale;

  stroke(255, 0, 0); // 빨간색으로 설정
  strokeWeight(2); // 선 두께
  line(x, y, endX, endY);

  push();
  translate(endX, endY);
  rotate(atan2(endY - y, endX - x));
  fill(255, 0, 0); // 빨간색으로 설정
  noStroke();
  triangle(-arrowSize, arrowSize / 2, -arrowSize, -arrowSize / 2, 0, 0);
  pop();
}
