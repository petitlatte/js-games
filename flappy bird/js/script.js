////////////////////////////////////EMPTY VARIABLES////////////////////////////////////////////
var gamePiece;
var obstacles;	


//////////////////////////////////////FUNCTIONS///////////////////////////////////////////////

	function startGame(){
				gamePiece = new component(30,30,"teal",10,120);
				obstacles = new component(10, 200, "red", 300,120);
				gameCanvas.start();
	}


	//Game Canvas
	var gameCanvas = {
		canvas : document.createElement("canvas"),
		start : function() {
			this.canvas.width = 800;
			this.canvas.height = 600;
			this.context = this.canvas.getContext("2d");
			document.body.insertBefore(this.canvas, document.body.childNodes[0]);
			this.interval = setInterval(updateGameArea, 20);
			window.addEventListener("keydown",function(e){
				gameCanvas.key =e.keyCode;
			});
			window.addEventListener("keyup",function(e){
				gameCanvas.key = false;
			});

		},
		clear: function(){
			this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
		},
		stop: function(){
			clearInterval(this.interval);
		}
	};

	//gamepiece component
	function component(width,height,color,x,y){
		this.width= width;
		this.height = height;
		this.x = x;
  		this.y = y;
		this.speedX = 0;
		this.speedY = 0;
		this.update = function(){
		ctx = gameCanvas.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x,this.y,this.width,this.height);
		}

  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

		this.crashWith = function(otherobj) {
			var myLeft = this.x;
			var myRight = this.x + (this.width);
			var myTop = this.y;
			var myBottom = this.y + (this.height);
			var otherLeft = otherobj.x; //error?
			var otherRight = otherobj.x + (otherobj.width);
			var otherTop = otherobj.y;
			var otherBottom = otherobj.y + (otherobj.height);
			var crash = true;
			if ((myBottom < otherTop) || (myTop > otherBottom) ||(myRight < otherLeft) || (myLeft > otherRight)) {
				crash = false;
		}
		return crash;
	};
}	

	//update game area
	function updateGameArea(){
		if (gamePiece.crashWith(obstacles)) {
			gameCanvas.stop();
		} else {
		gameCanvas.clear();
		obstacles.x += -1;		
		obstacles.update();
        gamePiece.x += gamePiece.speedX;
        gamePiece.y += gamePiece.speedY; 					
		gamePiece.newPos();
		gamePiece.update();	
	}
}

	function moveUp(){
		gamePiece.speedY -= 1;
	}

	function moveDown(){
		gamePiece.speedY += 1;
	}

	function moveLeft(){
		gamePiece.speedX -= 1;
	}

	function moveRight(){
		gamePiece.speedX += 1;
	}


////////////////////////////////////////////////////END//////////////////////////////////////////////////