(function() {
	var mouse = {x:0, y:0};
	function offset(elm) { 
		// from http://cvmlrobotics.blogspot.co.at/2013/03/angularjs-get-element-offset-position.html
		try {
			return elm.offset()
		} catch(e) { 
			var rawDom = elm[0];
			var _x = 0, _y = 0;
			var body = document.documentElement || document.body; 
			var scrollX = window.pageXOffset || body.scrollLeft; 
			var scrollY = window.pageYOffset || body.scrollTop; 
			_x = rawDom.getBoundingClientRect().left + scrollX; 
			_y = rawDom.getBoundingClientRect().top + scrollY; 
			return { left: _x, top:_y }
		}
	}
	angular.module('gravitate', [])
		.directive('gravitate', function() {
			return {
				restrict:'E',
				replace:'true',
				transclude:true,
				template:'<div ng-transclude></div>',
				link:function(scope, element, attrs) {
					var old = 1;
					scope.$watch(function() {
						try {
							return element.outerHeight(true)
						} catch(e) {
							return element.prop('offsetHeight')
						}
					}, function(value) {
						if(value != old) {
							var position = offset(element);
							if(mouse.y > position.top) {
								// gravitate away (or towards, depending on sgn(delta)
								var distance = (value - old) * Math.min(1.0, (mouse.y - position.top) / value);
								if(Math.abs(distance) >= 1) {
									mouse.y += distance; // don't bother retriggering the event listener
									window.scrollBy(0, distance);
									old = value; // simple fix because distance must be >= 1
								}
							}
						}
					});
					element.bind('$destroy', function() {
						// special case
						var position = offset(element);
						if(mouse.y > position.top) {
							window.scrollBy(0, -element.prop('offsetHeight'));
						}
					});
				}
			}
		});
	document.addEventListener('mousemove', function(e) {
		mouse.x = e.pageX;
		mouse.y = e.pageY;
	});
})();
