var app = angular.module('app', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'decipher.tags', 'gravitate']);
app.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {templateUrl:'templates/courses.html'})
		.when('/scheduler', {templateUrl:'templates/scheduler.html'})
		.when('/watches', {templateUrl:'templates/exchange.html', controller:'ExchangeCtrl'})
		.when('/evaluations', {templateUrl:'templates/evaluations.html', controller:'EvaluationsCtrl'})
		.when('/transcript', {templateUrl:'templates/transcript.html', lock:true})
		.otherwise({redirectTo:'/'});
	$locationProvider.html5Mode(true);
});
app.constant('AUTHENTICATION', {cnetid:'',password:''});
app.constant('COLORS', ["#178FC7","#DC1D0C","#3BCA40","#785BEB","#A85572","#C93767","#469C67","#E3A1BE","#7068A4","#B3B306"]);
app.directive('navTab', function($location) {
	return {
		restrict:'E',
		scope:{href:'@'},
		replace:true,
		transclude:true,
		template:'<li ng-class="{active:isActive()}"><a ng-href="{{::href}}" ng-transclude></a></li>',
		link:function(scope, element, attrs) {
			scope.isActive = function() {
				return scope.href == $location.path()
			}
		}
	}
});
app.constant('DEFAULT_FILTERS', {departments:[], instructors:[], quarter:{AUTUMN:false, WINTER:false, SPRING:false, SUMMER:false}, dow:{ARR:false, U:false, M:false, T:false, W:false, H:false, F:false, S:false}, taken:false, tested:false, prereq:false, core:false, conflict:false, archive:false, search:'', dead:false, full:false});
app.run(function($rootScope, InterfaceManagerService) {
	$rootScope.interface = InterfaceManagerService;
});
app.run(function($http, $interval, AUTHENTICATION) {
	$interval(function() { // TODO: remove this once ITS adds a classes API
		// for anyone reading, this uses the user's auth credentials to pull data from classes
		// because timeschedules doesn't update fast enough. improves watch reliability.
		// and $http calls are cheap.
		if(AUTHENTICATION.cnetid != '') {
			$http.post('/data/contribute.php', AUTHENTICATION);
		}
	}, 2 * 60 * 1000);
});
app.run(function($modal, $timeout, $cookies, TutorialService) {
	var mobileCheck = function() { // http://stackoverflow.com/questions/11381673/javascript-solution-to-detect-mobile-browser
		var check = false;
		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
		return check
	}
	if(mobileCheck() && !$cookies.mobileokay) {
		window.location = 'https://canigraduate.uchicago.edu/mobile.php';
	}
});
// this is one thing that might've been easier with jquery...
app.service('TutorialService', function($q, $location, $rootScope, $cookies, $timeout, $interval, InterfaceManagerService, UserService, UserService, TimeschedulesService) {
	var tutorialElements = [], self = this;
	function annotate(id, textContent, options, d) {
		options = angular.extend({ backdrop:true, trigger:false, listen:false, watch:false, flip:false }, options);
		var defer = d || $q.defer();
		if(!document.getElementById(id)) {
			console.log("Waiting for " + id);
			setTimeout(function() { // try again in 1s
				annotate(id, textContent, options, defer);
			}, 1000);
			return defer.promise;
		}
		// do this once first
		var bounds = document.getElementById(id).getBoundingClientRect();
		bounds = {top:window.scrollY + bounds.top, bottom:window.scrollY + bounds.bottom, left:bounds.left, right:bounds.right, height:bounds.height, width:bounds.width};
		window.scrollTo(0, Math.max(bounds.top - 100, 0));
		var iterate = function() {
			if(!document.getElementById(id)) {
				$interval.cancel(clearInterval);
				return
			} // maybe it went awaaaay?
			tutorialElements.forEach(function(e) { e.remove() });
			var bounds = document.getElementById(id).getBoundingClientRect();
			bounds = {top:window.scrollY + bounds.top - 10, bottom:window.scrollY + bounds.bottom  + 10, left:bounds.left - 10, right:bounds.right + 10, height:bounds.height + 20, width:bounds.width + 20};
			var body = angular.element(document.body);
			// push overlayers on each of the sides
			var top = angular.element('<div class="tutorial-highlight"></div>')
				.css({top:0, left:0, width:'100%', height:bounds.top + 'px'});
			var left = angular.element('<div class="tutorial-highlight"></div>')
				.css({top:bounds.top + 'px', left:0, width:bounds.left + 'px', height:bounds.height + 'px'});
			var right = angular.element('<div class="tutorial-highlight"></div>')
				.css({top:bounds.top + 'px', left:bounds.right + 'px', width:(document.body.clientWidth - bounds.right) + 'px', height:bounds.height + 'px'});
			var bottom = angular.element('<div class="tutorial-highlight"></div>')
				.css({top:bounds.bottom + 'px', left:0, width:'100%', height:(document.body.clientHeight - bounds.bottom) + 'px'});
			if(options.backdrop) { body.append(top);body.append(left);body.append(right);body.append(bottom); }
			var text = angular.element('<div class="tutorial-text"></div>').html(textContent);
			if(options.flip) {
				text.css({top:'60px', left:20 + 'px', width:(bounds.left - 40) + 'px'});
			} else {
				text.css({top:'60px', left:(bounds.right + 20) + 'px', width:(document.body.clientWidth - bounds.right - 40) + 'px'});
			}
			// reappend it every time, it's easier
			var close = angular.element('<i class="fa fa-2x fa-times tutorial-close"></i>');
			close.on('click', function() { $interval.cancel(clearInterval);defer.reject();self.end() });
			body.append(text);
			body.append(close);
			tutorialElements = [top, left, right, bottom, text, close];
			// need to wait until trigger element resolved.
			if(options.trigger) {
				angular.element(document.getElementById(options.trigger)).on('click', function() {
					$interval.cancel(clearInterval);
					defer.resolve();
				})
			}
		};
		var clearInterval = $interval(iterate, 200); // TODO: pls no setinterval D:
		iterate(); // first iteration
		// good thing defer.resolve only resolves once?
		if(options.listen) {
			var unbind = $rootScope.$on(options.listen, function() {
				unbind();
				$timeout(function() {
					$interval.cancel(clearInterval);
					defer.resolve()
				}, 1000);
			})
		} else if(options.watch) {
			var unbind = $rootScope.$watch(options.watch, function(v) {
				if(v) {
					unbind();
					$interval.cancel(clearInterval);
					defer.resolve()
				}
			})
		}
		return defer.promise;
	}
	// helper function to make code cleaner
	function prepare(a, b, c) { return function() { return annotate(a, b, c) } }
	var userData = null;
	function triggerSave() {
		return function() {
			var defer = $q.defer();
			userData = angular.copy(UserService.serialize());
			defer.resolve(); // lol
			return defer.promise;
		}
	}
	var tutorial = [
		prepare('tutorial-import',
			'<p>Welcome to the <strong>Can I Graduate?</strong> tutorial! This tutorial will walk you through the basics of the site and all the features that you can take advantage of.</p><p>To stop the tutorial at any time, click the <i class="fa fa-times"></i> icon in the upper right hand corner.</p><p><strong>All of your changes you make during the tutorial will be undone automatically once the tutorial ends.</strong><p>Let\'s get started. Click the <kbd><i class="glyphicon glyphicon-import"></i> Import</kbd> button in the upper right hand corner.</p>', {
			trigger:'tutorial-import'
		}),
		prepare('tutorial-modal',
			'<p>The easiest way to get your data is to import it from my.uchicago.edu. Enter your CNetID and password, read the disclosure, then click <kbd>Import, please! :D</kbd> to continue.</p><p>The actual import process will take about 15 seconds to finish.</p>', {
			watch:function() { return UserService.classes.length > 0 },
			backdrop:false
		}),
		triggerSave(),
		prepare('tutorial-courses',
			'<p>On the left, you can see a list of all the courses you\'ve taken, including the courses you\'re scheduled to take this quarter. A blue row in this list indicates a course that was credited to you either under a placement test or conferred from AP/IB credit.</p><p>To write a review for a previous class you\'ve taken, you can click the blue <i class="fa fa-pencil"></i> icon on the left side of the row. Writing reviews adds data to the <strong>Can I Graduate?</strong> database, which helps other people make informed decisions about choosing which classes to take.</p><p>The number to the right indicates how many major requirements the class contributes to.</p><p>To delete a course, simply hover over the row and hit the <i class="fa fa-times"></i> button. Don\'t worry, you can always re-add it or re-import your data.</p><p>Remove one of your classes to continue.</p>', {
			listen:'user:remove-class'
		}),
		prepare('tutorial-courses-add',
			'<p>To add a course, you can do so by searching for the class in the input box to the left, then hitting the <kbd>Enter</kbd> key to add it.</p><p>Add any course to continue.</p>', {
			listen:'user:add-class'
		}),
		prepare('tutorial-common-sequences',
			'<p>Underneath your list of classes are a list of commonly taken sequences. These can help you toggle groups of classes more quickly.</p><p>Add a sequence to continue.</p>', {
			listen:'user:add-sequence'
		}),
		prepare('tutorial-courses',
			'<p>You should now see the course you added as well as the sequence you added in your class list. Pretty straightforward stuff, right?</p><p>Click <a id="tutorial-next">here</a> to continue.</p>', {
			trigger:'tutorial-next'
		}),
		prepare('tutorial-right',
			'<p>On the right, you can view your progress with the college core and various majors, as well as searching for classes.</p><p>Each section will tell you how many classes you have left, as well as which classes you have left to complete. The GPA in the title bar represents your GPA for that major\'s set of classes.</p><p>Additionally, you can view the college catalog listing for each section (if available) and generate degree program worksheets for majors to hand to your adviser.</p><p>Also, to change the sort order of the majors, double click the Majors or Minors tab.</p><p>Feel free to play around with the cores, majors, and minors tabs, and click the <kbd>Find Classes</kbd> tab when you\'re ready to continue.</p>', {
			watch:function() { return InterfaceManagerService.tabs[3] },
			flip:true
		}),
		prepare('tutorial-find-classes-filter',
			'<p>This tab lets you search for classes through all of timeschedules up to about Autumn 2002 (depending on CPU performance). Let\'s try and see if we can find a calc section we like this quarter. Try searching for classes in the math department that contain the world "calc".</p><p>Click the "departments" input box and add <kbd>MATH</kbd>, then in the search field, enter <kbd>calc</kbd> to continue.</p>', {
			flip:true,
			watch:function() { return InterfaceManagerService.find.filters.departments[0].name == 'MATH' && InterfaceManagerService.find.filters.search.toLowerCase() == 'calc' }
		}),
		prepare('tutorial-right',
			'<p>In the results below, you should see 13 entries, Calculus 130\'s, 150\'s, 160\'s, and a few other electives. In the results, look for <strong>MATH 526: Use of Calculators in Algebra</strong>. This class is greyed out because the last time it was offered was in Summer 2007, and <strong>Can I Graduate?</strong> thinks it won\'t be offered again.</p><p>Back to looking for calc sections, we\'re only concerned about this quarter, so hide the sections that don\'t meet this quarter.</p><p>Click <kbd>don\'t meet' + TimeschedulesService.quarters.active + '</kbd> to continue.', {
			flip:true,
			watch:function() { return InterfaceManagerService.find.filters.archive }
		}),
		prepare('tutorial-right',
			'<p>Ah, that\'s much better, only a few classes left. Let\'s take a look at calc 153.</p><p>Click on the <kbd>MATH 15300</kbd> row to continue.</p>', {
			flip:true,
			listen:'classes:toggle:MATH 15300'
		}),
		prepare('tutorial-right',
			'<p>Here, you can see the class description, any notes for the class, as well as the sections available, any evaluations submitted for the class, the known grade distribution for the class, and metadata about the class.</p><p>Also, if you hover over the section row, two icons appear to the right. With these, you can add the class to your schedule and add a watch for the class, which will notify you when the enrollment in the class changes.</p><p>But there are still too many sections and we don\'t want to spend time wading through ones we won\'t take. Let\'s show only Tuesday and Thursday sections (that is, hide M, W, F, Sa, Su, and ARR) because those sections are <em>the best</em>.</p><p>Click <kbd>M</kbd>, <kbd>W</kbd>, <kbd>F</kbd>, <kbd>Sa</kbd>, <kbd>Su</kbd>, and <kbd>ARR</kbd> to continue.</p>', {
			flip:true,
			watch:function() { return angular.equals(InterfaceManagerService.find.filters.dow, {M:true, T:false, W:true, H:false, F:true, S:true, U:true, ARR:true}) }
		}),
		prepare('tutorial-right', '<p>Much nicer. Only a few sections meet our critera. Hover over one of the sections and add it to your schedule to continue. Don\'t worry, this won\'t affect your registration. If it prompts you, accept the scheduling conflict.</p>', {
			flip:true,
			listen:'scheduling:updated'
		}),
		prepare('tutorial-navigation', '<p>Now it was added to your schedule, so let\'s take a look at the scheduler.</p><p>Click the <kbd>Scheduler</kbd> tab to continue.</p>', {
			watch:function() { return $location.path() == '/scheduler' }
		}),
		prepare('tutorial-scheduler', '<p>Cool beans. This page shows your scheduler. It includes your currently registered classes (if you have any) highlighted in <span class="text-success">green</span> and that Calc 153 section we just added. You should also see it show up as a rectangle on the calendar below. Hover over each of the rows in the scheduling table and you can add/drop the classes, which actually adds/drops you into the class via the registrar, so you can register for classes without having to go through classes!</p><p><strong>Can I Graduate?</strong> differentiates between <em>scheduled</em> classes and <em class="text-success">registered</em> classes to permit you to plan out your schedule without having to worry about actually registering for them or reaching the four class limit. Note that you can\'t <em class="text-success">register</em> for more classes than the registrar allows, but you can <em>schedule</em> as many as you\'d like.</p><p>Additionally, you can view and buy textbooks for your classes by clicking the little book icon that appears when you hover over your registrations!</p><p>Click <a id="tutorial-next">here</a> to continue.</p>', {
			trigger:'tutorial-next'
		}),
		prepare('tutorial-scheduler-manual', '<p>Here, we can create a manual record. This is used for the "conflict with my schedule" filter on the find classes tab. For example, if you have work on Mondays and Wednesdays after 4p, excluding sections that meet then is easy! Just add that manual record and enable the schedule conflict filter.</p><p>Click <a id="tutorial-next">here</a> to continue.</p>', {
			trigger:'tutorial-next'
		}),
		prepare('tutorial-navigation', '<p>Now, let\'s take a look at the transcript page. Click the <kbd>Transcript</kbd> tab to go there.</p>', {
			watch:function() { return $location.path() == '/transcript' }
		}),
		prepare('tutorial-transcript', '<p>On this page, you can view your transcript for each quarter by clicking on each of the rows, as well as view your projected GPA targets by hovering over the graph below.</p><p>Explore the transcript page a bit, then click <a id="tutorial-next">here</a> to continue.</p>', {
			trigger:'tutorial-next'
		}),
		prepare('tutorial-navigation', '<p>Click the <kbd>Watches</kbd> tab to continue.</p>', {
			watch:function() { return $location.path() == '/watches' }
		}),
		prepare('tutorial-watches', '<p>From this page, you can see the class enrollment watches that you have signed up for. You can either add them directly from this page or use the <kbd><i class="fa fa-bell"></i> Add Watch</kbd> button in the sections on the "Find Classes" tab. You\'ll get an email to your <code>@uchicago.edu</code> email address whenever one of your watches gets triggered.</p><p>Click <a id="tutorial-next">here</a> to continue.</p>', {
			trigger:'tutorial-next'
		}),
		prepare('tutorial-save', '<p>The last thing we want to do is save our data so any changes we made, like adding classes to the schedule, aren\'t lost when we come back. Click the <kbd><i class="glyphicon glyphicon-export"></i> Save</kbd> button to continue.</p>', {
			trigger:'tutorial-save'
		}),
		prepare('tutorial-save-modal', '<p>From this page, you can encrypt your data and send it to the <strong>Can I Graduate?</strong> server to be saved. Note that this is optional, and if you don\'t want your data to be saved, you don\'t have to!</p><p>One last note, to log out and clear all of your data, simply go to Settings &gt; Logout. Note that this does not clear your saved data, and saved records will expire after one week of inactivity.</p><p>This concludes the <strong>Can I Graduate?</strong> tutorial. Feel free to play around with the remainder of the site, and I hope it helps your class planning at UChicago be less cumbersome.</p><p>Please send any feedback you have to kdwang@uchicago.edu, and visit my website at <a href="http://kevmo314.com" target="_blank">http://kevmo314.com/</a>.</p><p>Click <a id="tutorial-next">here</a> to end the tutorial.</p>', {
			trigger:'tutorial-next',
			backdrop:false
		})
	];
	self.start = function() { self.showStep(0) };
	self.showStep = function(i) {
		if(i == tutorial.length) {
			self.end()
		} else {
			tutorial[i]().then(function() { self.showStep(i + 1) });
		}
	};	
	self.end = function() {
		$cookies.tutorial = 'completed';
		tutorialElements.forEach(function(e) { e.remove() });
		if(userData) {
			UserService.deserialize(userData, TimeschedulesService.quarters.active);
		}
	};
});
app.controller('FindClassesCtrl', function($rootScope, $scope, $modal, WatchService, TimeschedulesService, UserService, ClassService, AUTHENTICATION, DEFAULT_FILTERS, parseSchedule) {
	// TODO: Abstract this to a service so the filter can be modified from outside the controller
	$scope.showDetails = {};
	$scope.toggleDetails = function(cls) {
		$scope.showDetails[cls] = !$scope.showDetails[cls];
		$scope.$emit('classes:toggle:' + cls);
	};
	$scope.watch = function(cls, index) {
		WatchService.open({ // separate object in case the user modifies the data, it shouldn't modify ts
			quarter:cls.quarter,
			section:cls.section,
			course:cls.id,
			activity:index
		});
	};
	$scope.findRecords = [];
	$scope.findRecordsSize = 0;
	$scope.getExecutionTime = function() { return Math.round(TimeschedulesService.lastFilterTime) };
	function invokeFilter(filter, page, size) {
		var merge = {}; // can't modify filter object due to $scope.$watch and recursion
		if(filter.conflict) { // construct an interval tree
			merge.conflict = new IntervalTree(5040); // middle of the week
			blocks = parseSchedule(UserService.getSchedulingBlocks(), true, true);
			for(var i = 0; i < blocks.length; i++) {
				merge.conflict.add(blocks[i][1], blocks[i][2]);
			}
		}
		TimeschedulesService.filter(angular.extend({}, filter, merge), UserService.getExclusionList(), size * page - size, size * page).then(function(data) {
			$scope.findRecordsSize = data.length;
			$scope.findRecords = data.slice(size * page - size, size * page);
		});
	}
	var dirty = false;
	var applyFilter = function() {
		if($scope.interface.tabs[3]) {
			dirty = false;
			invokeFilter($scope.interface.find.filters, $scope.interface.find.page, $scope.interface.find.pageSize);
		} else {
			dirty = true;
		}
	};
	$scope.$watch('interface.find', applyFilter, true);
	$scope.$on('timeschedules:updated', applyFilter);
	$scope.$watch('interface.tabs[3]', function(value) {
		if(value && dirty) { applyFilter() }
	});
	$scope.$watch(function() { return TimeschedulesService.quarters.active }, function() {
		if($scope.interface.find.filters.archive) { applyFilter() }
	});
	$scope.$on('scheduling:updated', function() {
		// we use on to simplify code and avoid unnecessary filters
		if($scope.interface.find.filters.conflict) { applyFilter() }
	});
	$scope.getOfferings = function(cls) {
		var offerings = {};
		for(var i = 0; i < cls.sections.length; i++) {
			var quarter = cls.sections[i].quarter.substring(0, 6);
			if(!(quarter in offerings)) { offerings[quarter] = cls.sections[i].quarter.slice(-4)	}
			if(offerings.length == 4) { break } // no need to search further
		}
		return offerings;
	};
	$scope.isArchived = function(cls) { // if a class hasn't been offered in four years
		return toTermOrdinal($scope.timeschedules.quarters.active) - toTermOrdinal(cls.sections[0].quarter) > 16;
	};
});
app.service('InterfaceManagerService', function(DEFAULT_FILTERS, ClassService, TimeschedulesService) {
	// a service to manage the right panel.
	var self = this;
	self.tabs = [];
	self.accordion = {};
	self.sortOrder = {};
	self.find = {
		filters:angular.copy(DEFAULT_FILTERS),
		page:1,
		pageSize:20
	};
	self.findClass = function(cls, forceQuarter) {
		self.tabs[3] = true;
		self.find.filters = angular.extend({}, DEFAULT_FILTERS, {search:cls});
		if(forceQuarter) {
			// forcing to an active quarter
			if(forceQuarter !== true) {
				TimeschedulesService.quarters.active = forceQuarter;
			}
			self.find.filters.archive = true;
		}
	};
	self.findMajor = function(major) {
		self.tabs[1] = true;
		self.accordion[major] = true;
	};
	self.findQuarter = function(quarter) {
		if(TimeschedulesService.quarters.available.indexOf(quarter) != -1) {
			TimeschedulesService.quarters.active = quarter;
			self.tabs[3] = true;
			self.find.filters = angular.extend({}, DEFAULT_FILTERS, {archive:true});
		}
	};
});
app.controller('ManualRecordCtrl', function($scope, UserService, TimeschedulesService) {
	var clear = function(value) {
		$scope.data = {
			index:-1,
			id:'',
			quarter:value,
			section:null,
			primary:[{
				type:'',
				location:'',
				instructor:'Manual Record',
				schedule:[],
				enrollment:[1,1]
			}],
			secondary:[],
			secondary_collapsed:[]
		};
	};
	$scope.$watch(function() { return TimeschedulesService.quarters.active }, clear);
	$scope.dow = {M:false, T:false, W:false, H:false, F:false, S:false, U:false};
	$scope.from = new Date();
	$scope.to = new Date();
	$scope.createRecord = function() {
		var start = $scope.from.getHours() * 60 + $scope.from.getMinutes();
		var end = $scope.to.getHours() * 60 + $scope.to.getMinutes();
		angular.forEach($scope.dow, function(dow, value) {
			if(value) {
				this.push(dow + ':' + start + ':' + end);
			}
		}, $scope.data.primary[0].schedule);
		if($scope.data.primary[0].schedule.length > 0) {
			$scope.data.primary[0].schedule = $scope.data.primary[0].schedule.join('|');
			UserService.schedule.add($scope.data);
		}
		clear($scope.$parent.timeschedules.quarters.active);
	};
});
app.factory('SocketFactory', function($rootScope) {
	var socket = null; //io.connect('https://canigraduate.uchicago.edu:1820');
	return {
		on:function(eventName, callback) {
			console.log(eventName);
/*			socket.on(eventName, function() {
				var args = arguments;
				$rootScope.$apply(function() {
					callback.apply(socket, args);
				});
			});*/
		},
		emit:function(eventName, data, callback) {
			console.log(eventName);
/*			socket.emit(eventName, data, function() {
				var args = arguments;
				$rootScope.$apply(function() {
					if(callback) {
						callback.apply(socket, args);
					}
				});
			});*/
		}
	}
});
app.controller('EvaluationsCtrl', function($scope, ClassService, EvaluationService) {
	$scope.getName = function(c) { return (c in ClassService.data ? ClassService.data[c].name : 'Elective') };
	$scope.searchClasses = ClassService.search;
	// this is just for convenience
	// TODO: move to directive or something
	$scope.child = {evaluations:{official:[]}};
	$scope.loadEvaluation = function(id) {
		EvaluationService.getOfficial(id).then(function(data) {
			$scope.child.classes = id;
			$scope.child.evaluations.official = data
		});
	};
});
app.controller('ExchangeCtrl', function($q, $scope, $http, $modal, ClassService, WatchService, TimeschedulesService, AUTHENTICATION, SocketFactory) {
	$http.get('/data/status.php').success(function() {
		$scope.negotiationServer = true
	});
	var cancel = null;
	function updateCourses(value) {
		if(value != '' && AUTHENTICATION.cnetid != '') {
			$scope.availableCourses = null;
			if(cancel) { cancel.resolve() }
			cancel = $q.defer();
			$http.post('/data/registration.php',
				angular.extend({quarter:value}, AUTHENTICATION),
				{timeout:cancel.promise}).success(function(data) {
				$scope.availableCourses = data.courses;
			});
		}
	}
	$scope.authentication = AUTHENTICATION;
	$scope.watches = WatchService;
	$scope.$watch(function() { return AUTHENTICATION.cnetid }, function(value) {
		if(value != '') { WatchService.refresh() }
		SocketFactory.emit('authentication', AUTHENTICATION);
		updateCourses($scope.offer.quarter);
	});
	$scope.add = function() {
		WatchService.open({ // separate object in case the user modifies the data, it shouldn't modify ts
			quarter:TimeschedulesService.quarters.active,
			section:'',
			course:'',
			activity:''
		});
	};
	$scope.offers = [];
	$scope.offer = {quarter:TimeschedulesService.quarters.active};
	$scope.quarters = TimeschedulesService.quarters.available;
	$scope.availableCourses = null;
	$scope.$watch('offer.quarter', updateCourses);
	$scope.getName = function(c) { return (c in ClassService.data ? ClassService.data[c].name : '') };
	$scope.submit = function() {
		SocketFactory.emit('offer:create', $scope.offer);
	};
	$scope.cancel = function(offer) {
		SocketFactory.emit('offer:remove', offer);
	};
	SocketFactory.on('offer:index', function(data) {
		$scope.offers = data
	});
	SocketFactory.on('negotiation:receive', function(data) {
		console.log(data);
	});
	$scope.negotiate = function(offer) {
		$modal.open({
			templateUrl:'/templates/modals/negotiate.html',
			controller:function($scope, $modalInstance, offers, quarters) {
				$scope.$watch('negotiation.quarter', function(quarter) {
					$scope.availableCourses = null;
					$http.post('/data/registration.php', angular.extend({quarter:quarter}, AUTHENTICATION)).success(function(data) {
						for(var i = 0; i < data.courses.length; i++) {
							for(var j = 0; j < offers.length; j++) {
								if(offers[j].cnetid == AUTHENTICATION.cnetid
									&& offers[j].quarter == offer.quarter
									&& offers[j].id == data.courses[i].id) {
									data.courses[i].disabled = true;
								}
							}
						}
						$scope.availableCourses = data.courses;
					});
				});
				$scope.quarters = quarters;
				$scope.offer = offer;
				$scope.negotiation = {cnetid:AUTHENTICATION.cnetid, quarter:offer.quarter};
			},
			resolve:{
				quarters:function() { return TimeschedulesService.quarters.available },
				offers:function() { return $scope.offers }
			}
		}).result.then(function(negotiation) {
			offer.negotiation = negotiation;
			SocketFactory.emit('negotiation:create', offer);
		});
	};
});
app.controller('ClassInfoCtrl', function($scope, $http, UserService, ClassService) {
	$scope.getNextQuarter = function(cls) {
		var limit = cls.displayLimit || 0;
		if(cls.sections[limit]) {
			var compare = cls.sections[limit].quarter.slice(-4);
			for(var i = limit; i < cls.sections.length; i++) {
				if(cls.sections[i].quarter.slice(-4) != compare) {
					return i;
				}
			}
		}
		return cls.sections.length;
	};
	var notesCache = {};
	$scope.getNotes = function(cls, section) {
		// not included in timeschedules data because of lazy loading
		if(!section.notes) {
			var key = section.quarter+cls.classes;
			if(key in notesCache) {
				// be a little more aggressive in reducing the number of requests
				if(isString(notesCache[key])) {
					section.notes = notesCache[key];
				} else {
					notesCache[key].push(section);
				}
			} else {
				notesCache[key] = [section];
				$http.post('/data/notes.php', {id:cls.classes, quarter:section.quarter}).success(function(data) {
					if(!cls.notes) {
						cls.notes = data; // populate with the most recent notes, this will be the first quarter/year
					}
					for(var i = 0; i < notesCache[key].length; i++) {
						notesCache[key][i].notes = data;
					}
				});
			}
		}
	};
});
app.controller('AirTrafficCtrl', function($scope, $http, $location, $modal, $cookies, $cookieStore, parseSchedule, TimeschedulesService, SchedulingFactory, LocationService, TranscriptFactory, RegistrationFactory, ClassService, RequirementService, UserService, RecommendationService, SequenceService, StorageService, EvaluationService, TutorialService, TextbookService, AUTHENTICATION, COLORS, DEFAULT_FILTERS) {
	$scope.startTutorial = TutorialService.start;
	$scope.colors = COLORS;
	$scope.classes = ClassService.keys;
	$scope.departments = ClassService.departments;
	$scope.requirements = RequirementService.data;
	$scope.getRequirements = RequirementService.getItems;
	$scope.getSpecializations = RequirementService.getSpecializations;
	$scope.major_count = RequirementService.majors;
	$scope.minor_count = RequirementService.minors;
	$scope.timeschedules = TimeschedulesService;
	$scope.textbooks = TextbookService;
	$scope.$watch('timeschedules.quarters.active', function(value, old) {
		if(value != '') {
			if(old == '' && $cookies.key) {
				StorageService.load($cookies.key, value); // we have quarter data, load
			} else { // quarter changed, handle appropriately
				if(!(value in UserService.scheduleCache)) {
					UserService.scheduleCache[value] = new SchedulingFactory(value);
				}
				UserService.schedule = UserService.scheduleCache[value];
				if(AUTHENTICATION.cnetid != '') {
					UserService.registration = new RegistrationFactory(value);
				}
			}
		}
	});
	$scope.classWeights = ClassService.weight;
	$scope.sequences = SequenceService.data;
	$scope.remainingClassesCount = UserService.getRemainingCount;
	$scope.isExplicitClass = function(name) {
		return isString(name) && name.length == 10;
	};
	$scope.isElectiveClass = function(name) {
		return isString(name) && name.length < 10;
	};
	$scope.getName = function(name) {
		if(!name || name.length != 10) {
			return "Elective";
		} else {
			// return undefined so angular-once binds a temp watch
			return (name in ClassService.data ? ClassService.data[name].name : undefined);
		}
	};
	$scope.isCrosslisted = function(cls) { return ClassService.getCrosslists(cls).length > 0 };
	$scope.getCrosslists = ClassService.getCrosslists;
	$scope.recommendations = RecommendationService.data;
	$scope.user = UserService;
	($scope.evaluate = function() {
		RequirementService.evaluate(UserService.classes);
		RecommendationService.update();
	})();
	$scope.searchClasses = ClassService.search;
	$scope.isLeaf = function(e) {
		return e.classes && isString(e.classes);
	};
	$scope.isScheduled = function(cls) {
		var records = UserService.schedule.getRecords().concat(UserService.registration ? UserService.registration.getRecords() : []);
		return records.some(function(e) { return e.timeschedule.id == cls.id && e.timeschedule.section == cls.section });
	};
	$scope.authentication = AUTHENTICATION;
	$scope.load = function() {
		$modal.open({
			templateUrl:'templates/modals/load.html',
			backdrop:'static',
			controller:["$scope", "$modalInstance", function($modalScope, $modalInstance) {
				$modalScope.data = {str:'', cnet:$scope.authentication.cnetid, password:null, suppress_gpa:false};
				$modalScope.message = "";
				$modalScope.error = null;
				$modalScope.load = function() {
					if($modalScope.data.cnet != '' && $modalScope.data.password != '') {
						$modalScope.message = "Querying... (may take a while, usually ~15s)";
						$modalScope.error = null;
						$http.post('/superimport.php', $modalScope.data).success(function(response) {
							$scope.authentication.cnetid = $modalScope.data.cnet;
							$scope.authentication.password = $modalScope.data.password;
							// Load the registration data too
							UserService.registration = new RegistrationFactory(TimeschedulesService.quarters.active);
							$modalInstance.close(function() {
								UserService.load(response, TimeschedulesService.quarters.active);
								EvaluationService.run();
							});
						}).error(function(response) {
							$modalScope.error = response;
							$modalScope.message = "";
						});
					} else if($modalScope.data.str != '') {	
						$modalInstance.close(function() {
							$cookies.key = $modalScope.data.str;
							StorageService.load($modalScope.data.str, TimeschedulesService.quarters.active);
						});
					} else {
						$modalInstance.dismiss();
					}
				};
			}]
		}).result.then(function(callback) { callback() });
	};
	$scope.save = StorageService.save;
	$scope.forceIgnore = function(cls) {
		cls.force = !cls.force;
		RequirementService.evaluate(UserService.classes);
	};
	$scope.$watchCollection('user.classes', function() { $scope.evaluate() });
	$scope.getDescription = function(cls) {
		ClassService.loadData(cls);
		if(!cls.sections) { // this occurs for classes chosen outside of filter
												// atm that's pretty much just recommended courses.
			var filter = angular.extend({id:cls.classes}, DEFAULT_FILTERS);
			TimeschedulesService.filter(filter, UserService.getExclusionList(), 0, 1).then(function(data) {
				if(data.length) {
					cls.sections = data[0].sections;
				}
			});
		}
		if(!cls.evaluations) {
			// this ajax request is cheap, so just reissue it.
			cls.evaluations = true;
			EvaluationService.get(cls.classes).then(function(data) {
				cls.evaluations = data[cls.classes];
				cls.evaluations.ratings = angular.extend({
					'1.0':null, '1.3':null, '1.7':null, '2.0':null, '2.3':null,
					'2.7':null, '3.0':null, '3.3':null, '3.7':null, '4.0':null
				}, cls.evaluations.ratings);
				cls.evaluations.maxRating = 0;
				var ratings = [];
				for(var key in cls.evaluations.ratings) {
					ratings.push({gpa:+key, data:cls.evaluations.ratings[key]});
					if(cls.evaluations.ratings[key]) {
						for(var i = 0; i < cls.evaluations.ratings[key].length; i++) {
							cls.evaluations.maxRating = Math.max(cls.evaluations.maxRating, cls.evaluations.ratings[key][i]);
						}
					}
				}
				cls.evaluations.ratings = (cls.evaluations.maxRating ? ratings : null);
				cls.evaluations.official = [];
				EvaluationService.getOfficial(cls.classes).then(function(data) {
					cls.evaluations.official = data
				});
			});
		}
	};
	$scope.getCompletedCount = RequirementService.getCompletedCount;
	$scope.settings = $cookieStore.get('settings');
	$scope.$watch('settings', function(value) { if(value) { $cookieStore.put('settings', value) } }, true);
	$scope.showCongratulations = function() {
		var core = $scope.requirements['College Core'].total - $scope.requirements['College Core'].base;
		var majors = $scope.getCompletedCount('major');
		return core == 0 && majors > 0 && !$cookies.haveIGraduated;
	};
	$scope.closeCongratulations = function() {
		$cookies.haveIGraduated = 'yep';
	};
	$scope.logout = function() {
		var key = $cookies.key;
		var finalize = function() {
			$cookieStore.remove('key');
			TimeschedulesService.quarters.active = TimeschedulesService.quarters.available[0];
			UserService.reset(TimeschedulesService.quarters.active);
			if(key && key.length > 0) {
				$modal.open({
					templateUrl:'/templates/modals/logout.html',
					controller:function($scope) {
						$scope.key = key;
					}
				});
			}
		}
		if(!key) {
			$modal.open({
				templateUrl:'/templates/modals/logout-confirm.html'
			}).result.then(function(save) {
				if(save) {
					StorageService.save().then(finalize);
				} else {
					finalize();
				}
			});
		} else {
			finalize();
		}
	};
	$scope.$watchCollection('user.transcript.getRecords()', EvaluationService.refresh);
	$scope.evaluations = EvaluationService;
	$scope.generateWorksheet = function(major) {
		$modal.open({
			templateUrl:'/templates/modals/worksheet.html',	
			controller:function($scope) {
				$scope.search = function(value, limit) {
					var out = [];
					var search = RegExp.compile(value, 'i');
					for(var i = 0; i < UserService.classes.length; i++) {
						if(search.test(UserService.classes[i]) || search.test(ClassService.data[UserService.classes[i]].name)) {
							out.push(UserService.classes[i]);
							if(out.length >= limit) {
								break;
							}
						}
					}
					return out;
				}
				$scope.languages = Object.keys(LANGUAGES).map(function(k) { return LANGUAGES[k] });
				$scope.data = {
					heading:major, language:null,
					sosc:[], art:[], hum:[], civ:[], math:[], phys:[], bio:[], major:[], electives:[]
				};
				// try to populate the data
				var gpaComparator = function(a, b) {
					var gpa = UserService.transcript.getContextGPA(b) - UserService.transcript.getContextGPA(a);
					return gpa ? gpa : strcmp(a, b);
				};
				var core = angular.copy(RequirementService.data['College Core'].used);
				core.sort(gpaComparator);
				var languageCount = {};
				for(var i = 0; i < core.length; i++) {
					if(!$scope.data.language) {
						for(var dept in LANGUAGES) {
							if(core[i].startsWith(dept)) {
								if(!(dept in languageCount)) { languageCount[dept] = 0 }
								if(++languageCount[dept] >= 3) { $scope.data.language = LANGUAGES[dept] }
							}
						}
					}
					if(GROUPS.CORE_CIV.indexOf(core[i]) > -1) {
						$scope.data.civ.push(core[i]);
					} else if(core[i].startsWith("ART") || core[i].startsWith("CRWR ") || core[i].startsWith("TAPS ") || core[i].startsWith("MUSI ")) {
						$scope.data.art.push(core[i]);
					} else if(core[i].startsWith("HUMA ") && core[i] != 'HUMA 19100') {
						$scope.data.hum.push(core[i]);
					} else if(core[i].startsWith("SOSC ")) {
						$scope.data.sosc.push(core[i]);
					} else if(core[i].startsWith("BIOS ") || core[i].startsWith("NTSC ")) {
						$scope.data.bio.push(core[i]);
					} else if(core[i].startsWith("PHYS ") || core[i].startsWith("CHEM ") || core[i].startsWith("PHSC ")) {
						$scope.data.phys.push(core[i]);
					} else if(core[i].startsWith("CMSC ") || core[i].startsWith("MATH ") || core[i].startsWith("STAT ")) {
						$scope.data.math.push(core[i]);
					}
				}
				// add major classes
				var records = angular.copy(RequirementService.data[major].used);
				records.sort(gpaComparator);
				for(var i = 0; i < Math.min(RequirementService.data[major].total, records.length); i++) {
					$scope.data.major.push(records[i])
				}
				// add whatever classes
				// can we really apply any set of classes towards electives...?
				var classes = difference(difference(UserService.classes, records), core);
				classes.sort(gpaComparator);
				var numRequired = 27 - RequirementService.data[major].total;
				for(var i = 0; i < Math.min(numRequired, classes.length); i++) { $scope.data.electives.push(classes[i]) }
				// "unsort" each of the categories
				for(var category in $scope.data) { if($scope.data[category] && !isString($scope.data[category])) { $scope.data[category].sort() } }
				// pad the entries
				// TODO: smarter padding, see Applied Mathematics BS
/*				for(var i = records.length; i < RequirementService.data[major].total; i++) { $scope.data.major.push('') }
				$scope.data.major.push('   XXXX   ');
				for(var i = classes.length; i < numRequired; i++) { $scope.data.electives.push('') }
				$scope.data.electives.push('   XXXX   ');*/
			}
		});
	};
});
app.directive('dpwField', function(ClassService) {
	return {
		restrict:'E',
		scope:{ target:'=', search:'=' },
		template:'<div tooltip="{{getName(target)}}"><input type="text" typeahead="c as c+\' :: \'+getName(c) for c in search($viewValue, 20)" ng-model="target" class="form-control" style="font-family:monospace" typeahead-input-formatter="format($model)"/></div>',
		link:function(scope) {
			scope.getName = function(c) { return (c in ClassService.data ? ClassService.data[c].name : '') };
			scope.format = function(v) { return v  };
		}
	}
});
app.directive('json', function() {
	return {
		restrict: 'A',
		scope:{
			json:'='
		},
		link: function(scope, element, attr, ngModel) {
			scope.$watch('json', function(value) {
				element.text(JSON.stringify(value));
			}, true);
		}
	};
});
app.service('EvaluationService', function(UserService, ClassService, $http, $modal, $q, $cookies, AUTHENTICATION) {
	// Service to issue evaluation requests
	var self = this;
	self.data = [];
	self.get = function(classes) {
		if(isString(classes)) { return self.get([classes]) }
		else {
			var defer = $q.defer();
			$http.post('/data/rate.php', {action:'get', id:classes}).success(defer.resolve);
			return defer.promise;
		}
	};
	self.getOfficial = function(classes) {
		var defer = $q.defer();
		$http.post('/data/evaluations.php', angular.extend({id:classes}, AUTHENTICATION)).success(defer.resolve);
		return defer.promise;
	};
	var existingRequest;
	self.refresh = function() {
		var records = UserService.transcript.getRecords().map(function(e) { return e.id });
		var defer = $q.defer();
		if(records.length > 0) {
			if(existingRequest) { existingRequest.resolve() }
			existingRequest = $q.defer();
			$http.post('/data/rate.php', angular.extend({
				action:'check', id:records
			}, AUTHENTICATION), {timeout:existingRequest.promise}).success(function(result) {
				ClassService.onLoad(function() {
					self.data.clear();
					Array.prototype.push.apply(self.data, result.filter(function(e) { return e in ClassService.data }));
					self.data.sort();
				});
				defer.resolve(self.data);
			});
		} else {
			self.data.clear();
			defer.resolve(self.data);
		}
		return defer.promise;
	};
	self.run = function() {
		if(Math.random() < 0.5 && $cookies.tutorial) { // probability that an eval request will appear
			self.refresh().then(function(data) {
				self.showDialog(data[Math.floor(Math.random() * data.length)]);
			});
		}
	};
	var dialogOpen = false;
	self.showDialog = function(cls) {
		var index = self.data.binarySearch(cls);
		if(index > -1 && !dialogOpen) {
			dialogOpen = true;
			self.data.splice(index, 1);
			$modal.open({
				templateUrl:'/templates/modals/evaluation.html',
				controller:function($scope) {
					$scope.classes = ClassService.data;
					$scope.searchClasses = ClassService.search;
					$scope.data = {
						id:cls,
						rating:null,
						prerequisites:[],
						comment:''
					};
					$scope.hovering = function(value) {
						$scope.hoveringText = [
							'It was terrible, don\'t waste your tuition money.',
							'It was bad, but it could have been better.',
							'It was okay, I don\'t regret taking it.',
							'It was good, I enjoyed the class.',
							'It was fantastic, I would take it again if I could.'
						][value - 1];
					};
				}
			}).result.then(function(data) {
				dialogOpen = false;
				$http.post('/data/rate.php', angular.extend({action:'rate'}, data, AUTHENTICATION)).then(self.refresh);
			}, function() { dialogOpen = false;self.data.splice(index, 0, cls); });
		}
	};
});
app.service('StorageService', function($q, $cookies, $cookieStore, $modal, $interval, $http, UserService, TimeschedulesService, WatchService, EvaluationService, AUTHENTICATION) {
	// Service to store data to/from the canigraduate server
	var self = this;
	function generateRandomKey() {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		if(window.crypto && window.crypto.getRandomValues) {
			var array = new Uint32Array(40);
			window.crypto.getRandomValues(array);
			for(var i = 0; i < array.length; i++) {
				text += possible.charAt(array[i] % possible.length)
			}
		} else { // use a weak solution
			for(var i = 0; i < 40; i++) {
				text += possible.charAt(Math.floor(Math.random() * possible.length));
			}
		}
		return text;
	}
	$interval(function() {
		var settings = $cookieStore.get('settings');
		if(settings && settings.autosave && $cookies.key && $cookies.key.length > 0) {
			self.save($cookies.key); // save call is cheap. blindly do it, no diff.
		}
		// TODO: make this push/dirty flag instead of poll
	}, 60 * 1000);
	self.data = {};
	self.save = function(key) {
		var defer = $q.defer();
		if(key) {
			$http.post('/data/storage.php', {
				key:$cookies.key.substr(0, 8),
				value:CryptoJS.TripleDES.encrypt(JSON.stringify(UserService.serialize()), $cookies.key.substr(8)).toString()
			}).success(function(response) { angular.extend(self.data, response);defer.resolve(); });
		} else {
			$modal.open({
				templateUrl:'templates/modals/save.html',
				controller:function($scope) {
					$scope.data = $cookies;
					$scope.record = self.data;
					$scope.regenerate = function() { self.data.timestamp = null;$cookies.key = generateRandomKey() };
					$scope.save = function() {
						if(!$cookies.key) { $scope.regenerate() }
						self.save($cookies.key);
					};
				}
			}).result.then(defer.resolve);
		}
		return defer.promise;
	};
	self.load = function(key, quarter) {
		$http.post('/data/storage.php', {
			key:key.substr(0, 8)
		}).success(function(response) {
			var data;
			try{
				self.data = response;
				data = JSON.parse(CryptoJS.TripleDES.decrypt(response.data, $cookies.key.substr(8)).toString(CryptoJS.enc.Utf8));
			} catch(ex) {
				console.error('Failed to load from crypto');
				console.error(ex);
			}
			if(data) {
				UserService.deserialize(data, quarter);
			}
		});
	};
});
app.service('UserService', function($rootScope, ClassService, RequirementService, SchedulingFactory, TranscriptFactory, RegistrationFactory, parseSchedule, AUTHENTICATION) {
	var self = this;
	self.classes = [];
	self.credits = [];
	self.transcript = new TranscriptFactory();
	self.scheduleCache = {};
	self.schedule = null;
	self.registration = null;
	self.add = function(value) {
		if(ClassService.prefixCrosslistSearch(self.classes, value) == -1) {
			self.classes.push(value);
			self.classes.sort(); // meh, don't need that insertion point stuff. #yolo
			$rootScope.$broadcast('user:add-class');
			return true;
		} else {
			return false;
		}
	};
	self.toggleCredited = function(cls) {
		var index = self.credits.binarySearch(cls);
		if(index < 0) {
			self.credits.splice(~index, 0, cls);
		} else {
			self.credits.splice(index, 1);
		}
	};
	self.remove = function(cls) {
		self.classes.splice(prefixBinarySearch(self.classes, cls), 1);
		var ind = prefixBinarySearch(self.credits, cls);
		if(ind != -1) { self.credits.splice(ind, 1) }
		$rootScope.$broadcast('user:remove-class');
	};
	self.load = function(data, quarter) {
		var credits = SortedList.create({unique:true, compare:'string'});
		var classes = SortedList.create({unique:true, compare:'string'});
		self.transcript = new TranscriptFactory(data.transcript);
		data.placements.map(function(e) { return e.substring(1) }).forEach(function(e) {
			credits.insertOne(e);
			classes.insertOne(e);
		});
		data.transcript.filter(function(e) {
			return ((e.quality && e.gpa > 0) || e.gpa === null || e.gpa == 'P')
		}).forEach(function(e) { classes.insertOne(e.id) });
		self.classes.clear();
		self.credits.clear();
		Array.prototype.push.apply(self.classes, classes);
		Array.prototype.push.apply(self.credits, credits);
	};
	self.save = function() {
		return self.classes.map(function(e) {
			return self.credits.binarySearch(e) >= 0 ? '+' + e : e
		});
	};
	self.reset = function(quarter) {
		self.registration = null;
		self.scheduleCache = {};
		self.scheduleCache[quarter] = self.schedule = new SchedulingFactory(quarter);
		self.transcript = new TranscriptFactory();
		self.classes.clear();
		self.credits.clear();
		AUTHENTICATION.cnetid = '';
		AUTHENTICATION.password = '';
	};
	self.serialize = function() {
		var schedules = {};
		for(var quarter in self.scheduleCache) {
			schedules[quarter] = self.scheduleCache[quarter].getRecords();
		}
		return {
			authentication:AUTHENTICATION,
			classes:self.classes,
			credits:self.credits,
			transcript:self.transcript ? self.transcript.serialize() : null,
			scheduleCache:schedules
		};
	};
	self.deserialize = function(data, activeQuarter) {
		angular.extend(AUTHENTICATION, data.authentication);
		self.classes = data.classes;
		self.credits = data.credits;
		self.transcript = data.transcript ? new TranscriptFactory(data.transcript) : null;
		self.scheduleCache = {};
		if(!(activeQuarter in data.scheduleCache)) {
			self.scheduleCache[activeQuarter] = new SchedulingFactory(activeQuarter);
		}
		for(var quarter in data.scheduleCache) {
			self.scheduleCache[quarter] = new SchedulingFactory(quarter, data.scheduleCache[quarter]);
		}
		self.schedule = self.scheduleCache[activeQuarter];
		self.registration = new RegistrationFactory(activeQuarter);
	};
	self.isCredited = function(cls) {
		// thanks to no operater overloading, this is easier
		return prefixBinarySearch(self.credits, cls) != -1;
	};
	self.getSchedulingBlocks = function() {
		var blocks = [];
		if(self.schedule.getRecords().length) {
			blocks.push(self.schedule.getSchedulingBlocks());
		}
		if(self.registration && self.registration.getRecords().length) {
			blocks.push(self.registration.getSchedulingBlocks());
		}
		return blocks.join('|');
	};
	self.getRemainingCount = function() {
		var core = RequirementService.data['College Core'].total - RequirementService.data['College Core'].base;
		return 48 - self.classes.length + self.credits.length - core;
	};
	self.getExclusionList = function() {
		var data = [[], []];
		for(var i = 0; i < self.classes.length; i++) {
			context = data[self.isCredited(self.classes[i]) ? 1 : 0];
			context.push(self.classes[i]);
			var crosslists = ClassService.getCrosslists(self.classes[i]);
			for(var j = 0; j < crosslists.length; j++) {
				context.push(crosslists[j]); // precondition is that userClasses doesn't contain crosslists.
			}
		}
		data[0].sort();data[1].sort();
		return data;
	};
});
app.service('RecommendationService', function($http, UserService) {
	var self = this;
	self.data = [];
	self.update = function() {
		/*
		if(UserService.classes.length > 0) {
			$http.get('/data/recommendations.php?classes=' + UserService.classes.join('|')).success(function(data) {
				self.data.clear();
				for(var cls in data) {
					self.data.push({classes:cls});
				}
			});
		} else {
			self.data.clear();
		}
		*/
	};
});
app.service('SequenceService', function($rootScope, $http, UserService, ClassService) {
	var self = this;
	function Sequence(group) {
		this.toggle = function() {
			if(this.isActive()) {
				for(var i = 0; i < group.length; i++) {
					UserService.classes.splice(prefixBinarySearch(UserService.classes, group[i]), 1);
				}
			} else {
				for(var i = 0; i < group.length; i++) {
					var index = prefixBinarySearch(ClassService.keys, group[i]);
					if(index != -1) {
						UserService.add(ClassService.keys[index]);
					}
				}
				$rootScope.$broadcast('user:add-sequence');
			}
		};
		this.isActive = function() {
			return group.every(function(e) {
				return prefixBinarySearch(UserService.classes, e) > -1
			});
		};
	}
	self.data = {};
	$http.get('/data/sequences.json').success(function(data) {
		for(var title in data) {
			self.data[title] = new Sequence(data[title]);
		}
	});
});
app.service('TextbookService', function($http, $modal, $q, ClassService) {
	var self = this;
	var toISBN10 = function(isbn13) {
		var start = isbn13.substring(3, 12), sum = 0, mul = 10;
		for(var i = 0; i < 9; i++) {
			sum = sum + ((10 - i) * parseInt(start[i]));
		} 
		var checkDig = 11 - (sum % 11);
		if (checkDig == 10) {
			checkDig = "X";
		} else if (checkDig == 11) {
			checkDig = "0";
		}
		return start + checkDig;
	};
	self.open = function(cls, verbose) {
		if(verbose) {
			// open modal then fetch data
			$modal.open({
				templateUrl:'/templates/modals/textbook.html',
				controller:function($scope, $modalInstance) {
					$scope.name = ClassService.data[cls.id].name;
					$scope.toISBN10 = toISBN10;
					self.get($scope.data = cls).then(function(data) {
						$scope.textbooks = data
					});
				}
			});
		} else {
			// fetch data then conditionally open modal
			self.get(cls).then(function(data) {
				if(data.length) {
					$modal.open({
						templateUrl:'/templates/modals/textbook.html',
						controller:function($scope, $modalInstance) {
							$scope.data = cls;
							$scope.name = ClassService.data[cls.id].name;
							$scope.textbooks = data;
							$scope.toISBN10 = toISBN10;
						}
					});
				}
			});
		}
	};
	self.get = function(cls) {
		var defer = $q.defer();
		if('textbooks' in cls && cls.textbooks) {
			defer.resolve(cls.textbooks)
		} else {
			$http.post('/data/textbooks.php', cls).success(function(data) {
				cls.textbooks = data;
				defer.resolve(data);
			})
		}
		return defer.promise;
	};
});
app.service('WatchService', function($http, $modal, TimeschedulesService, ClassService, AUTHENTICATION) {
	var self = this;
	self.data = [];
	self.apply = function(response) {
		self.data = response;
	};
	self.open = function(data) {
		$modal.open({
			templateUrl:'/templates/modals/add-watch.html',
			controller:function($scope, $modalInstance) {
				$scope.quarters = TimeschedulesService.quarters.available;
				$scope.searchClasses = ClassService.search;
				$scope.authentication = AUTHENTICATION;
				$scope.data = data;
				$scope.matches = function() {
					return /[A-Z]{4} \d{5}/.test($scope.data.course);
				};
			}
		}).result.then(self.add);
	};
	self.add = function(data) {
		$http.post('/data/watches.php', angular.extend({
			action:'add'
		}, AUTHENTICATION, data)).success(self.apply);
	};
	self.remove = function(data) {
		if(!data) {
			self.data.forEach(self.remove);
		} else {
			$http.post('/data/watches.php', angular.extend({
				action:'remove'
			}, AUTHENTICATION, data)).success(self.apply);
		}
	};
	self.refresh = function() {
		$http.post('/data/watches.php', AUTHENTICATION).success(self.apply);
	};
});
app.service('ClassService', function($rootScope, $http, $injector, DEFAULT_FILTERS) {
	var self = this;
	self.data = {}, self.keys = [], self.departments = [], self.weight = {};
	self.onLoad = function(callback) {
		if(self.keys.length > 0) {
			callback(); // short circuit, we've already loaded
		} else {
			$rootScope.$on('ClassService:load', callback);
		}
	}
	var start = getTime();
	$http.get('/data/classes.json').success(function(data) {
		var end = getTime();
		if(end - start > 25 * 1000) {
			// connection speed slower than ~100KB/s + overhead, prompt?
			console.error('Slow connection detected');
		}
		angular.extend(self.data, data); // can't use concat because need to maintain same ref
		Array.prototype.push.apply(self.keys, Object.keys(data));
		self.keys.sort();

		// construct the sorted department set
		var departments = SortedList.create([], { unique:true, compare:'string' });
		self.keys.forEach(function(e) {
			departments.insertOne(e.substring(0, 4));
			// sort the crosslistings
			self.data[e].crosslist.sort();
		});
		departments.forEach(function(e) { self.departments.push(e) });

		// postprocess class weights
		// (perhaps haphazardly) assume preprocess in RequirementService finished
		// TODO: relax this assumption
		(function postprocess() {
			var append = Object.keys(self.weight).filter(function(e) { return e.length < 10 });
			// TODO: make faster, O(n^2 log^2 n) right now
			for(var i = 0; i < append.length; i++) {
				var ap = append[i];
				// for each class that matches the prefix pattern
				for(var ind = prefixBinarySearch(self.keys, ap); ind != -1 && self.keys[ind].startsWith(ap); ind++) {
					var cl = self.keys[ind], merged = [];
					var left = (cl in self.weight ? self.weight[cl] : []), rightPtr = 0;
					// merge two sorted lists
					while(left.length > 0 || rightPtr < self.weight[ap].length) {
						var element = null;
						if(left.length == 0) {
							element = self.weight[ap][rightPtr++];
						} else if(rightPtr == self.weight[ap].length || left[0] < self.weight[ap][rightPtr]) {
							element = left.shift();
						} else {
							element = self.weight[ap][rightPtr++];
						}
						if(merged.binarySearch(element) < 0) {
							merged.push(element);
						}
					}
					self.weight[cl] = merged;
				}
				delete self.weight[ap]; // hang the leftover node
			}
		})();
		$rootScope.$emit('ClassService:load');
	});
	self.getCrosslists = function(cls) {
		var ind = prefixBinarySearch(self.keys, cls);
		return (ind != -1 ? self.data[self.keys[ind]].crosslist : []);
	};
	self.prefixCrosslistSearch = function(context, search) {
		// can't binary search, must linear search
		for(var i = 0; i < context.length; i++) {
			var index = prefixBinarySearch(self.keys, context[i]);
			if(index != -1) {
				if(self.keys[index].startsWith(search)) {
					return i;
				} else {
					var crosslists = self.data[self.keys[index]].crosslist;
					for(var j = 0; j < crosslists.length; j++) {
						var crosslistIndex = prefixBinarySearch(self.keys, crosslists[j]);
						if(crosslistIndex != -1 && self.keys[crosslistIndex].startsWith(search)) {
							// the crosslist starts with the search string
							return i;
						}
					}
				}
			} else {
				// artificial class
				if(context[i].startsWith(search)) {
					return i;
				}
			}
		}
		return -1;
	};
	self.search = function(value, limit) {
		var out = [];
		var search = RegExp.compile(value, 'i');
		for(var i = 0; i < self.keys.length; i++) {
			if(search.test(self.keys[i]) || search.test(self.data[self.keys[i]].name)) {
				out.push(self.keys[i]);
				if(out.length >= limit) {
					break;
				}
			}
		}
		return out;
	};
	self.descriptions = {};
	self.distributions = {};
	self.distributionCount = {};
	self.loadData = function(cls) {
		if(cls.loaded) { return }
		cls.loaded = true; // prevent race conditions as much as possible
		if(!cls.description) {
			if(cls.classes in self.descriptions) {
				cls.description = self.descriptions[cls.classes];
			} else {
				$http.get('/data/descriptions.php?class=' + cls.classes).success(function(data) { cls.description = self.descriptions[cls.classes] = data; });
			}
		}
		if(!cls.distribution) {
			if(cls.classes in self.distributions) {
				cls.distribution = self.distributions[cls.classes];
				cls.distributionCount = self.distributionCount[cls.classes];
			} else {
				$http.get('/data/distribution.php?class=' + cls.classes).success(function(json) {
					const unmap = {
						'4':'A','3.7':'A-','3.3':'B+','3':'B','2.7':'B-','2.3':'C+','2':'C','1.7':'C-','1.3':'D+','1':'D'
					};
					if(cls.classes in json) {
						var data = [], max = 0;
						self.distributionCount[cls.classes] = 0;
						for(var grade in json[cls.classes]) {
							data.push([grade, json[cls.classes][grade]]);
							max = Math.max(max, json[cls.classes][grade]);
						}
						for(var i = 0; i < data.length; i++) {
							self.distributionCount[cls.classes] += data[i][1];
							data[i][1] /= max * 0.01;
						}
						cls.distributionCount = self.distributionCount[cls.classes];
						data.sort(function(a, b) { return parseFloat(b[0]) - parseFloat(a[0]) });
						cls.distribution = self.distributions[cls.classes] = data.map(function(e) {
							return [unmap[e[0]], e[1]]
						});
					}
				});
			}
		}
	};
});
app.service('RequirementService', function($http, ClassService) {
	var self = this;
	self.data = REQUIREMENTS;
	self.items = [];
	self.minors = 0;
	self.majors = 0;
	for(var major in self.data) {
		var record = self.data[major];
		// preprocess to make evaluation more efficient
		var isMajor = (major.indexOf('Minor') == -1 && major != 'College Core');
		(function preprocess(node, root) {
			if(node.classes && !isString(node.classes)) {
				for(var i = 0; i < node.classes.length; i++) {
					if(typeof node.classes[i] == 'string') {
						if(isMajor) {
							if(node.classes[i] in ClassService.weight) {
								if(ClassService.weight[node.classes[i]].binarySearch(major) < 0) {
									// enforce no multi-resolution
									ClassService.weight[node.classes[i]].push(major);
								}
							} else {
								ClassService.weight[node.classes[i]] = [major];
							}
						}
						node.classes[i] = {require:1, noCore:node.noCore, classes:node.classes[i]};
					} else {
						if(!('noCore' in node.classes[i])) {
							node.classes[i].noCore = node.noCore;
						}
						preprocess(node.classes[i], false);
					}
				}
				if(!root && isString(node.classes)) {
					node.classes.sort(function(left, right) {
						if(isString(left.classes) && isString(right.classes)) {
							if(left.classes.length == right.classes.length) {
								// sort alphabetically
								return strcmp(left.classes, right.classes);
							} else {
								// sort more specific first
								return right.classes.length - left.classes.length;
							}
						} else {
							// sort more demanding first
							return left.require - right.require;
						}
					});
				}
			}
		})(record, true);
		record.isMinor = (major.indexOf('Minor') != -1);
		record.isCore = (major == 'College Core');
		record.isSpecialization = (major.indexOf(':') != -1);
		if(record.isMinor) {
			record.type = 'minor';
			self.data[major.replace('Minor', '')] = record;
			self.minors++;
			delete self.data[major];
		} else if(record.isCore) {
			record.type = 'core';
		} else if(major.indexOf(':') != -1) {
			record.major = major.substring(0, major.indexOf(':'));
			major = major.substring(major.indexOf(':') + 1);
			record.type = 'specialization';
		} else {
			record.type = 'major';
			self.majors++;
		}
		// construct items, data bound by reference so evaluate still works.
		self.items.push({title:major.replace('Minor', ''), data:record});
	}
	self.getItems = function(major, alternateSort) {
		self.items.sort(function(a, b) {
			var diff = (a.data.total - a.data.base) - (b.data.total - b.data.base);
			return (alternateSort && diff ? diff : strcmp(a.title, b.title));
		});
		return self.items.filter(function(e) { return e.data.type == (major ? 'major' : 'minor') });
	};
	self.getSpecializations = function(major) {
		var out = self.items.filter(function(e) {
			return e.data.type == 'specialization' && e.data.major == major
		}); // don't affect the original self.items
		out.sort(function(a, b) { return strcmp(a.title, b.title) });
		return out;
	};
	self.getCompletedCount = function(type) {
		var count = 0;
		for(var m in self.data) {
			if(self.data[m].type == type && self.data[m].base == self.data[m].total) {
				count++;
			}
		}
		return count;
	};
	self.coreClasses = [];
	self.isCoreClass = function(cls) {
		// take advantage of the fact that any prefix indicates that the element will be inserted at the next index
		var index = self.coreClasses.binarySearch(cls);
		if(index < 0) {
			return ~index > 0 && cls.startsWith(self.coreClasses[~index  - 1]);
		} else {
			return cls.startsWith(self.coreClasses[index]);
		}
	};
	function expandCrosslistings(taken) {
		var out = [];
		for(var i = 0; i < taken.length; i++) {
			Array.prototype.push.apply(out, ClassService.getCrosslists(taken[i]));
			out.push(taken[i]);
		}
		out.sort();
		return out;
	}
	function revoke(node) {
		//console.log(node);
		node.complete = false;
		if(node.classes) {
			if(isString(node.classes)) {
				node.userClass = null;
			} else {
				node.total = node.base = 0;
				for(var i = 0; i < node.classes.length; i++) {
					revoke(node.classes[i]);
				}
			}
		}
	}
	// we have to do this via greedy because solving it with dp is too inefficient
	// and will only tell us if the solution exists or not, not the best solution.
	// 
	// ideally what we want to do is solve via dfs first, then if it fails, use greedy
	// to try and find a partial solution
	//
	// however, dfs is too slow. I think better heuristics will end up being the answer.
	self.evaluate = function(taken) {
		var takenWithCrosslistings = expandCrosslistings(taken);
		var userClasses;
		var coreClasses = [];
		var allCoreClasses = [];
		function evaluateChild(node, core, duplicates) {
			if(node.classes) {
				if(typeof node.classes == 'string') {
					if(node.evaluate) {
						node.message = node.evaluate(takenWithCrosslistings);
						if(node.message !== true) {
							// check if there's an evaluation function and if it fails, don't evaluate
							node.userClass = null;
							node.complete = node.force; // reset completion indicators
							return [(node.force ? 1 : 0), 1];
						}
					}
					var context = userClasses;
					if(duplicates || node.duplicates) { context = taken } // restore all classes
					if(node.noCore) { context = difference(context, coreClasses) }
					var has = ClassService.prefixCrosslistSearch(context, node.classes);
					if(node.classes.length == 6 && /2$/.test(node.classes) && has == -1) {
						// handle special case, 3xxxx classes replace 2xxxx classes
						has = ClassService.prefixCrosslistSearch(context, node.classes.substring(0, 5) + '3');
					}
					if(has != -1) {
						if(context == userClasses) { // edge case, don't need to relocate
							node.userClass = userClasses.splice(has, 1)[0]
						} else { // need to reidentify
							var index = prefixBinarySearch(userClasses, context[has]);
															// if index == -1, then it's not in userClasses. just indicate fulfiller
							node.userClass = (index == -1 ? context[has] : userClasses.splice(index, 1)[0]);
						}
						if(core) {
							coreClasses.push(node.userClass);
						}
					}
					// count up core classes
					if(self.coreClasses.length == 0 && core) { allCoreClasses.push(node.classes) }
					return [(node.complete = (has != -1) || node.force) ? 1 : 0, 1];
				} else {
					if(node.evaluate) {
						node.message = node.evaluate(takenWithCrosslistings);
						if(node.message !== true) {
							revoke(node);
							node.complete = node.force;
							return [(node.force ? node.require : 0), node.require];
						}
					}
					// cap is the total number of classes required to complete this subtree
					// count is the number of child nodes completed
					// base is the list of requirements fulfilled by child
					var cap = 0, count = 0, base = [];
					for(var i = 0; i < node.classes.length; i++) {
						var result = evaluateChild(node.classes[i], core, duplicates || node.duplicates);
						// if the child is done, increment the count
						if(node.classes[i].complete) { count++; }
						// if the index is less than the require count, add that node's require count to cap
						// recall that the set is "naturally" sorted. this says "let's fulfill the first node.require
						// requirements and assume we succeed with those"
						if(i < node.require) { cap += result[1]; }
						base.push(result[0]);
						// if we've exceeded our max limit, stop iterating
						if('max' in node && count >= node.max) { break; }
					}
					// sort descending
					base.sort(function(left, right) { return right - left; });
					// sum is the number of classes fulfilled
					var sum = 0;
					if(!node.force) {
						for(var i = 0; i < node.require; i++) {
							// stop counting if we reach an unfilled child
							if(!base[i]) {
								break;
							}
							sum += base[i];
						}
					} else {
						// if this node is forced, we just assume all classes fulfilled
						sum = cap;
					}
					node.complete = (count >= node.require) || node.force;
					node.count = Math.min(count, node.require);
					// node.base is the number of classes fulfilled so far on this node
					node.base = Math.min(cap, sum);
					if(node.complete) { node.hidden = true } // collapse the object
					else if(cap == node.base) { cap++ } // take care of edge condition where not finished,
					// but count matches. this occurs when predicted number of classes is n, but the student
					// decides to take the route that actually requires (n+k) classes. always show 1 remaining in that case.
					// this is most obviously observed in the core language requirement.
					return [node.base, (node.total = cap)]; // set the total to the cap
				}
			}
			return [0, 0];
		}
		for(var major in self.data) {
			userClasses = angular.copy(taken);
			// TODO: This can be switched to map/reduce, but at the expense of more iterations.
			// maybe put it in a web worker?
			self.data[major].total = 0;
			self.data[major].base = 0;
			var complete = true;
			for(var i = 0; i < self.data[major].classes.length; i++) {
				var result = evaluateChild(self.data[major].classes[i], major == 'College Core');
				complete = complete && (result[0] == result[1]);
				self.data[major].base += result[0];
				self.data[major].total += result[1];
			}
			self.data[major].complete = complete;
			self.data[major].used = difference(taken, userClasses); // for calculating major gpa
			if(major == 'College Core') {
				coreClasses.sort();
			}
		}
		if(self.coreClasses.length == 0) {
			allCoreClasses.sort();
			self.coreClasses = allCoreClasses;
		}
	};
});
app.factory('RegistrationFactory', function($rootScope, $http, $modal, $q, TimeschedulesService, ClassService, TextbookService, AUTHENTICATION) {
	return function(quarter) {
		var records = [], self = this;
		var hidden = [];
		self.loaded = false;
		function load(out) {
			var data = out.courses;
			records = data.map(function(e) {
				return {
					activity:e.activity,
					timeschedule:TimeschedulesService.find(e.id, e.section)
				}
			});
			$rootScope.$broadcast('scheduling:updated', self);
			self.loaded = true;
		}
		function response(data) {
			load(data);
			var errors = [];
			for(var i = 0; i < data.messages.length; i++) {
				if(data.messages[i][0] == 'error') {
					errors.push(data.messages[i][1]);
				}
			}
			if(errors.length > 0) {
				$modal.open({
					templateUrl:'/templates/modals/error.html',
					controller:function($scope, $modalInstance) { $scope.errors = errors }
				});
			}
			return errors.length == 0;
		}
		$http.post('/data/registration.php', angular.extend({quarter:quarter}, AUTHENTICATION)).success(load);
		self.toggle = function(record) {
			record.hidden = !record.hidden;
			$rootScope.$broadcast('scheduling:updated', self);
		};
		self.drop = function(record) {
			var defer = $q.defer();
			$modal.open({
				templateUrl:'/templates/modals/confirm-drop.html',
				controller:function($scope) {
					$scope.id = record.timeschedule.id;
					$scope.getName = function(c) { return (c in ClassService.data ? ClassService.data[c].name : '') };
				}
			}).result.then(function() {
				record.pending = true;
				$http.post('/data/registration.php', angular.extend({
					quarter:quarter,
					drop:[{
						id:record.timeschedule.id,
						section:record.timeschedule.section,
						activity:record.activity
					}]
				}, AUTHENTICATION)).success(function(data) {
					record.pending = false;
					if(response(data)) {
						defer.resolve(record);
					} else {
						defer.reject(record);
					}
				});
			}, defer.reject);
			return defer.promise;
		};
		self.add = function(record) {
			record.pending = true;
			var defer = $q.defer();
			$http.post('/data/registration.php', angular.extend({
				quarter:quarter,
				add:[{
					id:record.timeschedule.id,
					section:record.timeschedule.section,
					activity:record.activity
				}]
			}, AUTHENTICATION)).success(function(data) {
				record.pending = false;
				if(response(data)) {
					defer.resolve(record);
					TextbookService.open(record.timeschedule);
				} else {
					defer.reject(record);
				}
			});
			return defer.promise;
		};
		self.getRecords = function() { return records };
		self.getQuarter = function() { return quarter };
		self.getSchedulingBlocks = function() {
			var out = [];
			records.forEach(function(record) {
				if(!record.hidden) {
					record.timeschedule.primary.forEach(function(e) { out.push(e.schedule) });
					if(record.activity) {
						record.timeschedule.secondary[record.activity].forEach(function(e) { out.push(e.schedule) });
					}
				}
			});
			return out.join('|');
		};
	};
});
app.factory('TranscriptFactory', function() {
	return function(data) {
		var records = data || [], self = this;
		records.sort(function(a, b) {
			var termdelta = toTermOrdinal(a.quarter) - toTermOrdinal(b.quarter);
			return (termdelta == 0 ? strcmp(a.id, b.id) : termdelta);
		});
		var getTotalGPA = function(include, restrict) {
			return self.getRecords(include, restrict).filter(function(e) {
				return e.quality
			}).reduce(function(sum, e) {
				return sum + e.gpa
			}, 0);
		};
		self.serialize = function() { return data }; // used for serialization
		self.getRecords = function(include, restrict) {
			if(records.length == 0) { return [] }
			include = include || records[records.length - 1].quarter;
			var visited = false, i = 0, start = 0;
			for(; i < records.length; i++) {
				if(!visited && records[i].quarter == include) {
					start = i;
					visited = true;
				} else if(visited && records[i].quarter != include) {
					break;
				}
			}
			return records.slice((restrict ? start : 0), i);
		};
		self.getRecordCount = function(include, restrict) {
			if(records.length == 0) { return 0 }
			include = include || records[records.length - 1].quarter;
			var visited = false, count = 0;
			for(var i = 0; i < records.length; i++) {
				if(!visited && records[i].quarter == include) {
					visited = true;
				} else if(visited && records[i].quarter != include) {
					break;
				}
				if((!restrict || records[i].quarter == include) && records[i].quality) {
					count++;
				}
			}
			return count;
		};
		self.classesRemaining = Math.max(1, 48 - self.getRecordCount());
		self.getQuarters = function() {
			var set = {};
			records.forEach(function(e) { set[e.quarter] = true });
			return Object.keys(set);
		};
		self.getContextGPA = function(context) {
			var data = records.filter(function(e) {
				return context.indexOf(e.id) != -1 && e.quality
			}).map(function(e) {
				return e.gpa
			});
			return data.length ? data.reduce(sum) / data.length : 0;
		};
		self.getQuarterGPA = function(quarter) {
			return Math.round(getTotalGPA(quarter, true) * 100 / self.getRecordCount(quarter, true)) / 100;
		};
		self.getCumulativeGPA = function(include) {
			return records.length > 0 ? Math.round(getTotalGPA(include) * 100 / self.getRecordCount(include)) / 100 : 0;
		};
		self.getTargetGPA = function(target, remaining) {
			// cumulative * records.length + val * classesRemaining = target * 48
			return Math.round(100 * ((self.getRecordCount() + remaining) * target - getTotalGPA()) / remaining) / 100;
		};
		self.getEffectiveGPA = function(average, additional) {
			// suppose we fix val = average
			return (getTotalGPA() + average * additional) / (self.getRecordCount() + additional);
		};
	};
});
app.factory('SchedulingFactory', function($rootScope, $modal, $injector, $q, TimeschedulesService, ClassService, parseSchedule) {
	return function(quarter, data) {
		var self = this;
		var records = data || [];
		self.conflictCheck = function(record) {
			var defer = $q.defer();
			// TODO: fix the circular dependency
			var UserService = $injector.get('UserService');
			var intervals = new IntervalTree(5040);
			schedule = parseSchedule(UserService.getSchedulingBlocks(), true, true);
			for(var i = 0; i < schedule.length; i++) {
				// the registered blocks are larger, so we get better performance searching on that tree
				intervals.add(schedule[i][1], schedule[i][2]);
			}
			var intersects = false;
			// TODO: This is like the fifth time I've written this. abstraaaact.
			var checkScheduleIntersection = function(activity) {
				for(var i = 0; !intersects && i < activity.length; i++) {
					var schedule = parseSchedule(activity[i].schedule, true, true);
					for(var j = 0; !intersects && j < schedule.length; j++) {
						if(intervals.check(schedule[j][1], schedule[j][2])) {
							intersects = true;
						}
					}
				}
			};
			checkScheduleIntersection(record.timeschedule.primary);
			if(record.activity) {
				checkScheduleIntersection(record.timeschedule.secondary[record.activity]);
			}
			if(intersects) {
				$modal.open({
					templateUrl:'/templates/modals/conflict.html'
				}).result.then(function() { defer.resolve(record) }, defer.reject);
			} else {
				defer.resolve(record);
			}
			return defer.promise;
		};
		self.add = function(cls, index) {
			if('timeschedule' in cls) {
				// this is a registration record
				return self.add(cls.timeschedule, cls.activity);
			}
			if(cls.secondary_collapsed.length > 1) { // faster than obj.keys
				// prompt to choose a secondary
				if(!index) {
					$modal.open({
						templateUrl:'templates/modals/select-secondary.html',
						controller:function($scope, $modalInstance) {
							$scope.secondaries = cls.secondary;
							$scope.context = cls;
							$scope.id = cls.id;
							$scope.data = {selected:null};
							$scope.name = (cls.id in ClassService.data ? ClassService.data[cls.id].name : "");
						}
					}).result.then(function(index) { self.add(cls, index) });
				} else {
					self.conflictCheck({activity:index, timeschedule:cls}).then(function(record) {
						records.push(record)
					});
				}
			} else {
				self.conflictCheck({
					activity:(cls.secondary.length == 1 ? cls.secondary_collapsed[0].id : null),
					timeschedule:cls
				}).then(function(record) {
					records.push(record)
				});
			}
			$rootScope.$broadcast('scheduling:updated', self);
		};
		self.drop = function(record) {
			if('id' in record) {
				for(var i = 0; i < records.length; i++) {
					if(records[i].timeschedule.id == record.id) {
						records.splice(i, 1);
						$rootScope.$broadcast('scheduling:updated', self);
						return;
					}
				}
			} else {
				var index = records.indexOf(record);
				if(index != -1) {
					records.splice(index, 1);
					$rootScope.$broadcast('scheduling:updated', self);
				}
			}
		};
		self.getRecords = function() { return records }
		self.getSchedulingBlocks = function() {
			var out = [];
			for(var i = 0; i < records.length; i++) {
				var primaries = records[i].timeschedule.primary;
				for(var j = 0; j < primaries.length; j++) {
					out.push(primaries[j].schedule);
				}
				if(records[i].activity) {
					var secondaries = records[i].timeschedule.secondary[records[i].activity];
					for(var j = 0; j < secondaries.length; j++) {
						out.push(secondaries[j].schedule);
					}
				}
			}
			return out.join('|');
		};
	};
});
app.service('TimeschedulesService', function($rootScope, $http, $q, ClassService, RequirementService, parseSchedule) {
	var self = this;
	self.section_count = 0;
	self.activity_count = 0;
	self.status = '';
	var types = [], locations = [], timeschedules = [];
	function scheduleIntersects(filter, check) {
		for(var dow in filter) {
			if(typeof filter[dow] == 'boolean') {
				if(dow == 'ARR' && filter[dow] && check.length == 0) {
					return true;
				}
				if(filter[dow] && check.indexOf(dow) >= 0) {
					return true;
				}
			}
		}
		return false;
	}
	function toActivityObject(data) {
		var length = data.length;
		return {
			id:(length == 6 ? data[0] : null),
			type:data[length - 5],
			location:data[length - 4],
			instructor:data[length - 3].join('; '),
			schedule:data[length - 2],
			enrollment:data[length - 1]
		}
	}
	function checkScheduleFilter(dow, timeschedule) {
		var primaries = timeschedule[3];
		for(var i = 0; i < primaries.length; i++) {
			if(scheduleIntersects(dow, primaries[i][3])) {
				return true;
			}
		}
		var secondariesWorks = {};
		var secondaries = timeschedule[4];
		for(var i = 0; i < secondaries.length; i++) {
			var id = secondaries[i][0];
			if(!(id in secondariesWorks)) { secondariesWorks[id] = true }
			if(!secondariesWorks[id]) { continue }
			if(scheduleIntersects(dow, secondaries[i][4])) {
				// mark this id as failing
				secondariesWorks[id] = false;
			}
		}
		for(var id in secondariesWorks) {
			if(secondariesWorks[id]) {
				return false; // then the secondary is okay, do not discard
			}
		}
		return secondaries.length != 0;
	}
	function checkSearchFilter(search, timeschedule) {
		var id = timeschedule[1];
		var name = (id in ClassService.data ? ClassService.data[id].name.toLowerCase() : "");
		if(search instanceof RegExp) {
			return !search.test(id) && !search.test(name);
		} else {
			// use a slightly more relaxed filter. for example, searching german 10100 should work.
			var tokens = search.toLowerCase().split(' ');
			id = id.toLowerCase();
			for(var i = 0; i < tokens.length; i++) {
				if(id.indexOf(tokens[i]) == -1 && name.indexOf(tokens[i]) == -1) {
					return true;
				}
			}
			return false;
		}
	}
	function checkTagFilter(context, tag) {
		return context.every(function(e) { return e.value != tag });
	}
	function checkInstructorFilter(filter, timeschedule) {
		var vals = filter.map(function(e) { return e.value });
		var execute = function(record, index) {
			for(var i = 0; i < record.length; i++) {
				for(var j = 0; j < record[i][index].length; j++) {
					if(vals.binarySearch(record[i][index][j]) >= 0) {
						return false;
					}
				}
			}
			return true;
		}
		return execute(timeschedule[3], 2) && execute(timeschedule[4], 3);
	}
	function checkConflictFilter(filter, timeschedule) {
		var primaries = timeschedule[3];
		for(var i = 0; i < primaries.length; i++) {
			var schedule = parseSchedule(primaries[i][3], true, true);
			for(var j = 0; j < schedule.length; j++) {
				if(filter.check(schedule[j][1], schedule[j][2])) {
					return true;
				}
			}
		}
		var secondariesWorks = {};
		var secondaries = timeschedule[4];
		for(var i = 0; i < secondaries.length; i++) {
			var id = secondaries[i][0];
			if(!(id in secondariesWorks)) { secondariesWorks[id] = true }
			if(!secondariesWorks[id]) { continue } // don't bother checking
			var schedule = parseSchedule(secondaries[i][4], true, true);
			for(var j = 0; j < schedule.length; j++) {
				if(filter.check(schedule[j][1], schedule[j][2])) {
					secondariesWorks[id] = false;
					break;
				}
			}
		}
		for(var id in secondariesWorks) {
			if(secondariesWorks[id]) { return false }
		}
		return secondaries.length != 0;
	}
	function checkDeadFilter(prev, timeschedule) {
		// see isArchived
		return prev[1] != timeschedule[1] && toTermOrdinal(self.quarters.active) - toTermOrdinal(timeschedule[0]) > 16;
	}
	function checkFullFilter(timeschedule) {
		return timeschedule[3][0][4][0] == timeschedule[3][0][4][1];
	}
	function checkQuarterFilter(timeschedule, filter) {
		return filter[timeschedule[0].substring(0, 6).toUpperCase()];
	}
	function isFilterNecessary(filter) {
		for(var d in filter) {
			if(filter[d]) { return true }
		}
		return false;
	}
	self.lastExecutionTime = 0;
	self.instructors = SortedList.create([], {unique:true});
	var delayedFilter = false;
	self.filter = function(filter, exclusions, min, max) {
		var defer = $q.defer();
		var taken = exclusions[0], tested = exclusions[1];
		var out = [];
		var class_group = {};
		var checkDOW = isFilterNecessary(filter.dow);
		var checkQuarter = isFilterNecessary(filter.quarter);
		var start = getTime();
		var research = null;
		if(filter.search && filter.search.length > 0) {
			if(!(/^[a-zA-Z0-9\s]+$/i).test(filter.search) || /^\w{4} \d{5}$/i.test(filter.search)) {
				research = RegExp.compile(filter.search, 'i');
			} else {
				research = filter.search;
			}
		}
		var out = [], prev;
		for(var i = 0; i < timeschedules.length; i++) {
			var id = timeschedules[i][1];
			if(out.length > 0
			  && (out.length <= min || out.length > max)
			  && out[out.length - 1] == id) {
				continue; // a section has been added already, don't bother resolving
			}
			if(filter.id && filter.id != id) { continue }
			if(filter.taken && taken.binarySearch(id) >= 0) { continue }
			if(filter.tested && tested.binarySearch(id) >= 0) { continue }
			if(filter.archive && timeschedules[i][0] != self.quarters.active) { continue }
			if(checkQuarter && checkQuarterFilter(timeschedules[i], filter.quarter)) { continue }
			if(research && checkSearchFilter(research, timeschedules[i])) { continue }
			if(filter.departments.length > 0 && checkTagFilter(filter.departments, id.substring(0, 4))) { continue }
			if(filter.instructors.length > 0 && checkInstructorFilter(filter.instructors, timeschedules[i])) { continue }
			if(filter.core && RequirementService.isCoreClass(id)) { continue }
			if(filter.dead && prev && checkDeadFilter(prev, timeschedules[i])) { continue }
			if(checkDOW && checkScheduleFilter(filter.dow, timeschedules[i])) { continue }
			if(filter.conflict
			   && checkConflictFilter(filter.conflict, timeschedules[i])) { continue }
			if(filter.full && checkFullFilter(timeschedules[i])) { continue }
			// all good, add to dataset. good thing we're already sorted!
			prev = timeschedules[i];
			if(out.length >= min && out.length <= max) {
				// NB: if out.length == min, precondition we already know the id is different from the continue
				// also, min >= 0 which prevents the array oob error
				if(out.length == min || out[out.length - 1].classes != id) {
					// add a new record, push the id if it will cause it to exceed max
					out.push(out.length == max ? id : {classes:id, sections:[self.resolve(i)]});
				} else {
					// add to the existing record
					out[out.length - 1].sections.push(self.resolve(i));
				}
			} else {
				out.push(id); // the previous element is not the same id, we continued from precondition
			}
		}
		self.lastFilterTime = getTime() - start;
		defer.resolve(out); // this is leftover from legacy implementation when it was async
		return defer.promise;
	};
	self.find = function(id, section) {
		if(timeschedules.length == 0) { throw "Timeschedules Service not done loading" }
		for(var i = 0; i < timeschedules.length; i++) {
			if(timeschedules[i][1] == id && timeschedules[i][2] == section) {
				return self.resolve(i);
			}
		}
	};
	self.resolve = function(i) {
		var secondaries = {};
		for(var j = 0; j < timeschedules[i][4].length; j++) {
			var id = timeschedules[i][4][j][0];
			if(!(id in secondaries)) {
				secondaries[id] = [];
			}
			secondaries[id].push(timeschedules[i][4][j].slice(1));
		}
		for(var id in secondaries) {
			secondaries[id] = secondaries[id].map(toActivityObject);
		}
		var obj = {
			index:i,
			id:timeschedules[i][1],
			quarter:timeschedules[i][0],
			qid:toTermOrdinal(timeschedules[i][1]),
			section:timeschedules[i][2],
			primary:timeschedules[i][3].map(toActivityObject),
			secondary:secondaries,
			// for ease of templating:
			secondary_collapsed:timeschedules[i][4].map(toActivityObject)
		};
		obj.secondary_collapsed.sort(function(a, b) {
			var idcmp = strcmp(a.id, b.id);
			return (idcmp == 0 ? strcmp(a.type, b.type) : idcmp)
		});
		return obj;
	};
	self.quarters = {
		active:'', available:[]
	};
	function generatePromise(endpoint) {
		var d = $q.defer();
		$http.get(endpoint).success(d.resolve);
		return d.promise;
	}
	// attempt to load as many as possible
	var timeschedulesComparator = function(a, b) {
		var idcmp = strcmp(a[1], b[1]);
		if(idcmp) { return idcmp }
		var termcmp = toTermOrdinal(b[0]) - toTermOrdinal(a[0]);
		if(termcmp) { return termcmp }
		return strcmp(a[2], b[2]);
	}
	$http.get('/data/timeschedules-compressed/').success(function(quarters) {
		var processingTime = 0;
		self.quarters.active = quarters[0];
		self.quarters.available = quarters;
		timeschedules = [];
		(function process(index) {
			if(index != quarters.length) {
				var quarter = quarters[index];
				self.status = 'Loading ' + quarter + ' classes';
				$q.all([
					generatePromise('/data/timeschedules-compressed/' + quarter + '.json'),
					generatePromise('/data/timeschedules-compressed/' + quarter + '.data.json')
				]).then(function(data) {
					// process as many as possible in 1s for performance.
					var start = getTime();
					var ts = data[0], types = data[1][2], locations = data[1][1], instructors = data[1][0];
					for(var i = 0; i < ts.length; i++) {
						var record = ts[i];
						record.unshift(quarter); // insert the quarter
						// rebuild references
						for(var k = 0; k <= 1; k++) { // for primary and secondary, looks confusing, but all it does is resolve types, locations, instructors
							for(var j = 0; j < record[3 + k].length; j++) {
								record[3 + k][j][k] = types[record[3 + k][j][k]];
								record[3 + k][j][1 + k] = locations[record[3 + k][j][1 + k]];
								record[3 + k][j][2 + k] = record[3 + k][j][2 + k].map(function(e) { return instructors[e] });
								self.instructors.insert.apply(self.instructors, record[3 + k][j][2 + k]);
								record[3 + k][j][2 + k].sort();
							}
						}
						timeschedules.push(record);
						self.activity_count += Math.max(1, record[4].length);
					}
					self.section_count = timeschedules.length;
					processingTime += (getTime() - start);
					self.status = 'Loaded all classes after ' + quarter;
					process(processingTime <= 5000 ? index + 1 : quarters.length);
					// quick trick to make it look like data is loading faster
					if(index == 4) {
						timeschedules.sort(timeschedulesComparator);
						$rootScope.$broadcast('timeschedules:updated');
					}
				});
			} else {
				timeschedules.sort(timeschedulesComparator);
				$rootScope.$broadcast('timeschedules:updated');
			}
		})(0);
	});
});
app.directive('notes', function($rootScope, UserService, ClassService) {
	var re = /(\w{4}(\s)?)?\d{3,5}/g;
	return {
		restrict:'A',
		scope:{
			notes:'=',
			department:'='
		},
		template:'<span ng-repeat="cls in ::classes" tooltip="{{::cls.name}}" ng-class="cls.text" ng-click="open(cls)"><i class="fa" ng-class="::cls.icon" ng-if="::cls.icon"></i><span ng-if="::cls.icon"> </span><span ng-bind="::cls.id"></span></span>',
		link:function(scope, element, attrs) {
			scope.open = function(cls) {
				if(cls.name) {
					// make sure it's not just a text node
					$rootScope.interface.findClass(cls.id);
				}
			};
			scope.$watchGroup(['notes', 'department'], function() {
				scope.classes = [];
				var matches = [];
				while(m = re.exec(scope.notes)) { matches.push(m) }
				var transcript = UserService.transcript.getRecords(), activeDepartment = scope.department;
				var left = 0;
				for(var i = 0; i < matches.length; i++) {
					var length = matches[i][0].length;
					var id = matches[i][0].toUpperCase();
					var containsDepartment = true;
					if(id.match(/\w{4}\d{3,5}/)) {
						id = id.substring(0, 4) + " " + id.substring(4);
					} else if(id.match(/\d{3,5}/) && id.length <= 5) {
						id = activeDepartment + " " + id;
						containsDepartment = false;
					}
					for(var j = id.length; j < 10; j++) { id += "0" }
					var name = (id in ClassService.data ? ClassService.data[id].name : undefined);
					if(name) {
						// push the text node
						scope.classes.push({id:scope.notes.substring(left, matches[i].index)});
						// then push the identification node
						if(UserService.classes.binarySearch(id) >= 0) {
							scope.classes.push({id:id, icon:'fa-check', name:name, text:['text-success', 'pointer', 'text-nowrap']});
						} else if(transcript.filter(function(record) { return record.id == id }).length) {
							scope.classes.push({id:id, icon:'fa-minus', name:name, text:['text-warning', 'pointer', 'text-nowrap']});
						} else {
							scope.classes.push({id:id, icon:'fa-times', name:name, text:['text-danger', 'pointer', 'text-nowrap']});
						}
						if(containsDepartment) {
							activeDepartment = id.substring(0, 4);
						}
					} else {
						// just render it as a text node, we can't locate the record
						scope.classes.push({id:scope.notes.substring(left, matches[i].index + length)});
					}
					left = matches[i].index + length;
				}
				scope.classes.push({id:scope.notes.substring(left, scope.notes.length)});
			});
		}
	}
});
app.directive('toggle', function() {
	return {
		restrict:'E',
		transclude:'element',
		replace:true,
		scope: {
			target:'=',
			color:'@',
			disabled:'=',
			invert:'@'
		},
		template:'<button type="button" class="btn btn-xs btn-default" ng-class="{active:isActive}" ng-click="target=!target" ng-disabled="disabled" ng-transclude></button>',
		link:function(scope, element, attrs) {
			scope.$watch('target', function(value) {
				scope.isActive = (scope.invert ? !value : value);
				if(scope.color) {
					element.toggleClass('btn-' + scope.color, scope.isActive);
				}
			});
		}
	};
});
app.directive('compile', function($compile) {
	return function(scope, element, attrs) {
		scope.$watch(function(scope) {
			return scope.$eval(attrs.compile)
		}, function(value) {
			element.html(value);
			$compile(element.contents())(scope);
		});
	};
});
app.directive('enrollment', function($http) {
	return {
		restrict:'A',
		scope: { enrollment:'=', context:'=', activity:'=' },
		template:'<span tooltip="Data not available" ng-if="enrollment[0]==-1">?</span><span ng-if="enrollment[0]!=-1" ng-bind="::enrollment[0]"></span>/<span ng-if="enrollment[1]==-1">&infin;</span><span ng-if="enrollment[1]!=-1" ng-bind="::enrollment[1]"></span>',
		link:function(scope, element, attrs) {
			scope.$watchGroup(['context', 'activity'], function(v) {
				// update the enrollment data, timeschedules is potentially outdated
				$http.post('/data/enrollment.php', {
					quarter:scope.context.quarter,
					id:scope.context.id,
					section:scope.context.section,
					activity:scope.activity || ''
				}).success(function(data) {
					if('enrolled' in data) { // there may not be new data.
						scope.enrollment = [data.enrolled, data.capacity];
					}
				});
			});
		}
	};
});
app.service('LocationService', function($http) {
	var buildings = {};
	$http.get('/data/buildings.php').success(function(d) { buildings = d });
	this.find = function(name) {
		if(name in buildings) {
			return buildings[name];
		} else {
			return {name:''};
		}
	};
});
app.directive('location', function(LocationService) {
	return {
		restrict:'A',
		scope: { location:'=' },
		template:'<a tooltip="{{data.name}}" target="_blank" ng-href="{{data.link}}" ng-bind="::location"></a>',
		link:function(scope, element, attrs) {
			scope.data = {name:'', link:''};
			scope.$watch('location', function(value) {
				var cut = value.indexOf('-');
				scope.data = LocationService.find(cut == -1 ? value : value.substring(0, cut).trim());
			});
		}
	};
});
app.value('parseSchedule', function(value, toMinutes, byWeek) {
	var schedule = (value.length == 0 ? [] : value.split('|'));
	const dow = {M:0, T:1, W:2, H:3, F:4, S:5, U:6};
	// this is actually about 20% faster than map
	for(var i = 0; i < schedule.length; i++) {
		var e = schedule[i].split(':');
		if(byWeek) {
			schedule[i] = [
				e[0],
				(toMinutes ? +e[1] + 1440 * dow[e[0]] : moment(new Date(0, 0, 0, 0, +e[1] + 1440 * dow[e[0]], 0))),
				(toMinutes ? +e[2] + 1440 * dow[e[0]] : moment(new Date(0, 0, 0, 0, +e[2] + 1440 * dow[e[0]], 0)))
			]
		} else {
			schedule[i] = [
				e[0],
				(toMinutes ? +e[1] : moment(new Date(0, 0, 0, 0, +e[1], 0))),
				(toMinutes ? +e[2] : moment(new Date(0, 0, 0, 0, +e[2], 0)))
			]
		}
	}
	schedule.sort(function(a, b) {
		return dow[a[0]] != dow[b[0]] ? dow[a[0]] - dow[b[0]] : a[1] - b[1];
	});
	return schedule;
});
app.directive('schedule', function(parseSchedule) {
	return {
		restrict:'A',
		scope: { schedule:'=', expanded:'=' },
		template:'<a ng-repeat="s in parsed" class="label label-{{s.type}}" tooltip="{{s.start}}-{{s.end}}">{{s.dow}}</a>',
		link:function(scope, element, attrs) {
			scope.parsed = [];
			scope.$watch('schedule', function(data) {
				var schedule = parseSchedule(data);
				const map = {M:'M', T:'T', W:'W', H:'Th', F:'F', S:'Sa', U:'Su'};
				function toLabel(time) {
					var minutes = time.hours() * 60 + time.minutes();
					if(minutes < 10 * 60 + 30) { return 'warning' }
					if(minutes < 13 * 60 + 30) { return 'info' }
					if(minutes < 15 * 60) { return 'primary' }
					if(minutes < 16 * 60 + 30) { return 'danger' }
					return 'default';
				}
				for(var i = 0; i < schedule.length; i++) {
					var start = schedule[i][1].format('h:mma');
					var end = schedule[i][2].format('h:mma');
					scope.parsed.push({
						type:toLabel(schedule[i][1]),
						start:start,
						end:end,
						dow:map[schedule[i][0]] + (scope.expanded ? " " + start + "-" + end : "")
					});
				}
			});
		}
	};
});
app.filter('timeago', function() {
	return function(input) {
		return moment(input).fromNow();
	}
});
app.filter('fill', function() {
	return function(input) {
		while(input.length < 10) {
			input = input + 'x';
		}
		return input;
	}
});
app.value('dayOfWeekToOrdinal', function(d) { return "UMTWHFS".indexOf(d) + 1 });
app.directive('gpaVisualization', function() {
	return {
		restrict:'E',
		scope:{
			transcript:'='
		},
		template:'<svg height="270" width="100%" ng-mousemove="setTooltip($event)"><svg width="100%" height="100%" viewBox="0 0 4 54" preserveAspectRatio="none">'
			+ '<rect x="0" y="0" ng-attr-width="{{leftWidth}}" height="54" fill="#5cb85c"/>'
			+ '<rect ng-attr-x="{{leftWidth}}" y="0" ng-attr-width="{{rightWidth}}" height="54" fill="#d9534f"/>'
			+ '<rect shape-rendering="crispEdges" ng-attr-x="{{block.x}}" ng-attr-y="{{block.y}}" width="0.04" height="1" ng-attr-fill="{{block.fill}}" ng-repeat="block in blocks"/>'
			+ '<path vector-effect="non-scaling-stroke" ng-attr-d="{{path}}" stroke-width="1" stroke="red" fill="transparent" ng-repeat="path in paths"/>'
			+ '<path vector-effect="non-scaling-stroke" ng-attr-d="{{equivalentAveragePath}}" stroke-width="1" stroke="orange" fill="transparent" ng-if="equivalentAveragePath"/>'
			+ '<path vector-effect="non-scaling-stroke" ng-attr-d="{{equivalentTargetPath}}" stroke-width="1" stroke="blue" fill="transparent" ng-if="equivalentTargetPath"/>'
			+ '<line shape-rendering="crispEdges" vector-effect="non-scaling-stroke" ng-repeat="x in labels.x" ng-attr-x1="{{x}}" y1="52" ng-attr-x2="{{x}}" y2="54" stroke="black" stroke-width="1"/>'
			+ '<line shape-rendering="crispEdges" vector-effect="non-scaling-stroke" ng-repeat="y in labels.y" x1="3.9" ng-attr-y1="{{y}}" x2="4.0" ng-attr-y2="{{y}}" stroke="black" stroke-width="1"/>'
			+ '</svg>'
			+ '<text vector-effect="non-scaling-stroke" ng-repeat="x in labels.x" ng-attr-x="{{(25 * x) + \'%\'}}" y="258" text-anchor="middle" ng-bind="x.toFixed(1)" style="pointer-events:none"></text>'
			+ '<text vector-effect="non-scaling-stroke" ng-repeat="y in labels.y" x="97.5%" ng-attr-y="{{y * 5}}" text-anchor="end" alignment-baseline="central" ng-bind="y" style="pointer-events:none"></text>'
			+ '</svg><div class="text-center" compile="tooltip"></div>',
		link:function(scope, element, attrs) {
			scope.blocks = [];
			scope.paths = [];
			scope.tooltip = "Hover over the chart to view target data";
			scope.setTooltip = function(e) {
				var target = e.target || e.srcElement,
					rect = target.farthestViewportElement.getBoundingClientRect(), // rekt
					x = e.offsetX || (e.clientX - rect.left),
					y = e.offsetY || (e.clientY - rect.top);
				var gpaTarget = (4.0 * x / rect.width).toFixed(2);
				var classesRemaining = Math.ceil(54 * y / rect.height);
				var require = scope.transcript.getTargetGPA(gpaTarget, classesRemaining);
				if(require <= 0.0) {
					scope.tooltip = 'It is guaranteed to get a gpa above <span class="label label-primary">' + gpaTarget + '</span> with ' + classesRemaining + ' class' + (classesRemaining == 1 ? '' : 'es');
				} else if(require > 4.0) {
					scope.tooltip = 'It is impossible to get a gpa above <span class="label label-primary">' + gpaTarget + '</span> with ' + classesRemaining + ' class' + (classesRemaining == 1 ? '' : 'es');
				} else {
					scope.tooltip = 'To get a gpa above <span class="label label-primary">' + gpaTarget + '</span> with ' + classesRemaining + ' class' + (classesRemaining == 1 ? '' : 'es') + ', you must average above <span class="label label-warning">' + require + '</span>';
				}
				var equivalentAveragePath = [];
				var equivalentTargetPath = [];
				var effective = scope.transcript.getEffectiveGPA(gpaTarget, classesRemaining);
				for(var j = 0.01; j <= 54.01; j++) { // prevent divide by zero error
					var effectiveGPA = scope.transcript.getEffectiveGPA(require, j);
					if(effectiveGPA >= 0 && effectiveGPA <= 4) {
						equivalentAveragePath.push([effectiveGPA + " " + j]);
					}
					var targetGPA = scope.transcript.getTargetGPA(effective, j);
					if(targetGPA >= 0 && targetGPA <= 4) {
						equivalentTargetPath.push([targetGPA + " " + j]);
					}
				}
				scope.equivalentAveragePath = "M" + equivalentAveragePath.join(" L ");
				scope.equivalentTargetPath = "M" + equivalentTargetPath.join(" L ");
			};
			scope.labels = {
				x:[1.0, 1.3, 1.7, 2.0, 2.3, 2.7, 3.0, 3.3, 3.7],
				y:[12, 24, 36, 48]
			};
			scope.$watchCollection('transcript.getRecords()', function(value) {
				var baseline = scope.transcript.getCumulativeGPA();
				scope.leftWidth = baseline;
				scope.rightWidth = 4 - scope.leftWidth;
				scope.blocks.clear();scope.paths.clear();
				for(var i = 0; i < 54; i++) {
					// i = number of classes remaining, y axis
					for(var j = 0; j < 4.0; j += 0.04) {
						// j = gpa fraction, x axis
						var gpaTarget = j;
						var classesRemaining = i + 1;
						var require = scope.transcript.getTargetGPA(gpaTarget, classesRemaining);
						if(require <= 0.0 || require > 4.0) { continue }
						var obj = {x:gpaTarget,y:i};
						if(require < baseline) {
							var opacity = 1 - ((baseline - Math.max(0, require)) / baseline);
							opacity = 46 * opacity + 54;
							obj.fill = 'hsl(120, 39%, ' + opacity + '%)'
						} else {
							var opacity = 1 - ((Math.min(4, require) - baseline) / (4.0 - baseline));
							opacity = 42 * opacity + 58;
							obj.fill = 'hsl(2, 64%, ' + opacity + '%)'
						}
						scope.blocks.push(obj);
					}
				}
				// calculate equivalence paths
				for(var i = 0; i <= 4.0; i += 4.0) {
					var path = [];
					for(var j = 0; j <= 54; j += 0.1) {
						var require = scope.transcript.getEffectiveGPA(i, j);
						if(require >= 0 && require <= 4) {
							path.push([require + " " + j])
						}
					}
					scope.paths.push("M" + path.join(" L "));
				}
			});
		}
	};
});
app.directive('calendar', function(dayOfWeekToOrdinal, parseSchedule) {
	return {
		restrict:'E',
		transclude:true,
		templateUrl:'/templates/partials/calendar.html',
		link:function(scope, element, attrs) {
			scope.labels = [];
			// from 6a to 12p
			for(var i = 6; i <= 22; i++) {
				scope.labels.push({y:(i - 6) * 30, t:(((i - 1) % 12) + 1) + (i < 12 ? 'a' : 'p')});
			}
		}
	};	
});
app.directive('event', function(dayOfWeekToOrdinal, parseSchedule, COLORS) {
	return {
		restrict:'E',
		scope:{
			record:'=',
			index:'='
		},
		template:'<div ng-repeat="activity in activities" ng-style="activity.style" tooltip="{{activity.tooltip}}">{{record.timeschedule.id}}<br/>{{activity.type}}</div>',
		link:function(scope, element, attrs) {
			scope.activities = [];
			scope.$watchCollection(attrs.record, function(record) {
				scope.activities.clear();
				if(record.hidden) { return }
				var timeschedule = record.timeschedule;
				var activities = timeschedule.primary.concat(record.activity ? timeschedule.secondary[record.activity] : []);
				for(var j = 0; j < activities.length; j++) {
					var schedule = parseSchedule(activities[j].schedule, true);
					for(var k = 0; k < schedule.length; k++) {
						scope.activities.push({
							style:{
								position:'absolute',
								top:((schedule[k][1] - 360) / 2 + 15) + 'px',
								left:12.5 * dayOfWeekToOrdinal(schedule[k][0]) + '%',
								width:'12.5%',
								height:(schedule[k][2] - schedule[k][1]) / 2 + 'px',
								'background-color':COLORS[scope.index],
								color:'white',
								'font-size':'7pt',
								'text-align':'center',
								'border-radius':'2px'
							},
							type:activities[j].type,
							tooltip:activities[j].instructor + ", " + activities[j].location
						});
					}
				}
			});
		}
	};
});
