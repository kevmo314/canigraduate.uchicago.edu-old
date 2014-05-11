google.load('visualization', '1', {packages:['corechart']});
var app = angular.module('app', ['ui.bootstrap', 'base64', 'once']);
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
	$scope.recommendations = [];
	$scope.updateRecommendations = function() {
		var titles = [];
		for(var i = 0; i < $scope.userClasses.length; i++) {
			titles.push($scope.userClasses[i].split(' :: ')[0]);
		}
		$http.get('/recommendations.php?classes=' + titles.join('|')).success(function(data) {
			data = data.split('|');
			data.sort();
			$scope.recommendations = [];
			for(var i = 0; i < data.length; i++) {
				if(data[i].length == 0) {
					continue;
				}
				$scope.recommendations.push({classes:data[i]});
			}
		});
	};
	($scope.evaluate = function() {
		evaluate($scope.userClasses);
		$location.hash($base64.encode($scope.userClasses.join('|')));
		$scope.updateRecommendations();
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
		var index = $scope.classes.prefixBinarySearch(name);
		return (index == -1 ? "" : $scope.classes[index].substring($scope.classes[index].indexOf(' :: ') + 4));
	};
	$scope.isLeaf = function(e) {
		return typeof e.classes == 'string';
	};
	$scope.hasClass = function(child) {
		return $scope.userClasses.prefixBinarySearch(child) != -1;
	};
	$scope.load = function() {
		$modal.open({
			templateUrl:'load.html',
			controller:["$scope", "$modalInstance", function($modalScope, $modalInstance) {
				$modalScope.data = {str:'', cnet:null, password:null}; // looks like a bug in bootstrap-ui >.>
				$modalScope.message = "";
				$modalScope.load = function() {
					if($modalScope.data.cnet != null) {
						$modalScope.message = "Querying... (this may take a while)";
						$http.post('/superimport.php', $modalScope.data).success(function(response) {
							var group = response.split('|');
							if(group.length == 1 && group[0] == '') {
								$modalInstance.close();
							} else {
								for(var i = 0; i < group.length; i++) {
									group[i] += " :: " + $scope.getName(group[i]);
								}
								$modalInstance.close(group);
							}
						});
					} else {
						$modalInstance.close($base64.decode($modalScope.data.str).split('|'));
					}
				};
			}]
		}).result.then(function(data) {
			if(data) {
				data.sort();
				$scope.evaluate($scope.userClasses = data);
			}
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
	$scope.getDescription = function(cls, dist) {
		cls.description = "Loading...";
		$http.get('/cors-proxy.php?action=description&class=' + cls.classes).success(function(data) {
			console.log(data);
			cls.description = data;
		});
		$http.get('/distribution.php?class=' + cls.classes).success(function(data) {
			data = data.split('|');
			if(data.length > 0) {
				for(var i = 0; i < data.length; i++) {
					data[i] = parseInt(data[i]);
				}
				(new google.visualization.BarChart(document.getElementById(dist))).draw(google.visualization.arrayToDataTable([
					['Grade', 'Count'],
					['A', data[10]],
					['A-', data[9]],
					['B+', data[8]],
					['B', data[7]],
					['B-', data[6]],
					['C+', data[5]],
					['C', data[4]],
					['C-', data[3]],
					['D+', data[2]],
					['D', data[1]],
					['D-', data[0]]
				]), {title:'Grade Distribution'});
				
			} else {
				$("#distribution").html("");
			}
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
// I tried doing this in angular and it didn't work well :(
function evaluate(taken) {
	var userClasses;
	var coreClasses = [];
	function evaluateChild(node, core) {
		if(node.classes) {
			if(typeof node.classes == 'string') {
				var has = userClasses.prefixBinarySearch(node.classes);
				if(has != -1) {
					if(node.noCore && coreClasses.prefixBinarySearch(userClasses[has]) != -1) {
						has = -1;
					} else {
						node.userClass = userClasses.splice(has, 1)[0];
						if(core) {
							coreClasses.push(node.userClass);
						}
					}
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
		requirements[major].total = 0;
		requirements[major].base = 0;
		var complete = true;
		for(var i = 0; i < requirements[major].classes.length; i++) {
			var result = evaluateChild(requirements[major].classes[i], major == 'College Core');
			complete = complete && (result[0] == result[1]);
			requirements[major].base += result[0];
			requirements[major].total += result[1];
		}
		requirements[major].complete = complete;
		if(major == 'College Core') {
			coreClasses.sort();
		}
	}
}
