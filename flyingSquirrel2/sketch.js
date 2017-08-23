var bg;
var squrriel;
var obsticals = [];
var flyingObsticals = [];
var myRand = 15;
var song;
// var maxHoleSize = 0;
// var minHoleSize = 100.0;
var logo;
var maxHoleSize = 200;
var spd = 0.0;
var doDraw = false;


function preload() {
	song = loadSound("sounds/Gianni.mp3");
}
function setup() {
	song.play();
	song.setVolume(0.5);
	song.addCue(1.00, play);
	squrriel = new Squrriel(); 
	bg = loadImage("images/background3.png");
	logo = new Logo();
    createCanvas(window.innerWidth, window.innerHeight);
    obsticals.push(new Obstical(maxHoleSize, spd));
    flyingObsticals.push(new Obstical2(Math.floor((Math.random() * myRand)),spd));
}

function draw() {
	background(bg);
	logo.show();
	//image(logo, width/2 - 500, height/2 - 170, 896, 176);
	if(doDraw){
		logo.update();
		squrriel.update();
		squrriel.show();

		if(frameCount > 120 && frameCount % 60 == 0) {
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
				if(maxHoleSize > 50) {
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
	}
}

function play() {
	doDraw = true;
	//logo.hide();
}

function keyPressed() {
	if(key == ' ') {
		squrriel.up();
		//console.log("space");
	}
}

