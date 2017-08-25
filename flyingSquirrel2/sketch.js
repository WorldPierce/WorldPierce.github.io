var bg;
var squrriel;
var obsticals = [];
var flyingObsticals = [];
var myRand = 15;
var song;
// var maxHoleSize = 0;
var minHoleSize = 100.0;
var logo;
var maxHoleSize = 250;
var spd = 0.0;
var doDraw;
var newGame = true;


function preload() {
	song = loadSound("sounds/Gianni.mp3");
}
function setup() {
	var button = createButton("reset");
	button.mousePressed(resetSketch);
	createCanvas(1000, 525);
	song.play();
	song.setVolume(0.5);
	//song.addCue(0.10, setUpBg);
	song.addCue(1.00, resetSketch);
	bg = loadImage("images/background3.png");
	logo = new Logo();


	//resetSketch();
}

function setUpBg() {
	bg = loadImage("images/background3.png");
	logo = new Logo();
}

function resetSketch() {
	frameCount = 0;
	doDraw = true;
	obsticals.length = 0;
	flyingObsticals = [];
	myRand = 15;
	newGame = true;

// var maxHoleSize = 0;
	minHoleSize = 100.0;
	//logo;
	maxHoleSize = 250;
	spd = 0.0;
	
	squrriel = new Squrriel(); 
	
    
    obsticals.push(new Obstical((Math.random() * maxHoleSize) + minHoleSize, spd));
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

		if(!newGame && frameCount % 75 == 0) {
			obsticals.push(new Obstical((Math.random() * maxHoleSize) + minHoleSize, spd));
			flyingObsticals.push(new Obstical2(Math.floor((Math.random() * myRand)),spd));
		}


		for(var i = obsticals.length - 1 ; i >= 0; i--) {
			// if(Math.floor((Math.random() * 2)) < 1) {
			// 	obsticals[i].show();
			// }
			obsticals[i].show();
			obsticals[i].update();

			if(obsticals[i].hits(squrriel)){
				//console.log("IHT");
				doDraw = false;
			}
			
			if(obsticals[i].offScreen()) {
				obsticals.splice(i, 1);
				if(spd < 12.0) {
					spd += 0.15;
				}
				if(maxHoleSize > 0) {
					maxHoleSize -= 2;
				}
				if(minHoleSize > 55) {
					minHoleSize -= 2;
				}
			}
			if(flyingObsticals[i] != null) {
				flyingObsticals[i].show1();
				flyingObsticals[i].update();
				if(flyingObsticals[i].hits(squrriel)){
					//console.log("IHT");
					console.log("hit");
					if(flyingObsticals[i].isNut) {
						//flyingObsticals[i].clear();


					} else {
						doDraw = false;
					}
					
				}
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
		newGame = false;
		//console.log("space");
	}
	if(key == 80) {
		console.log('p');
		if(song.isPlaying()){
			song.pause();
		}
		else {
			song.play();
		}
	}
	if(key == 13 && doDraw == false) {
		doDraw = true;
	}
}

