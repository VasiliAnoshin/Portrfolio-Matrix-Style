$(document).ready(function() {

	let $terminal = $('#terminal');
	let historyDisplayedIndex = -1;
	let lastDisplayedIndex = -1;
	let arrowNavigationMode = false;
	let termHistory = [];

	let wakeUp = "Wake up, Neo...",
	about = 'My name is Vasili - i am software developer, tech enthusiast and code wizard. Passionate about tech-puzzles, competiteve games and books',
	listCommands = 'Available commands: [about] [bio] [clear] [contact] [skills] [social] [portfolio] [quote]',
	commandNotFound = 'Command not found. Don\'t worry, it\'s probably just a glitch in the Matrix. Gli Glitch in the Matrix trix.',
	skills = "Main: .Net, C#, Linq, Entity, SQL+PostGree, Java, Python (Flask), HTML, CSS, JavaScript, React+Redux, GIT.\n"
		   + "Familiar with: AWS Management, SQL-Server+PostGre management.",
	contact = "Contact me on LinkedIn -> ";
	let shortBio = 'B.Sc., Computer Science. Passionate software developer with several years of experience developing web applications + trading strategies.'
				 + 'Excelent knowledge of OOP and relational databases. Experience in refactoring, design patterns and process automation. Agile believer.'
				 + 'Speaks English, Hebrew and Russian.';
	let typeSpeedSuperFast = 30;
	let typeSpeedSlow = 75;
	let typeSpeedFast = 60; // in ms
	list = "For a list of available commands, type 'help'";

	let quotes = [
		"There is no spoon.",
		"Follow the white rabbit.",
		"Don't think you are, know you are.",
		"There's a difference between knowing the path and walking the path.",
		"Free your mind",
		"I can only show you the door. You're the one that has to walk through it.",
		"The time has come to make a choice.",
		"Choi: \"It just sounds to me like you need to unplug, man.",
		"You've been living in a dream world, Neo.",
		"What is \"real\"? How do you define \"real\"?",
		"Welcome to the real world.",
		"Because you have been down there Neo, you know that road, you know exactly where it ends. And I know that's not where you want to be.",
		"A déjà vu is usually a glitch in the Matrix. It happens when they change something.",
		"Do you believe that my being stronger or faster has anything to do with my muscles in this place? Do you think that's air you're breathing now?",
		"Neo: I know kung fu. \nMorpheus: [eyeing him, hand on chin] Show me.",
		"Trinity: Neo... nobody has ever done this before. \nNeo: That's why it's going to work.",
		"Neo: I thought it wasn't real. \nMorpheus: Your mind makes it real.",
		"The answer is out there, Neo, and it's looking for you, and it will find you if you want it to.",
		"So what do you need? Besides a miracle.",
		"I can only show you the door. You're the one that has to walk through it.",
		"Morpheus: [to Neo who is choosing the red pill] Remember... all I'm offering is the truth. Nothing more."
	];

	var autotype = function(el, text, i, interval) {
		if (i < text.length) {
			$(el).append(text[i++]);
			setTimeout(function () { autotype(el, text, i, interval); }, interval);
		}
		return $(el);
	};

	function clearTerminal() {
		$('.term-output').remove();
	}

	function addHTMLToTerminal(html) {
		let $el = $('<p class="term-output"></p>').append(html).appendTo($terminal);
	}

	function addToTerminal(text, speed, isAutotype) {
		let $el = $('<p class="term-output"></p>').text('> ').appendTo($terminal);

		if (isAutotype) {
			autotype($el, text, 0, speed);
		} else {
			$el.append(text);
		}

		return $el;
	}

	var handleInput = function() {
		let value = $('#term-prompt').val();
		console.log("***" + typeof value);
		switch (value.toLowerCase()) {
			case 'about':
			    addToTerminal(about, typeSpeedFast, false);
				break;
			case 'bio':
				addToTerminal(shortBio, typeSpeedFast, false);
				break;
			case 'clear':
				clearTerminal();
				addToTerminal(list, typeSpeedFast, true);
				break;
			case 'contact':
				addHTMLToTerminal(generateContactHtml);
				break;
			case "help":
				addToTerminal(listCommands, typeSpeedFast, false);
				break;
			case "list":
				break;
			case 'skills':
				addToTerminal(skills, typeSpeedFast, false);
				break;
			case 'social':
				// optimize this code and the code below - maybe in a function
				let socialHTML = generateContactHTML();
				let socialEl = addHTMLToTerminal(socialHTML);
				break;
			case 'portfolio':
				let portfolioHTML = generatePortfolioHTML();
				addHTMLToTerminal(portfolioHTML);
				break;
			case 'quote':
				addToTerminal(getRandomQuote(), typeSpeedFast, false);
				break;
			case '':
				break;
			default:
				console.log("I don't understand, please choose between these options:");
				addToTerminal(commandNotFound, typeSpeedSuperFast, true);
				addToTerminal(listCommands, typeSpeedFast, false);
				setTimeout(function() {
				}, 4000);
		}
	}

	$('body').on('click', function() {
		$('#term-prompt').focus();
	});

	$('#term-prompt').on('click', function() {
		$('#term-prompt').focus();
	});

	$(".expand").on("click", function() {
		$(".learn").delay(100).hide();
		$("#short-bio").delay(200).show();

		autotype('#short-bio', shortBio, 0, typeSpeedFast / 2);

		$("#online-presence").delay(300).show();
		$("#abilities").show();
	});

	$('#term-prompt').on("keydown", function(e) {
		console.log("The button you're currently pressing has a code of " + e.which);
		let keyEnter = 13, keyArrowDown = 40, keyArrowUp = 38;
		switch(e.which)
		{
			case keyEnter:
				enterClick();
				break;
			case keyArrowDown:
				arrowDownClick(); 
				break;
			case keyArrowUp:
				arrowUpClick();
				break;
		}
	})

	function getRandomQuote() {
		var randomIndex = Math.round(Math.random() * (quotes.length-1));
		console.log("Random index generated is " + randomIndex);
		return quotes[randomIndex];
	}

	function generateContactHTML() {
		let contact = $('<ul id="abilities"></ul>');

		let interviewBit = $('<li></li>');
		let facebook = $('<li></li>');
		let goodreads = $('<li></li>');

		let twitterLink = $('<a>GoodReads</a>').attr({
			'href': 'https://www.goodreads.com/review/list/105295352',
			'target': '_blank'
		});

		let ivb = $('<a>InterviewBit</a>').attr({
			'href': 'https://www.interviewbit.com/profile/vasili-anoshin',
			'target': '_blank'
		});

		let fbLink = $('<a>Facebook</a>').attr({
			'href': 'https://www.facebook.com/vasili.anoshin',
			'target': '_blank'
		})

		interviewBit.append(ivb);
		facebook.append(fbLink);
		goodreads.append(twitterLink);

		contact.append(interviewBit);
		contact.append(facebook);
		contact.append(goodreads);

		console.log(contact);
		return contact;

		arrowNavigationMode = true; // change this back after a
	}

	function generateContactHtml(){
		let contactForm = $('<div style="margin-left:3%"></div>');

		let contactLink = $('<a>here</a>').attr({
			'href': 'https://www.linkedin.com/in/vasili-anoshin/',
			'target': '_blank'
		});

		contactForm.append(contact);
		contactForm.append(contactLink);

		return contactForm;
	}

	function generatePortfolioHTML() {
		let portfolioContainer = $('<div style="margin-left:3%"></div>');

		let portfolioLink = $('<a>here</a>').attr({
			'href': 'https://github.com/VasiliAnoshin',
			'target': '_blank'
		});

		let portfolioText = "Github link ->  ";

		portfolioContainer.append( portfolioText);
		portfolioContainer.append(portfolioLink);

		return portfolioContainer;
	}

	function enterClick()
	{
		if($('#term-prompt').val() == 'quote'){
			handleInput();
		}else if (($('#term-prompt').val() != termHistory[termHistory.length-1])) {
			console.log('The input was different from the previous one.');
			handleInput(); //
		} else {
			console.log("This input is the same as previous - it shouldn't be added.");
		}

		// clear the input
		if ($('#term-prompt').val() !== "") {
			termHistory.push($('#term-prompt').val());
		}

		historyDisplayedIndex++;
		console.log("Now the terminal history is");
		console.log(termHistory);

		$('#term-prompt').val('');	
	}

	function arrowUpClick(){
		console.log("Arrow Up is pressed");

			if (historyDisplayedIndex > 0) {
				historyDisplayedIndex--;
			}

			console.log("The index that should have been displayed");
			console.log(historyDisplayedIndex);

			let historyHighlighted = termHistory[historyDisplayedIndex];
			$('#term-prompt').val(historyHighlighted);
	}

	function arrowDownClick(){
		console.log("Arrow Down is pressed");
			if (historyDisplayedIndex < termHistory.length) {
				historyDisplayedIndex++;
			}

			console.log("The index that should have been displayed");
			console.log(historyDisplayedIndex);

			let historyHighlighted = termHistory[historyDisplayedIndex];
			$('#term-prompt').val(historyHighlighted);
	} 

	function init() {
		// improve this code
		setTimeout(function() {
			addToTerminal(wakeUp,  typeSpeedSlow, true);
		}, 200);

		setTimeout(function() {
			addToTerminal(list, typeSpeedFast, true);
		}, 3500);
	}
	
	init();
});
