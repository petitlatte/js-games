////////////////////////////////////EMPTY VARIABLES////////////////////////////////////////////
var gamePiece;
var obstacles = [];
var score;	


//////////////////////////////////////FUNCTIONS///////////////////////////////////////////////

	function startGame(){
				gamePiece = new component(30,30,"img/heart.png",10,120, "image");
				gamePiece.gravity = 0.05;
				score = new component("28px", "Consolas", "red", 280, 40, "text");
				gameCanvas.start();
	}


	//Game Canvas
	var gameCanvas = {
		canvas : document.createElement("canvas"),
		start : function() {
			this.canvas.width = 480;
			this.canvas.height = 270;
			this.context = this.canvas.getContext("2d");
			document.body.insertBefore(this.canvas, document.body.childNodes[0]);
			this.frameNo = 0;
			updateGameArea();
		},
		clear: function(){
			this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
		}
	}

	//gamepiece component
	function component(width,height,color,x,y,type){
		this.type =type;
		if (type == "image"){
			this.image = new Image();
			this.image.src = color;
		}
		this.score = 0;
		this.width = width;
		this.height = height;
		this.speedX = 0;
		this.speedY = 0;		
		this.x = x;
  		this.y = y;
		this.gravity = 0;
		this.gravitySpeed = 0;
		this.update = function(){
		ctx = gameCanvas.context;

		if (type == "image"){
			ctx.drawImage(this.image,
				this.x,
				this.y,
				this.width, this.height);
		} else 
			if (this.type == "text"){
			ctx.font = this.width + " " + this.height;
			ctx.fillStyle = color;
			ctx.fillText(this.text, this.x,this.y);
		} 

		else {
		ctx.fillStyle = color;
		ctx.fillRect(this.x,this.y,this.width,this.height);
		}
}

  this.newPos = function() {
  	this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY + this.gravitySpeed;
    this.hitBottom();
  }
  this.hitBottom = function(){
  	var rockbottom = gameCanvas.canvas.height - this.height;
  	if (this.y > rockbottom) {
  		this.y = rockbottom;
  		this.gravitySpeed = 0;
  	}
  }

		this.crashWith = function(otherobj) {
			var myLeft = this.x;
			var myRight = this.x + (this.width);
			var myTop = this.y;
			var myBottom = this.y + (this.height);
			var otherLeft = otherobj.x;
			var otherRight = otherobj.x + (otherobj.width);
			var otherTop = otherobj.y;
			var otherBottom = otherobj.y + (otherobj.height);
			var crash = true;
			if ((myBottom < otherTop) || (myTop > otherBottom) ||(myRight < otherLeft) || (myLeft > otherRight)) {
				crash = false;
		}
		return crash;
	}
}	

	//update game area
	function updateGameArea(){
		var x, height, gap, minHeight, maxHeight, minGap,maxGap;
		for (i = 0; i < obstacles.length; i += 1) {
			if (gamePiece.crashWith(obstacles[i])) {
			return;
		}
} 
		gameCanvas.clear();
		gameCanvas.frameNo += 1;
		if (gameCanvas.frameNo == 1 || everyinterval(150)) {
			x = gameCanvas.canvas.width;
			minHeight = 20,
			maxHeight = 200;
			height = Math.floor(Math.random()*(maxHeight-minHeight+1) + minHeight);
			minGap = 50;
			maxGap = 200;
			gap = Math.floor(Math.random()* (maxGap - minGap + 1) + minGap);

			obstacles.push (new component(10, height, "white",x,0));
			obstacles.push (new component(10, x- height - gap, "white",x,height + gap));
		}
		for (i = 0; i < obstacles.length; i += 1) {
			obstacles[i].x += -1;
		obstacles[i].update();
		}				
		score.text = "SCORE: " + gameCanvas.frameNo;
		score.update();	
		gamePiece.newPos();
		gamePiece.update();	
	}


	function everyinterval(n){
		if((gameCanvas.frameNo/ n) % 1 == 0){return true;}
		return false;
	}
	
	function accelerate(n){
		if(!gameCanvas.interval){gameCanvas.interval = setInterval(updateGameArea,20);}
		gamePiece.gravity = n;
	}


////////////////////////////////////////////////////END//////////////////////////////////////////////////