// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize */

let dots, img, rectangle, gameOver;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  //colorMode(HSB, 360, 100, 100);
  gameOver = false;
  img = loadImage(
    "https://cdn.glitch.com/16bc1525-80a1-43db-9e14-53453e1912af%2Fbubble.png?v=1594923427028"
  );
  dots = [];
  for (let j = 0; j < 100; j++) {
    dots.push(new BouncyDot());
  }
}

function draw() {
  background(0);
  if (!gameOver) {
    textSize(30);
    fill(255);
    text(
      "Each mouse click will pop a random bubble! Try to get rid of all the bubbles!!", 0,60
    );
    fill(255);
    rectangle = rect(mouseX, mouseY, 10, 10);
    for (let i = 0; i < dots.length; i++) {
      dots[i].float();
      dots[i].display();
    }
    if (dots.length === 0) {
      gameOver = true;
     
    }
  }
  if (gameOver){
     fill(255);
      textSize(30);
      text("YOU DID IT!", 0, 60)
  } 
  
}

function mousePressed() {
  dots.pop();
}

class BouncyDot {
  constructor() {
    // Randomly generate position
    this.x = random(width);
    this.y = height;
    // Randomly generate radius
    //this.r = random(5, 12);
    this.width = 50;
    this.height = 50;
    // Randomly generate color
    this.color = color(random(360), 80, 70);
    // Randomly generate a master velocity (broken into components)...
    this.masterXvelocity = random(0.5, 3);
    this.masterYvelocity = random(0.5, 3);
    // ...and use those as starting velocities.
    this.xVelocity = this.masterXvelocity;
    this.yVelocity = this.masterYvelocity;
  }

  float() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    // Standard bounce code - like the DVD logo, but for spheres.
    if (this.x > width) {
      this.xVelocity = -1 * this.masterXvelocity;
    }
    if (this.x < 0) {
      this.xVelocity = this.masterXvelocity;
    }
    if (this.y > height) {
      this.yVelocity = -1 * this.masterYvelocity;
    }
    if (this.y < 0) {
      
      this.y= height;
    }
  }

  display() {
    //fill(this.color);
    //noStroke();
    image(img, this.x, this.y, this.width, this.height);
    //ellipse(this.x, this.y, this.r * 2);
  }
}
