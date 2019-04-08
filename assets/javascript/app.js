$(document).ready(function() {
    console.log( "ready!" );

    var questionCounter = 0;
    var time = 15;
    var correctGuesses = 0;
    var incorrectGuesses = 0;

    var questions = [
      {
	    question: "How many songs are on the Thank U, Next track list?",
	    choices: ["10", "12", "13", "15"],
	    correctAnswer: "12",
	    image: "<img src='assets/images/ari10.JPG' class='img-circle shadow'>"
	  }, 
	  {
	    question: "Which of the following songs did NOT hit #1 on the billboards hot 100?",
	    choices: ["thank u, next", "7 rings", "break up with your girlfriend", "NASA"],
	    correctAnswer: "NASA",
	    image: "<img src='assets/images/ari2.JPG' class='img-circle shadow'>"
	  },
	  {
	    question: "Which of the following was NOT a movie featured in the thank u, next music video?",
	    choices: ["Legally Blonde", "The Notebook", "13 Going on 30", "Mean Girls"],
	    correctAnswer: "The Notebook",
	    image: "<img src='assets/images/ari.jpg' class='img-circle shadow'>"
	  },
	  {
	    question: "Which song contains the lyrics 'I see it, I like it, I want it, I got it' ?",
	    choices: ["7 rings", "fake smile", "in my head", "bad idea"],
	    correctAnswer: "7 rings",
	    image: "<img src='assets/images/ari4.JPG' class='img-circle shadow'>"
	  },
	  {
	    question: "Which song is the longest on the thank u, next album?",
	    choices: ["ghostin", "bad idea", "bloodline", "thank u, next"],
	    correctAnswer: "ghostin",
	    image: "<img src='assets/images/ari5.JPG' class='img-circle shadow'>"
	  }];
	  

	function questionContent() {
		$("#gameScreen").append("<p><strong>" + 
    		questions[questionCounter].question + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[0] + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[1] + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[2] + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[3] + 
    		"</strong></p>");
	}

	function userWin() {
		$("#gameScreen").html("<p>THANK U, NEXT QUEEN!</p>");
		correctGuesses++;
		var correctAnswer = questions[questionCounter].correctAnswer;
		$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
			correctAnswer + 
			"</span></p>" + 
			questions[questionCounter].image);
		setTimeout(nextQuestion, 2000);
		questionCounter++;
	}

	function userLoss() {
		$("#gameScreen").html("<p>Ooh, that answer was a BAD IDEA!</p>");
		incorrectGuesses++;
		var correctAnswer = questions[questionCounter].correctAnswer;
		$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
			correctAnswer + 
			"</span></p>" + 
			questions[questionCounter].image);
		setTimeout(nextQuestion, 4000);
		questionCounter++;
	}

	function userTimeout() {
		if (time === 0) {
			$("#gameScreen").html("<p>Can you IMAGINE that time ran out?!</p>");
			incorrectGuesses++;
			var correctAnswer = questions[questionCounter].correctAnswer;
			$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
				correctAnswer + 
				"</span></p>" + 
				questions[questionCounter].image);
			setTimeout(nextQuestion, 2000);
			questionCounter++;
		}
    }
    
   

	function resultsScreen() {
		if (correctGuesses === questions.length) {
			var endMessage = "You see it, You like it, You want it, You got it! Awesome job!!";
		}
		else if (correctGuesses > incorrectGuesses) {
			var endMessage = "There's no need to apologize, but you could definitely do better!";
		}
		else {
			var endMessage = "F*ck a fake smile, you're taking an L on this one honey.";
		}
		$("#gameScreen").html("<p>" + endMessage + "</p>" + "<p>You got <strong>" + 
			correctGuesses + "</strong> right.</p>" + 
			"<p>You got <strong>" + incorrectGuesses + "</strong> wrong.</p>");
		$("#gameScreen").append("<h1 id='start'>Play Again!</h1>");
        
        var bottomText = "Play Again";
        $("#bottomText").html(bottomText);
        
        gameReset();
        $("#start").click(nextQuestion);
	}

	function timer() {
		clock = setInterval(countDown, 1000);
		function countDown() {
			if (time < 1) {
				clearInterval(clock);
				userTimeout();
			}
			if (time > 0) {
				time--;
			}
			$("#timer").html("<strong>" + time + "</strong>");
		}
	}

	function nextQuestion() {
		if (questionCounter < questions.length) {
			time = 15;
			$("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
			questionContent();
			timer();
			userTimeout();
		}
		else {
			resultsScreen();
		}
	console.log(questionCounter);
	console.log(questions[questionCounter].correctAnswer);
    }

	function gameReset() {
		questionCounter = 0;
		correctGuesses = 0;
		incorrectGuesses = 0;
	}

    function startGame() {
    	$("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
    	$("#start").hide();
    	$("#gameScreen").append("<div id='question'>");
    	var nextQuestion = questionContent(questionCounter);
    	$("#gameScreen").append(nextQuestion);

		$("#gameScreen").append("<p>" + questions[questionCounter].question + "</p><p>" + questions[questionCounter].choices[0] + "</p><p>" + questions[questionCounter].choices[1] + "</p><p>" + questions[questionCounter].choices[2] + "</p><p>" + questions[questionCounter].choices[3] + "</p>");
		    questionCounter++;
		questionContent();
    	timer();
    	userTimeout();
    }

    $("#start").click(nextQuestion);

	$("#gameScreen").on("click", ".choices", (function() {
		
		var userGuess = $(this).text();
		if (userGuess === questions[questionCounter].correctAnswer) {
			clearInterval(clock);
			userWin();
		}
		else {
			clearInterval(clock);
			userLoss();
		}
	}));
});