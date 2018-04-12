TweenMax.set(svgObject, {transformOrigin:"50% 50%", scale:1, y:0, x:0});

	football.addEventListener("click", function(){
		TweenMax.to(football, .5, {transformOrigin:"50% 50%", rotation:-460, y:-150, x:350, onComplete:changePage});
	});

	function changePage() {
		location.href = 'categories.html';
	}
------------------------

TweenMax.to(element, 1, {left:"+="+myIncreasingNumber});

-----------------------------------

