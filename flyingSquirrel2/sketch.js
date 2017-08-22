var bg;
var squrriel;
var obsticals = [];
var flyingObsticals = [];
var myRand = 15;
// var song;
// var maxHoleSize = 0;
// var minHoleSize = 100.0;

var maxHoleSize = 200;
var spd = 0.0;

// function preload() {
// 	song = loadSound("sounds/Gianni.mp3");
// }
function setup() {
	// song.play();
	// song.setVolume(0.5);
	squrriel = new Squrriel(); 
	bg = loadImage("images/background3.png");
    createCanvas(window.innerWidth, window.innerHeight);
    obsticals.push(new Obstical(maxHoleSize, spd));
    flyingObsticals.push(new Obstical2(Math.floor((Math.random() * myRand)),spd));
}

function draw() {
	background(bg);
	squrriel.update();
	squrriel.show();

	if(frameCount % 60 == 0) {
		obsticals.push(new Obstical(maxHoleSize, spd));
		flyingObsticals.push(new Obstical2(Math.floor((Math.random() * myRand)),spd));
	}


	for(var i = obsticals.length - 1 ; i >= 0; i--) {
		// if(Math.floor((Math.random() * 2)) < 1) {
		// 	obsticals[i].show();
		// }
		obsticals[i].show();
		obsticals[i].update();
		
		if(obsticals[i].offScreen()) {
			obsticals.splice(i, 1);
			if(spd < 12.0) {
				spd += 0.15;
			}
			if(maxHoleSize > 0) {
				maxHoleSize -= 2;
			}
		}
		if(flyingObsticals[i] != null) {
			flyingObsticals[i].show1();
			flyingObsticals[i].update();
			if(flyingObsticals[i].offScreen()) {
			flyingObsticals.splice(i,1);
			if(myRand > 12) {
				myRand -= 1;
			}
			
		}
		}
		
	}
	if(keyIsDown(32)) {
		squrriel.glide();
	}



  // if (mouseIsPressed) {
  //   fill(0);
  // } else {
  //   fill(255);
  // }
  // ellipse(mouseX, mouseY, 80, 80);
}

function keyPressed() {
	if(key == ' ') {
		squrriel.up();
		//console.log("space");
	}
}

