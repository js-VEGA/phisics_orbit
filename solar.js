let sun;
let planets = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  // 태양 객체 생성
  sun = new CelestialBody(50, color(255, 255, 0), 0, 0, 0);

  // 행성 객체 생성
  planets.push(new CelestialBody(10, color(0, 0, 255), 400, 0.02, random(TWO_PI), 2));
  planets.push(new CelestialBody(8, color(255, 0, 0), 600, 0.01, random(TWO_PI), 1.5));
  planets.push(new CelestialBody(6, color(0, 255, 0), 800, 0.007, random(TWO_PI), 1));
  planets.push(new CelestialBody(5, color(255, 0, 255), 1000, 0.005, random(TWO_PI), 0.8));
  planets.push(new CelestialBody(4, color(255, 165, 0), 1200, 0.004, random(TWO_PI), 0.6));
  planets.push(new CelestialBody(3, color(128, 128, 128), 1400, 0.003, random(TWO_PI), 0.4));
  planets.push(new CelestialBody(2, color(0, 255, 255), 1600, 0.002, random(TWO_PI), 0.3));
  planets.push(new CelestialBody(1, color(255, 255, 255), 1800, 0.001, random(TWO_PI), 0.2));

  // 행성 초기 각도 조정
  adjustPlanetAngles();

  // 행성 초기 궤도 반지름 조정
  adjustPlanetOrbitRadius();
}

function draw() {
  background(0);

  // 태양, 행성들의 위치 업데이트
  sun.update();
  for (let i = 0; i < planets.length; i++) {
    planets[i].update();
  }

  // 태양, 행성들 그리기
  sun.display();
  for (let i = 0; i < planets.length; i++) {
    planets[i].display();
  }
}

function adjustPlanetAngles() {
  for (let i = 0; i < planets.length; i++) {
    let angle = random(TWO_PI); // 랜덤한 각도 생성
    for (let j = 0; j < i; j++) {
      // 이전 행성들과의 충돌 검사
      while (abs(angle - planets[j].angle) < radians(30)) {
        angle = random(TWO_PI);
      }
    }
    planets[i].angle = angle; // 초기 각도 설정
  }
}

function adjustPlanetOrbitRadius() {
  let baseRadius = min(width, height) * 0.3; // 기준 반지름 설정
  for (let i = 0; i < planets.length; i++) {
    planets[i].orbitRadius = baseRadius + (i + 1) * 100; // 행성마다 다른 궤도 반지름 설정
  }
}

class CelestialBody {
  constructor(radius, color, orbitRadius, orbitSpeed, initialAngle, orbitRatio) {
    this.radius = radius;
    this.color = color;
    this.orbitRadius = orbitRadius;
    this.orbitSpeed = orbitSpeed;
    this.angle = initialAngle;
    this.position = createVector(0, 0);
    this.orbitPoints = [];
    this.numPoints = 360; // 궤도 포인트의 개수
    this.orbitRatio = orbitRatio; // 실제 거리와의 비율
  }

  update() {
    this.angle += this.orbitSpeed;

    let x = this.orbitRadius * this.orbitRatio * cos(this.angle);
    let y = this.orbitRadius * this.orbitRatio * sin(this.angle);
    this.position = createVector(x, y);

    // 궤도 포인트 업데이트
    this.orbitPoints.push(createVector(x, y));
    if (this.orbitPoints.length > this.numPoints) {
      this.orbitPoints.shift();
    }
  }

  display() {
    push();
    translate(width / 2, height / 2); // 좌표 원점을 캔버스의 가운데로 이동
    fill(this.color);
    noStroke();

    // 궤도 그리기
    stroke(this.color);
    noFill();
    beginShape();
    for (let i = 0; i < this.orbitPoints.length; i++) {
      vertex(this.orbitPoints[i].x, this.orbitPoints[i].y);
    }
    endShape();

    // 행성 그리기
    ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);

    pop();
  }
}
