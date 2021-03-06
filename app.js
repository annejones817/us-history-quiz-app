$(document).ready(function(){
	//Object to store quiz data
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
		
	//Set all tracker variables to the correct "start of game" value	
	function resetQuizTrackers() {
		quiz.questionCounter = 0;
		quiz.questionChoicesCounter = 0;
		quiz.progressCounter=1;
		quiz.currentAnswer;
		quiz.numCorrect = 0;
		quiz.numIncorrect = 0;
	}	

	//Handle Question Transition
	function handleQuestionTransition() {
		$('.quiz-questions-area, .submit-answer').removeClass('hidden');		
		displayQuestion(quiz, $('.quiz-questions-area'));
		displayChoices(quiz, $('.answer-choices'));
		updateProgress(quiz, $('.progress'));
	}
		

	//Display Question
	function displayQuestion(quiz, element) {
		element.prepend("<span class='question'>" + quiz.questionAnswer[quiz.questionCounter].question + "</span>");
	}	

	//Display Choices
	function displayChoices(quiz, element) {
	for (var i=0; i<quiz.questionAnswer[quiz.questionChoicesCounter].choices.length; i++) {
		element.append("<span class='answer-choice'><input name='answer-choice' value='"
			+quiz.questionAnswer[quiz.questionChoicesCounter].choices[i]
			+"' type='radio' class='answer-choice-input' id='a" 
			+ i 
			+ "'> <label class='answer-choice-label' for='a" + i + "'>" 
			+ quiz.questionAnswer[quiz.questionChoicesCounter].choices[i] 
			+ "</label></span>" )
		}
	};

	//Update Progress 
	function updateProgress(quiz, element) {
		element.append("<span class='progress-details'>You are on question " + quiz.progressCounter + " of " + 
			quiz.questionAnswer.length + ". <br><br> Current Score: " + quiz.numCorrect + 
			" correct, " + quiz.numIncorrect + " incorrect</span>");
	}

	//Remove Question
	function removeQuestion(quiz, element) {
		element.remove('.question');
	}

	//Remove Choices
	function removeChoices(quiz, element) {
		element.remove('.answer-choice');
	}

	//Check Answer
	function checkAnswer(quiz, currentAnswer) {
		$('.answer-explanation').removeClass('hidden');
		$('.explanation').remove();
		if (currentAnswer == quiz.questionAnswer[quiz.questionCounter].answer) {
			$('.answer-explanation').prepend(
				"<p class='explanation'>Good job! " + currentAnswer 
				+ " is correct. </p>"
				);
			quiz.numCorrect++;			
		} else {
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
	



////////Event Listeners//////////////////
	///////Start Quiz
	$('.start-quiz-form').submit(function(event){
		event.preventDefault(); 
		resetQuizTrackers();
		$(this).closest('div').remove(); 
		handleQuestionTransition();
	});

	//Record answer selected by user
	$('.answer-choices').on('click', '.answer-choice-input', function(event) {
		quiz.currentAnswer = $('input[name=answer-choice]:checked').val();
	});

	///Handle question submit & check accuracy
	$('.quiz-questions-area').submit(function(event){
		event.preventDefault();
		var answerLength = $('.answer-choices').find(':radio:checked').length;
		if (answerLength>0) { 
			$('.require-answer').remove();
			$('.question').remove();
			$('.answer-choice').remove();
			$('.submit-answer').addClass('hidden');
			$('.progress-details').remove();
			quiz.progressCounter++;
			checkAnswer(quiz, quiz.currentAnswer);
		} else {
			$('form').prepend('<span class="require-answer">Please select an answer.</span>');
		}
	});

	//Transition from explanation to next question & handle end of quiz
	$('.next').click(function(event){
		$(this).closest('div').addClass('hidden'); 
		if (quiz.questionCounter===10) {
			$('.quiz-contents').append(
				"<div class='end-card'><h2>Congratulations! You finished the quiz.</h2> <h3>Your Score: "
				+ quiz.numCorrect + "/10</h3>" +
				"<button type='click' class='try-again'>Try Again</button></div>"
				);
		} else {
			handleQuestionTransition();
		}
	});

	//Try Again
	$('.quiz-contents').on('click', '.try-again', function(event){
		$('.end-card').remove();
		resetQuizTrackers();
		handleQuestionTransition();

	});
});