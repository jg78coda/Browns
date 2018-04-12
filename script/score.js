function init() {


var header = document.querySelector('header');
var section = document.querySelector('section');

/*JSON*/

var request = new XMLHttpRequest();

request.open('GET', 'json/categories.json', true);

		request.onload = function () {

		// begin accessing JSON data here
		data = JSON.parse(this.response);

		var subject = document.createElement("p");
		
		buildCategories(data);
		}

	request.send();

} /*End Body Init*/

	
	function buildCategories(data) {
		
		var datafeed = data;
		var target = document.getElementById("insert");

		var newSection = document.createElement("section");
 			newSection.id = "scoreSection";
 		var addScore = 0;
		console.log("Before loop ", addScore);

	// this will create the categories
		for ( i = 0; i < datafeed.category.length; i++) {

			var cat = datafeed.category[i].a;
			var thecategory = cat;
			var cnode = document.createElement("p");
			var ctextnode = document.createTextNode(thecategory);
			cnode.appendChild(ctextnode);

			var ssScore = sessionStorage.getItem(sessionStorage.key(i));
			var ssNodeP = document.createElement("p");
			var ssTextnode = document.createTextNode(ssScore);
			var ssDiv = document.createElement("div");

			addScore += Number(ssScore);
			console.log("In Loop ", addScore);

			ssNodeP.appendChild(ssTextnode);
			ssDiv.appendChild(ssNodeP);
			ssDiv.className = 'score';
			//append ssDiv below, and BEFORE cnode;
				
			var newCDiv = document.createElement('div');
			newCDiv.appendChild(ssDiv);
   			newCDiv.appendChild(cnode);
			newCDiv.className = "notselected";
   			newSection.appendChild(newCDiv);
   			target.appendChild(newSection);
 			//console.log(ssNodeP); 		
 		
 		    } /*end for loop ------------------------ */

 		    //Add Total Scoring Create Total Score first
 		    var ttlScore = addScore;
 		    var ttlNodeP = document.createElement("p");
			var ttlTextnode = document.createTextNode(ttlScore);
			var ttlDiv = document.createElement("div");
			ttlNodeP.appendChild(ttlTextnode);
			ttlDiv.appendChild(ttlNodeP);
			ttlDiv.className = 'score';
			
 		    var tnode = document.createElement("p");
			var ttextnode = document.createTextNode("Total");
			tnode.appendChild(ttextnode);
			var newTDiv = document.createElement('div');
			newTDiv.className = "total";

			newTDiv.appendChild(ttlDiv);
			newTDiv.appendChild(tnode);
			newSection.appendChild(newTDiv);
			




		// animate all	
				var cClass = document.getElementById("scoreSection").childNodes;
				//console.log(cClass);
				TweenMax.staggerFrom(cClass, 0.5, {opacity:0, y: +40}, .1);
				TweenLite.to("#orange", .5, {height: "2.0rem"});

		var openMenuBtn = document.getElementById('openMenuBtn');
		openMenuBtn.addEventListener('click', game.menuModal);
	
} /*end Build*/



var game = {

	menuModal: function() {
		//console.log("Inside menu modal");
		var menuModal = document.getElementById('menuModal');
		//console.log(menuModal);
			menuModal.style.display = "block";
			// animate
			var menuModalContent = document.getElementById("menuModalContent");
			TweenMax.from(menuModalContent, .75, {opacity:0, scale: .25, ease: Elastic.easeOut.config(.75,.3)});
	},

	closeMenu: function() {
		menuModal.style.display = "none";
	},

	exitGame: function() {
		location.href = 'http://www.google.com';
	} 


} //end Game App

