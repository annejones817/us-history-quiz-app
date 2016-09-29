$(document).ready(function(){
	//State Object
	var quiz = {
		questionAnswer: [ ]
		};
		quiz.questionAnswer = [
			 {question: 'In what year did America declare independence from Britain?', 
			  choices: [1780, 1776, 1795, 1778],
			  answer: 1776},

			 {question: 'Who was the third president of the United States?', 
			  choices: ['James Madison', 'John Quincy Adams', 'John Adams', 'Thomas Jefferson'],
			  answer: 'Thomas Jefferson'},

			 {question: 'When did the Great Depression start? ', 
			 choices: ['October 29, 1929', 'January 15, 1930', 'November 1, 1928', 'April 4, 1929'],
			 answer: 'October 29, 1929'},

			 {question: 'Who is the only US president to serve more than two terms?',
			 choices: ['Theodore Roosevelt', 'George Washington', 'Calvin Coolidge', 'Franklin D. Roosevelt'],
			 answer: 'Franklin D. Roosevelt'},

			 {question: 'When was the U.S. Constitution ratified?', 
			 choices: ['July 4, 1776', 'June 21, 1788', 'January 1, 1777', 'May 13, 1779'],
			 answer: 'June 21, 1788'},

			 {question: 'Who assassinated President Lincoln?', 
			 choices: ['Al Capone', 'Michael Smith', 'John Wilkes Booth', 'Thomas Johnson'],
			 answer: 'John Wilkes Booth'},

			 {question: 'What was the first state in the United States?', 
			 choices: ['Pennsylvania', 'Delaware', 'New Jersey', 'Georgia'],
			 answer: 'Delaware'},

			 {question: 'What is "the date that will live in infamy"?', 
			 choices: ['Attacks on Pearl Harbor: December 7, 1941', 'D-Day: June 6, 1944', 'Black Tuesday: October 29, 1929', 'U.S. Entry Into World War 1: April 2, 1917'],
			 answer: 'Attacks on Pearl Harbor: December 7, 1941'},

			 {question: 'When did the Civil War end?', 
			 choices: [1862, 1868, 1865, 1870],
			 answer: 1865},

			 {question: 'How many original colonies were there?', 
			 choices: [8,10,13,15],
			 answer: 13},
		];
		quiz.questionCounter = 0;
		quiz.questionChoicesCounter = 0;
		quiz.progressCounter=1;
		quiz.currentAnswer;
		quiz.numCorrect = 0;
		quiz.numIncorrect = 0;


	//Display Question
	var displayQuestion = function(quiz, element) {
		if (quiz.questionCounter===10) {
			$('.submit-answer').remove();
			element.remove();
			$('.quiz-contents').append(
				"<div class='end-card'><h2>Congratulations! You finished the quiz.</h2> <h3>Your Score: "
				+ quiz.numCorrect + "/10</h3>" +
				"<button type='click' class='try-again'>Try Again</button></div>"
				);
		}
		else {
		element.prepend("<dd class='question'>" + quiz.questionAnswer[quiz.questionCounter].question + "</dd>");
		}
		
	}	

	//Remove Question
	var removeQuestion = function(quiz, element) {
		element.remove('.question');
	}

	//Display Choices
		var displayChoices = function(quiz, element) {
		if (quiz.questionChoicesCounter===10) {
			element.remove();
		}
		else {
		for (var i=0; i<quiz.questionAnswer[quiz.questionChoicesCounter].choices.length; i++) {
		element.append("<span class='answer-choice'><input name='answer-choice' value='"
			+quiz.questionAnswer[quiz.questionChoicesCounter].choices[i]
			+"' type='radio' class='answer-choice-input' id='a" 
			+ i 
			+ "'> <label class='answer-choice-label' for='a" + i + "'>" 
			+ quiz.questionAnswer[quiz.questionChoicesCounter].choices[i] 
			+ "</label></span>" )
		}
	}
		
	};

	//Update Progress 
	var updateProgress = function(quiz, element) {
		element.append("<span class='progress-details'>You are on question " + quiz.progressCounter + " of " + 
			quiz.questionAnswer.length + ". <br><br> Current Score: " + quiz.numCorrect + 
			" correct, " + quiz.numIncorrect + " incorrect</span>");
	}

	//Remove Choices
	var removeChoices = function(quiz, element) {
		element.remove('.answer-choice');
	}

	//Require Answer

	//Check Answer
	var checkAnswer = function(quiz, currentAnswer) {
		$('.answer-explanation').removeClass('hidden');
		$('.explanation').remove();
		if (currentAnswer == quiz.questionAnswer[quiz.questionCounter].answer) {
			$('.answer-explanation').prepend(
				"<p class='explanation'>Good job! " + currentAnswer 
				+ " is correct. </p>"
				);
			quiz.numCorrect++;
			console.log(quiz.numCorrect);
			
		}
		else {
			$('.answer-explanation').prepend(
				"<p class='explanation'>Sorry, " + currentAnswer 
				+ " is not correct. The correct answer is " +
				quiz.questionAnswer[quiz.questionCounter].answer +"</p>"
				);
			quiz.numIncorrect++;
		}
		quiz.questionCounter += 1;
		quiz.questionChoicesCounter += 1;
	}
	
	//Handle Question Transition
	var handleQuestionTransition = function() {
		$('.quiz-questions-area, .submit-answer').removeClass('hidden');		
		displayQuestion(quiz, $('.quiz-questions-area'));
		displayChoices(quiz, $('.answer-choices'));
		updateProgress(quiz, $('.progress'));
	}


	//Event Listeners
	///////Start Quiz
	$('.start-quiz-button').click(function(event){
		event.preventDefault(); 
		$(this).closest('div').remove(); 
		handleQuestionTransition();
	});

	//Set Answer
	$('.answer-choices').on('click', '.answer-choice-input', function(event) {
		quiz.currentAnswer = $('input[name=answer-choice]:checked').val();
	});


	///Check Answer
	$('.quiz-questions-area').submit(function(event){
		event.preventDefault();
		$('.question').remove();
		$('.answer-choice').remove();
		$('.submit-answer').addClass('hidden');
		$('.progress-details').remove();
		quiz.progressCounter++;
		checkAnswer(quiz, quiz.currentAnswer);
	});

	//Next Question
	$('.next').click(function(event){
		$(this).closest('div').addClass('hidden'); 
		handleQuestionTransition();
	});

	//Try Again
	$('.quiz-contents').on('click', '.try-again', function(event){
		quiz.questionCounter = 0;
		quiz.questionChoicesCounter = 0;
		quiz.progressCounter=1;
		quiz.currentAnswer;
		quiz.numCorrect = 0;
		quiz.numIncorrect = 0;
		$('.end-card').remove();
		handleQuestionTransition();
	});

});