function Logo() {
	this.x = 110;
	this.speed = 5;
	this.img = loadImage("images/logo.png");;


	this.show = function() {
		image(this.img, this.x, height/2 - 170, 896, 176);
	}

	this.update = function() {
		this.x -= this.speed;
	}

	this.offScreen = function() {
		return (this.x < -this.w);
		// if(this.x < -w) {
		// 	return true;
		// } else {
		// 	return false;
		// }
	}
}