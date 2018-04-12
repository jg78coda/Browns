function init() {
	
	
	var spiral = document.getElementById("Layer_1");
	var spiral2 = document.getElementById("Layer_2");
	
	TweenMax.to(spiral, 35, {rotation:360, transformOrigin:"50% 50%", ease:Linear.easeNone, repeat: -1 });
	TweenMax.to(spiral2, 45, {rotation:360, transformOrigin:"50% 50%", ease:Linear.easeNone, repeat: -1 });
	

    var svgObject = document.getElementById("footballAll") ,
	svgDoc = svgObject.contentDocument ,
	svgChild = svgDoc.getElementById("Football");
	svgChild1 = svgDoc.getElementById("Holder");
	
	TweenMax.set(svgObject, {transformOrigin:"50% 50%", scale:1, y:0, x:0});

	svgChild.addEventListener("click", function(){
		
		TweenMax.to(svgChild, .5, {transformOrigin:"50% 50%", rotation:-460, y:-150, x:350});
		
		var tl = new TimelineMax();
		TweenMax.to(svgChild1, 1, {transformOrigin:"50% 50%", rotation:-810 });
		tl.add( TweenMax.to(svgChild1, .5, { y:-150, ease:Power1.easeOut, }) );
		tl.add( TweenMax.to(svgChild1, .5, { y:0, ease:Power3.easeIn, onComplete:changePage}) );
		tl.play();
		
	});

	function changePage() {
		location.href = 'categories.html';
	}
		
	sessionStorage.setItem("0", "0");
	sessionStorage.setItem("1", "0");
	sessionStorage.setItem("2", "0");
	sessionStorage.setItem("3", "0");

	
}
