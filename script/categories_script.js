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
 			newSection.id = "catSection";
 		

   		var subtitle = datafeed.subject;
		//console.log("subtitle ", subtitle);
		var stextnode = document.createTextNode(subtitle);
		//console.log("stextnode ", stextnode);
		var snode = document.createElement("p");
		snode.appendChild(stextnode);
		//console.log("append ", snode);
		
		var newSDiv = document.createElement('div');
			newSDiv.id = "q"; newSDiv.className = "question";
   			newSDiv.appendChild(snode);

		newSection.appendChild(newSDiv);	
		target.appendChild(newSection);
		document.getElementById("catSection").addEventListener("click", function(event) {
               	game.checkElementClicked(event);});

	// this will create the categories
		for ( i = 0; i < datafeed.category.length; i++) {

			var cat = datafeed.category[i].a;
			var thecategory = cat;
			var cnode = document.createElement("p");
			var ctextnode = document.createTextNode(thecategory);
			cnode.appendChild(ctextnode);

			var newCDiv = document.createElement('div');
			newCDiv.className = "category";
   			newCDiv.appendChild(cnode);

   			var it = "c" + i;
   			newCDiv.id = it; 
   			newCDiv.className = "notselected";
   			newSection.appendChild(newCDiv);
 			 		
 		}   /*end for loop*/


 		/*Get the HTML page to go to*/

 			for ( j = 0; j < datafeed.goToPage.length; j++) {
				var go = datafeed.goToPage[j].a;
				var goTo = go;

				var gnode = document.createElement("p");
				var textGnode = document.createTextNode(goTo);
				gnode.appendChild(textGnode);

				var newGDiv = document.createElement('div');
				newGDiv.appendChild(gnode);
				// newGDiv.display = "none";
				gnode.id = ("goTo" + j );
				/*console.log( "goTo = " + goTo, "go = " + go, "id = " + gnode.id);*/
			}

			/*create submit and add to the section*/
				var newSubmit = document.createElement('div');
				newSubmit.className = "submit";
				var snode = document.createElement("p");
				var stextnode = document.createTextNode("SUBMIT");
				snode.appendChild(stextnode);
				newSubmit.appendChild(snode);
				newSubmit.id = "submit";
				newSection.appendChild(newSubmit);
				
				
			// animate	
				var cClass = document.getElementById("catSection").childNodes;
				console.log(cClass);
				TweenMax.staggerFrom(cClass, 0.5, {opacity:0, y: +40}, .1);
				TweenLite.to("#orange", .5, {height: "1.0rem"});


		var openMenuBtn = document.getElementById('openMenuBtn');
		openMenuBtn.addEventListener('click', game.menuModal);

	
} /*end Build*/


function select(it) {
	
	var theId = document.getElementById(it);
	var sbmt = document.getElementById("submit");
	var currentClass = theId.getAttribute("class");
	var elems = document.getElementsByClassName("selected");

 	for ( m = 0; m < elems.length; m++) {
 		elems[m].className = "notselected";
 	}

    if(currentClass == 'notselected')
    {
          theId.setAttribute("class", "selected");
          sbmt.style.backgroundColor='#EB3300';
          sbmt.style.border = '2px solid #fff';
    } else {
          theId.setAttribute("class", "notselected");
          sbmt.style.backgroundColor='#8E1E1E';
    }
	console.log("selecting");
}  /*end select*/





var game = {

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
		game.changeClass(elementSelected);
	} 
	if (classOf == 'submitSelected') {
		game.goThere();
	} 
  },

    changeClass: function(elementSelected) {
      /*debugger;*/
      //console.log("Inside changeClass");
	var el = elementSelected;
	var currentClass = el.getAttribute("class");
	var sbmt = document.getElementById("submit");
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


	goThere: function() {

		var elems = document.getElementsByClassName("selected");
 		console.log(elems);

		 	for ( m = 0; m < elems.length; m++) {
		 		if(elems[m].className = "selected") {
		 			//var categorySelection = elems[m].textContent;
		 			var categorySelection = elems[m];
		 			//console.log(categorySelection);
		 		}
		 	}
		
		var theId = categorySelection.id;
		console.log("theID = ", theId);

		switch (theId) {

			case 'c0':
				location.href = 'QA.html?myParam=0';
				break;
			case 'c1':
				location.href = 'QA.html?myParam=1';
				break;
			case 'c2':
				location.href = 'QA.html?myParam=2';
				break;
			case 'c3':
				location.href = 'QA.html?myParam=3';
				break;
		}

	},

	menuModal: function() {
		var menuModal = document.getElementById('menuModal');
			menuModal.style.display = "block";
			// animate
			var menuModalContent = document.getElementById("menuModalContent");
			TweenMax.from(menuModalContent, .75, {opacity:0, y:150, ease: Elastic.easeOut.config(1.0,.7)});
	},

	closeMenu: function() {
		menuModal.style.display = "none";
	},

	exitGame: function() {
		location.href = 'http://www.google.com';
	} 


} //end Game App

