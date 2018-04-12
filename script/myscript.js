function init() {


var header = document.querySelector('header');
var section = document.querySelector('section');

/*JSON*/

var request = new XMLHttpRequest();

request.open('GET', 'json/myjson.json', true);

		request.onload = function () {

		// begin accessing JSON data here
		data = JSON.parse(this.response);

		/*console.log("Data = ", data);*/

		var subject = document.createElement("p");
		
		subject.textContent = data["subject"];
		var sTitle = document.getElementById("sectionTitle");
		sTitle.appendChild(subject);

		addQandA(data);
		}

	request.send();

} /*End Body Init*/

	var iCorrect = [];
	/*console.log("read iCorrect ");*/

function addQandA(data) {
		
		var datafeed = data;
		/*console.log("QandA");*/
		var target = document.getElementById("sectionQuestions");

		

		for ( i = 0; i < datafeed.questions.length; i++) {

			var cr = datafeed.questions[i].correct;
			iCorrect.push(cr);
			/*cr.id = "cr" + i;*/
			/*console.log(cr, correct[i]);*/

			
			var ques = datafeed.questions[i];
			var thequestion = ques.question;
			
			var qnode = document.createElement("p");
			var qtextnode = document.createTextNode(thequestion);
			qnode.appendChild(qtextnode);
				/*console.log(thequestion);*/
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
			   			/*newElem.innerHTML = answer;*/
			   			newSection.appendChild(newElem);
			    		var it = "a" + i + j;
			    		document.getElementById(it).addEventListener("click", function() {
			    			select(this.id, iCorrect); }, false);
					}

		    /*create submit and add to the section*/
				var newSubmit = document.createElement('div');
				newSubmit.className = "submit";
				newSubmit.innerHTML = "SUBMIT";
				newSubmit.id = "submit" + i;
				newSection.appendChild(newSubmit);
/*console.log("end Q loop");*/
				/*Hides the section*/
			    document.getElementById(sid).style.display = "none";
			
		}   /*end all looping*/

		/*console.log("test1");*/
		showSection();
		/*console.log("test2");*/
}  /*end addQandA*/	

var k = 0;
/*console.log("read var k = 0 ");*/
var score = 0;
/*console.log("read score = 0 ");*/


function showSection () {
		/*console.log(k);*/
	/*get submit*/
	var submit = document.getElementById("submit" + k);
		/*console.log("Submit ID = " + submit);*/
	if (submit === null) {
		gameOver();
	} else {
		/*submit.addEventListener("click", checkAnswer);*/
		var show = document.getElementById("s" + k);
		show.style.display = "block";
	}
	
	// animate	
		var gsClass = document.getElementById("s" + k).childNodes;
		// console.log(gsClass);
			TweenMax.staggerFrom(gsClass, 0.5, {opacity:0, y: -20}, .1);
		// var sTitle = document.getElementById("sectionTitle");
			TweenLite.from("#orange", .5, {height: ".5rem"});
			TweenLite.from("#sectionTitle", .6, {opacity:0});
	
} /*end showSection*/



function select (it) {
/*debugger;*/
	var cr = iCorrect[k];
		// console.log("cr is " +cr);
	
	var el = document.getElementById(it);
	var elhtml = el.innerHTML;
	var mystr = el.textContent;

	var theansweris = cr;

	var sendAnswer = false;
	    if ( mystr === theansweris) {
	    	sendAnswer = true;
		} else {
			sendanswer = false;
		}

	// console.log(theansweris, "elhtml = ",  mystr, "sendanswer = " + sendAnswer);	

	var currentClass = el.getAttribute("class");
	var sbmt = document.getElementById("submit" + k);
 	var elems = document.getElementsByClassName("selected");
 	
 	for ( m = 0; m < elems.length; m++) {
 		elems[m].className = "notselected";
 	}
 
/*debugger;*/
    if(currentClass === 'notselected')
    {
          el.setAttribute("class", "selected");
          sbmt.style.backgroundColor='#EB3300'; /*change class didnt work*/
          sbmt.style.border = '2px solid #fff';
          sbmt.addEventListener("click", checkAnswer(sendAnswer));
          /*console.log(sbmt);*/

    } else {
          el.setAttribute("class", "notselected");
          sbmt.style.backgroundColor='#851D00';
          sbmt.style.border = '2px solid #F8CFC6';
          sbmt.removeEventListener("click", checkAnswer(sendAnswer));
    }
   
}

function checkAnswer(check) {

		var iSubmit = "submit" + k;
		
		document.getElementById("submit" + k).onmousedown = function () {
		
		var icheck = check;
		
		if ( icheck === true ) {
			keepScore(10);
			document.getElementById("modalTitle").innerHTML = "First Down!";
			document.getElementById("modalSubText").innerHTML = "Nice play";
	} else {
			keepScore(0);
			document.getElementById("modalTitle").innerHTML = "Penalty!";
			document.getElementById("modalSubText").innerHTML = "Illegal Procedure, Loss of 5 Yards";

		} /*close if else*/

			var modal = document.getElementById('theModal');
			/*var span = document.getElementsByClassName("close")[0];*/
			modal.style.display = "block";
			// animate
			var modalContent = document.getElementById("modalContent");
			TweenMax.from(modalContent, .75, {opacity:0, scale: .25, ease: Elastic.easeOut.config(.75,.3)});
			
			/* MODAL BUTTON ADVANCES TO NEXT PAGE FUNCTION */

		} /*end onmousedown*/

	}  /*end checkAnswer*/


	function goToNextPage() {

			/*console.log("Inside goToNextPage");*/
			var modal = document.getElementById('theModal');
			modal.style.display = "none";
			
			var currentSection = document.getElementById("s" + k);
			currentSection.style.display = "none";
			k = k + 1;	
			showSection();
	
	}

	



function keepScore(points) {
	/*console.log(points);*/
	var combine = points;
	score += combine;
	document.getElementById("score").innerHTML = "Your Score is " + score;
}



function gameOver() {

			// console.log("Start Game Over");
			// Get the modal
			var modal = document.getElementById('theModal');

			document.getElementById("modalTitle").innerHTML = "Touchdown!";
			document.getElementById("modalSubText").innerHTML = "Game Over";

			// Get the <span> element that closes the modal
			var span = document.getElementsByClassName("close")[0];
			//open the modal
			modal.style.display = "block";
			// animate
			var modalContent = document.getElementById("modalContent");
			TweenMax.from(modalContent, .75, {opacity:0, scale: .25, ease: Elastic.easeOut.config(.75,.3)});

			// Get the button that closes the modal
			document.getElementById("myBtn").addEventListener("click", closeModal);
			
			// When the user clicks anywhere outside of the modal, close it
			/* window.onclick = function(event) {
			    if (event.target == modal) {
			    	console.log("clicked window");
			        modal.style.display = "none";
			        
			    }
			} */

			function closeModal() {
			
			modal.style.display = "none";
			
			var currentSection = document.getElementById("s" + k);
				console.log(currentSection);
			/*currentSection.style.display = "none";*/
				console.log("Game over");
			window.location.href = "categories.html";
			
			}

} /*end game over*/



