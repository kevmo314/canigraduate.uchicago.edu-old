var app = angular.module('app', ['ui.bootstrap', 'base64']);
app.controller('AirTrafficCtrl', function($scope, $http, $location, $base64, $modal) {
	$scope.departments = {};
	$scope.classes = classes.sort();
	$scope.requirements = requirements;
	$scope.sequences = sequenceGroups;
/*
	$scope.loading = true;
	$scope.progress = {loaded:0, total:1};
	$http.get('/catalog.php?url=/thecollege/programsofstudy/').success(function(response) {
		var match, regex = /\<div class="main3"\>\<a href="(.+?)"\>(.+?)\<\/a\>\<\/div\>/g;
		var count = 0;
		do {
			if(match = regex.exec(response)) {
				count++;
				$scope.departments[match[1]] = match[2];
				$http.get('/catalog.php?url=' + match[1]).success(function(response) {
					var match, regex = /\<strong\>([^\-]+?)\.(.+)\..+?\d\d\d Units\.<\/strong\>/g;
					do {
						if(match = regex.exec(response)) {
							match[1] = encodeURIComponent(match[1].replace('&#160;').trim());
							$scope.classes.push(match[1].replace('undefined', ' ').replace('%C2%A0', ' ') + ' :: ' + match[2].trim());
						}
					} while(match);
					if(++$scope.progress.loaded == $scope.progress.total) {
						$scope.loading = false;
					}
				});
			}
		} while(match);
		$scope.progress.total = count;
	});
*/
	$scope.userClasses = ($location.hash().length == 0 ? [] : $base64.decode($location.hash()).split('|'));
	($scope.evaluate = function() {
		evaluate($scope.userClasses);
		$location.hash($base64.encode($scope.userClasses.join('|')));
	})();
	$scope.addClass = function(value, skipEvaluation) {
		if(!$scope.userClasses.binarySearch(value)) {
			$scope.userClasses.push(value);
			$scope.userClasses.sort(); // meh, don't need that insertion point stuff.
			$scope.addClassValue = "";
			if(!skipEvaluation) {
				$scope.evaluate();
			}
		}
	};
	$scope.getName = function(name) {
		if(name.length != 10) {
			return "Elective";
		}
		var index = hasClass(name, $scope.classes);
		return (index == -1 ? "" : $scope.classes[index].substring($scope.classes[index].indexOf(' :: ') + 4));
	};
	$scope.isLeaf = function(e) {
		return typeof e.classes == 'string';
	};
	$scope.hasClass = function(child) {
		return hasClass(child, $scope.userClasses) != -1;
	};
	$scope.load = function() {
		$modal.open({
			templateUrl:'load.html',
			controller:function($scope, $modalInstance) {
				$scope.data = {str:''}; // looks like a bug in bootstrap-ui >.>
				$scope.load = function() {
					$modalInstance.close($base64.decode($scope.data.str).split('|'));
				};
			}
		}).result.then(function(data) {
			$scope.userClasses = data;
		});
	};
	$scope.save = function() {
		$modal.open({
			templateUrl:'save.html',
			controller:function($scope, $modal, save) {
				$scope.saveString = save;
			},
			resolve: {
				save:function() { return $base64.encode($scope.userClasses.join('|')); }
			}
		});
	};
	$scope.forceIgnore = function(cls) {
		cls.force = !cls.force;
		evaluate($scope.userClasses);
	};
	$scope.toggleSequence = function(group) {
		if($scope.hasSequence(group)) {
			for(var i = 0; i < group.length; i++) {
				// Assume it's uniquely defined, we know it's != -1 because of hasSequence.
				$scope.userClasses.splice($scope.userClasses.prefixBinarySearch(group[i]), 1);
			}
		} else {
			for(var i = 0; i < group.length; i++) {
				var index = $scope.classes.prefixBinarySearch(group[i]);
				if(index != -1) {
					$scope.addClass($scope.classes[index], true);
				}
			}
		}
		$scope.evaluate();
	};
	$scope.hasSequence = function(group) {
		for(var i = 0; i < group.length; i++) {
			if($scope.userClasses.prefixBinarySearch(group[i]) == -1) {
				return false;
			}
		}
		return true;
	};
	$scope.getDescription = function(cls) {
		cls.description = "Loading...";
		$http.get('/cors-proxy.php?action=description&class=' + cls.classes).success(function(data) {
			cls.description = data;
		});
		for(var i = 0; i < quarters.length; i++) {
			$http.get('/cors-proxy.php?action=sections&class=' + cls.classes + '&qtr=' + quarters[i]).success(function(data) {
				if(!cls.sections) { cls.sections = data; }
				else { cls.sections = cls.sections.concat(data); }
			});
		}
	};
});
Array.prototype.binarySearch = function(v) {
    if ( !this.length ) { return false; }
    if ( this[0] === v ) { return true; }
    var i, mid,
        start = 0,
        end = this.length,
        c = false;
    while ( c = (i = this[mid = start+((end-start)>>1)]) !== v ) {
        i < v ? (start = mid) : (end = mid);
        if (start >= end - 1) { break; }
    }
    return !c;
};
// log n time LIKE A BOSS
Array.prototype.prefixBinarySearch = function(v) {
	if(!this.length) {
		return -1;
	}
	var start = 0, end = this.length - 1, mid = -1, el = null;
	while(start <= end) {
		mid = (start + (end - start) / 2) | 0;
		el = this[mid];
		if(el.length >= v.length && el.substring(0, v.length) == v) {
			return mid;
		} else if(el < v) {
			start = mid + 1;
		} else if(el > v) {
			end = mid - 1;
		} else {
			// y'know this shouldn't happen...
			return mid;
		}
	}
	return -1;
};
app.filter('fill', function() {
	return function(input) {
		while(input.length < 10) {
			input = input + 'x';
		}
		return input;
	};
});
function hasClass(name, classes) {
	return classes.prefixBinarySearch(name);
/*	for(var i = 0; i < classes.length; i++) {
		if(classes[i].indexOf(name) == 0) {
			return i;
		}
	}
	return -1;*/
}
// I tried doing this in angular and it didn't work well :(
function evaluate(taken) {
	var userClasses;
	function evaluateChild(node) {
		if(node.classes) {
			if(typeof node.classes == 'string') {
				var has = hasClass(node.classes, userClasses);
				if(has != -1) {
					node.userClass = userClasses.splice(has, 1)[0];
				}
				return [(node.complete = (has != -1) || node.force) ? 1 : 0, 1];
			} else {
				var cap = 0, count = 0, base = [];
				for(var i = 0; i < node.classes.length; i++) {
					var result = evaluateChild(node.classes[i]);
					if(result[0] == result[1]) { count++; }
					if(i < node.require) { cap += result[1]; }
					base.push(result[0]);
				}
				base.sort(function(left, right) { return right - left; });
				var sum = 0;
				if(!node.force) {
					for(var i = 0; i < node.require; i++) {
						if(!base[i]) {
							break;
						}
						sum += base[i];
					}
				} else {
					sum = cap;
				}
				node.complete = (count >= node.require) || node.force;
				node.base = Math.min(cap, sum);
				return [sum, (node.total = cap)];
			}
		}
		return [0, 0];
	}
	for(var major in requirements) {
		userClasses = angular.copy(taken);
		var complete = true;
		requirements[major].total = 0;
		requirements[major].base = 0;
		for(var i = 0; i < requirements[major].classes.length; i++) {
			var result = evaluateChild(requirements[major].classes[i]);
			complete = complete && (result[0] == result[1]);
			requirements[major].base += result[0];
			requirements[major].total += result[1];
		}
		requirements[major].complete = complete;
	}
}
