function init() {

var myParam = game.getParameter();
var photo = document.getElementById("sectionPhoto");


var loadJSON = '';

switch (myParam) {

			case '0':
				loadJSON = 'json/50s_60s.json';
				photo.src="images/sectionPhoto50s60s.gif";
				break;
			case '1':
				loadJSON = 'json/Kardiac_Kids.json';
				photo.src="images/sectionPhotokardiac.gif";
				break;
			case '2':
				loadJSON = 'json/Bernie_Kosar.json';
				photo.src="images/sectionPhotobk.gif";
				break;
			case '3':
				loadJSON = 'json/ThisThatOther.json';
				photo.src="images/sectionPhotothisthat.gif";
				break;
		}

var header = document.querySelector('header');
var section = document.querySelector('section');

/*JSON*/

var request = new XMLHttpRequest();

request.open('GET', loadJSON, true);

		request.onload = function () {

			// begin accessing JSON data here
			data = JSON.parse(this.response);

				var subject = document.createElement("p");
				
				subject.textContent = data["subject"];
				var sTitle = document.getElementById("sectionTitle");
				sTitle.appendChild(subject);

			addQandA(data);
		}

	request.send();

} /*End Body Init*/



var iCorrect = [];
	
function addQandA(data) {
		
		var datafeed = data;
		var target = document.getElementById("sectionQuestions");

		for ( i = 0; i < datafeed.questions.length; i++) {

			var cr = datafeed.questions[i].correct;
			iCorrect.push(cr);
			
			var ques = datafeed.questions[i];
			var thequestion = ques.question;
			
			var qnode = document.createElement("p");
			qnode.innerHTML = thequestion;
				
			var newQDiv = document.createElement('div');
			newQDiv.id = "q" + i; newQDiv.className = "question";
   			newQDiv.appendChild(qnode);
 			
 			var newSection = document.createElement("section");
 			newSection.id = "s" + i;
 			var sid = newSection.id;
 			
			newSection.appendChild(newQDiv);
				
			var parentDiv = document.getElementById("sectionQuestions").parentNode;
			var insertQ = document.getElementById("sectionQuestions");
			parentDiv.insertBefore(newSection, insertQ);
			
				for (var j = 0; j < ques.answers.length; j++)
					{
						var answer = ques.answers[j].a;

						var node = document.createElement("p");
						var textnode = document.createTextNode(answer);
						node.appendChild(textnode);

						var newElem = document.createElement('div');
						newElem.appendChild(node);

						newElem.id = "a" + i + j; newElem.className = "notselected";
			   			newSection.appendChild(newElem);
			    	}

		    	/*create submit and add to the section*/
				var newSubmit = document.createElement('div');
				newSubmit.className = "submit";
				var snode = document.createElement("p");
				var stextnode = document.createTextNode("SUBMIT");
				snode.appendChild(stextnode);
				newSubmit.appendChild(snode);
				newSubmit.id = "submit" + i;
				newSection.appendChild(newSubmit);

				/*Hides the section*/
			    document.getElementById(sid).style.display = "none";
			    document.getElementById(sid).addEventListener("click", function(event) {
               		game.checkElementClicked(event);
               	});

		}   /*end all looping*/
		
		/*Set up some stuff*/

		var openMenuBtn = document.getElementById('openMenuBtn');
		openMenuBtn.addEventListener('click', game.menuModal);
		
		sessionStorage.setItem(this.getParameter, "0");

		game.calcStartMarker();

		
}  /*end addQandA*/	

/*--------------------------------------------------------*/


var game = {

	// variables
	k: 0,
	yards: 0,
    score: 0,
    marker: document.getElementById("marker"),

    getParameter: function() {
    	var loadParam = location.search.split('myParam=')[1]
		console.log("Inside game.getParameter ", loadParam);
		return(loadParam);
    },
    
    calcTenYards: function() {
    	var theWidth = document.getElementById("container").offsetWidth;
    	var tenYards = 0;
    		if ( theWidth > 480 ) {
    			theWidth == 480;
    			tenYards = 480/14;
    		} else {
    			tenYards = theWidth/14;
    		}
		
		return tenYards;
    },

    calcStartMarker: function() {
    	var tenYards = game.calcTenYards();
    	var startPos = 0;
    	if (tenYards > 34) {
    		startPos = tenYards*5 -13;
    	} else {
    		startPos = tenYards*5 -15;
		}
		this.setMarker(startPos);
    },

    setMarker: function(startPos) {
    	var startPos = startPos;
    	TweenMax.set(marker, {transformOrigin:"50% 50%", scale: .75, y:-15, x:startPos});
    	this.showSection();
	},


	showSection: function() {

		var submit = document.getElementById("submit" + this.k);
			if (submit === null) {
				this.gameOver(this.yards);
			} else {
				var show = document.getElementById("s" + this.k);
				show.style.display = "block";
				this.animateSection();
			}
		
		
		
	}, /*end showSection*/

	animateSection: function () {
		// animate	
			var gsClass = document.getElementById("s" + this.k).childNodes;
				TweenMax.staggerFrom(gsClass, 0.5, {opacity:0, y: -20}, .1);
			var sTitle = document.getElementById("sectionTitle");
			
			if (sTitle.style.opacity === "1") {
				TweenLite.from("#orange", .5, {height: ".5rem"});
				TweenLite.from("#sectionTitle", .6, {opacity:0});
			};
	},

	checkElementClicked: function(event) {
	var elementSelected = event.target;
	var classOf = elementSelected.className;
	if(event.target && event.target.nodeName == "P") {
	elementSelected = elementSelected.parentNode;
	} else if ( event.target && event.target.nodeName == "DIV") {
        elementSelected == elementSelected;
    }

	var answer = elementSelected.textContent;
	classOf = elementSelected.className;

	if(classOf == 'notselected' || classOf == 'selected') {
		this.changeClass(elementSelected);
	} 
	if (classOf == 'submitSelected') {
		this.checkAnswer();
	} 
  },

    changeClass: function(elementSelected) {
    
    var el = elementSelected;
	var currentClass = el.getAttribute("class");
	var sbmt = document.getElementById("submit" + this.k);
 	var elems = document.getElementsByClassName("selected");
 	
 	for ( m = 0; m < elems.length; m++) {
 		elems[m].className = "notselected";
 	}
 
    if(currentClass === 'notselected')
    {
    	  el.className = "selected";
          sbmt.className = "submitSelected";

    } else {
          el.className = "notselected";
          sbmt.className = "submit";
    }

	}, //end changeClass


	checkAnswer: function () {
		console.log("Inside checkAnswer");
	
		var elems = document.getElementsByClassName("selected");
 		
		 	for ( m = 0; m < elems.length; m++) {
		 		if(elems[m].className = "selected") {
		 			var answerSelection = elems[m].textContent;
		 			//console.log(answerSelection);
		 		}
		 	}

		var theAnswer = iCorrect[this.k];
		
			if ( theAnswer === answerSelection ) {
				this.moveMarker(10);
				
			} else {
				this.moveMarker(-10);
				
			} 
		
	},  /*end checkAnswer*/

	
	moveMarker: function(yards) {

		console.log("Inside moveMarker", "yards ", yards);
		
		var calc = this.calcTenYards();
		
		/*animate*/
		if (yards == 10) {
			TweenMax.to(this.marker, .5, {x:"+="+calc});
		} else {
			TweenMax.to(this.marker, .5, {x:"-="+calc});
		}

		this.checkScoring(yards);
	},


	checkScoring: function(yards){

		var yards = yards;
		this.yards += yards;
		console.log("Inside checkScoring ", yards, this.yards);
		
		if (this.yards == -30) {
			this.score += -2;
			this.gameOver(-2);
		} else if (this.yards == 70) {
			this.score += 7;
			this.gameOver(7);
		} else {
			this.openModal(yards);
		};

		
	},

	openModal: function(yards) {
		console.log("Inside openModal");

		if ( yards == 10 ) {
			document.getElementById("modalTitle").innerHTML = "First Down!";
			document.getElementById("modalSubText").innerHTML = "Nice play";
		} else {
			document.getElementById("modalTitle").innerHTML = "Penalty!";
			document.getElementById("modalSubText").innerHTML = "Loss of 10 Yards";
		};

			var modal = document.getElementById('theModal');
			modal.style.display = "block";
			// animate
			var modalContent = document.getElementById("modalContent");
			TweenMax.from(modalContent, .75, {opacity:0, y:150, ease: Elastic.easeOut.config(1,.7)});
			
			/* MODAL BUTTON ADVANCES TO NEXT PAGE FUNCTION */
	},

	goToNextPage: function() {

		var modal = document.getElementById('theModal');
		modal.style.display = "none";
		
		var currentSection = document.getElementById("s" + this.k);
		currentSection.style.display = "none";
		this.k = this.k + 1;	
		this.showSection();
	},

	gameOver: function(result) {
		console.log("Inside gameOver ", result);

			if ( result == -2 )	{
				document.getElementById("modalTitle").innerHTML = "Game Over!";
				document.getElementById("modalSubText").innerHTML = "Safety!";
			} else if ( result == 7 ) {
				document.getElementById("modalTitle").innerHTML = 'Game Over';
				document.getElementById("modalSubText").innerHTML = 'Touchdown!';
			} else if ( result >= 60 ) {
				document.getElementById("modalTitle").innerHTML = 'Game Over';
				document.getElementById("modalSubText").innerHTML = 'Field Goal';
			} else {
				document.getElementById("modalTitle").innerHTML = 'Game Over';
				document.getElementById("modalSubText").innerHTML = 'Punt';
			}



			// Get the modal
			var modal = document.getElementById('theModal');
			// Get the <span> element that closes the modal
			var span = document.getElementsByClassName("close")[0];
			//open the modal
			modal.style.display = "block";
			// animate
			var modalContent2 = document.getElementById("modalContent");
			TweenMax.from(modalContent2, .75, {opacity:0, y:150, ease: Elastic.easeOut.config(.75,.3)});
			
			this.endGame();
			
	}, /*end game over*/

	closeModal: function() {
		var modal = document.getElementById('theModal');	
		modal.style.display = "none";
		var currentSection = document.getElementById("s" + this.k);
	},

	endGame: function() {
		console.log("Inside end game");
		var getValue = game.getParameter();
		sessionStorage.setItem(getValue, this.score);
		var modal = document.getElementById('theModal');
		// Get the button that closes the modal
			document.getElementById("myBtn").addEventListener("click", function() {
				modal.style.display = "none";
				window.location.href = "categories.html";
			});
	},

	menuModal: function() {
		var menuModal = document.getElementById('menuModal');
			menuModal.style.display = "block";
			// animate
			var menuModalContent = document.getElementById("menuModalContent");
			TweenMax.from(menuModalContent, .75, {opacity:0, y:150, ease: Elastic.easeOut.config(1,.7)});
	},

	closeMenu: function() {
		menuModal.style.display = "none";
	},

	exitGame: function() {
		location.href = 'http://www.google.com';
	}

} //end Game App

