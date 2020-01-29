//IFFE
(function() {
	
////////////////////////////////////////////////////////////////////

	//Empty Variables 
	var player1;			//control character
	var obstacles = [];		// the map obstacle
	var score;				// game score

////////////////////////////////////////////////////////////////////

	//Game Start Function
	
	function startGameFunction(){
				player1 = new.component(40,40,"blue", 10,120);
				player1.gravity = 0.05;
				score = ("30px", "MS Comic Sans", "Red", 280, 40, "text");
				gameCanvas.start();
	}

	//Game Canvas
	var gameCanvas = {
		canvas : document.createElement("canvas"),

		//continue from here
	}












})();

//END OF IFFE