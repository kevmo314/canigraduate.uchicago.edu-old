<!DOCTYPE html>
<html ng-app="app" lang="en">
	<head>
		<title>Can I Graduate? | UChicago</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta charset="utf-8"/>
		<meta name="description" content="Automated graduation dependency resolution"/>
		<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"/>
		<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css"/>
		<link rel="stylesheet" href="/css/style.css"/>
		<base href="/"/>
	</head>
	<body ng-controller="AirTrafficCtrl" ng-class="::{'has-footer':true}">
		<header>
			<div ng-class="{'container':!settings.expanded, 'container-fluid':settings.expanded}" ng-cloak>
				<nav class="navbar">
					<div class="navbar-header">
						<button type="button" class="navbar-toggle" ng-click="isNavbarCollapsed=!isNavbarCollapsed">
							<i class="fa fa-navicon"></i>
						</button>
						<div class="navbar-brand">Can I Graduate?</div>
					</div>
					<div class="collapse navbar-collapse" collapse="!isNavbarCollapsed">
						<ul class="nav navbar-nav" id="tutorial-navigation">
							<nav-tab href="/">Courses</nav-tab>
							<nav-tab href="/scheduler">Scheduler</nav-tab>
							<nav-tab href="/exchange">Exchange</nav-tab>
							<nav-tab href="/evaluations">Evaluations</nav-tab>
							<nav-tab href="/transcript">Transcript</nav-tab>
						</ul>
						<div class="nav navbar-nav navbar-right">
							<span class="navbar-text" style="float:none" ng-bind="authentication.cnetid"></span>
							<button ng-click="load()" class="pointer btn btn-success navbar-btn" id="tutorial-import"><span class="glyphicon glyphicon-import"></span> Import</button>
							<button ng-click="save()" class="pointer btn btn-default navbar-btn" id="tutorial-save"><span class="glyphicon glyphicon-export"></span> Save</button>
							<div class="btn-group" dropdown>
								<button type="button" class="btn btn-primary dropdown-toggle">
									<i class="fa fa-cog"></i> Settings
								</button>
								<ul class="dropdown-menu" role="menu">
									<li><a href="#" ng-click="settings.expanded=!settings.expanded"><i ng-class="{'fa-check':settings.expanded}" class="fa"></i> Fluid Container</a></li>
									<li><a href="#" ng-click="settings.autosave=!settings.autosave"><i ng-class="{'fa-check':settings.autosave}" class="fa"></i> Autosave</a></li>
									<li class="divider"></li>
									<li><a href="https://docs.google.com/forms/d/15G6JTGfqqJs3CQIK0YZw0O0uEXqiqte9i8G0azIRn1U/viewform" target="_blank">Take Survey</a></li>
									<li><a href="#" ng-click="startTutorial()">Start Tutorial</a></li>
									<li class="divider"></li>
									<li><a href="#" ng-click="logout()">Logout</a></li>
								</ul>
							</div>
						</div>
					</div>
				</nav>
			</div>
			<div ng-if="::false" class="container">
				<nav class="navbar">
					<div class="navbar-header">
						<div class="navbar-brand">Can I Graduate?</div>
					</div>
				</nav>
			</div>
		</header>
		<div id="content-body">
		<div class="container text-center" ng-if="::false">
			<h1>Loading...</h1>
			<hr/>
			<p>This might take up to 10 seconds. Rome wasn't built in a day, y'know.</p>
			<p>So far, it's taken over a million days.</p>
			<strong>NOTE: This site is network-intensive. I don't recommend using it over a capped mobile data connection.</strong>
			<hr/>
			<p>Written by <a href="http://kevmo314.com/">Kevin Wang</a>. This site is not affiliated with The University of Chicago.</p>
		</div>
		<div ng-class="{'container':!settings.expanded, 'container-fluid':settings.expanded}" id="content" ng-cloak>
			<div class="row">
				<div class="col-md-6"><div ng-view></div></div>
				<div class="col-md-6" id="tutorial-right">
					<alert type="success" close="closeCongratulations()" ng-if="showCongratulations()"><i class="fa fa-graduation-cap"></i> Congratulations on graduating from UChicago! <a href="//portalapps.uchicago.edu/applyfordegree/?from=canigraduate" target="_blank">Apply for your degree.</a></alert>
					<tabset justified="true">
						<tab active="interface.tabs[0]">
							<tab-heading class="pointer">Core <span class="label label-danger" tooltip="Classes left" ng-hide="val.base == val.total">{{val.total - val.base}}</span></tab-heading>
							<br/>
							<accordion ng-init="key='College Core';val=requirements['College Core']">
								<accordion-group is-open="interface.accordion[key]" ng-init="interface.accordion[key]=true">
									<div ng-include="'accordion.html'"></div>
								</accordion-group>
							</accordion>
							<div class="text-center text-muted">Listed GPAs are estimates and may be higher depending on class selections.</div>
						</tab>
						<tab active="interface.tabs[1]">
							<tab-heading class="pointer" ng-dblclick="interface.sortOrder['major']=!interface.sortOrder['major']">Majors <span class="label label-success" tooltip="Majors completed" ng-if="getCompletedCount('major')" ng-bind="getCompletedCount('major')"></span></tab-heading>
							<br/>
							<accordion>
								<accordion-group ng-repeat="r in getRequirements(true, interface.sortOrder['major'])" is-open="interface.accordion[key]" ng-init="key=r.title;val=r.data">
									<div ng-include="'accordion.html'"></div>
								</accordion-group>
							</accordion>
							<div class="text-center text-muted">Listed GPAs are estimates and may be higher depending on class selections.</div>
						</tab>
						<tab active="interface.tabs[2]">
							<tab-heading class="pointer" ng-dblclick="interface.sortOrder['minor']=!interface.sortOrder['minor']">Minors <span class="label label-success" tooltip="Minors completed" ng-if="getCompletedCount('minor')" ng-bind="getCompletedCount('minor')"></span></tab-heading>
							<br/>
							<alert type="danger">UChicago does not permit a class counting towards both a minor and major. Declaring a minor shown as completed may disqualify you from a completed major.</alert>
							<accordion>
								<accordion-group ng-repeat="r in getRequirements(false, interface.sortOrder['minor'])" is-open="interface.accordion[key]" ng-init="key=r.title;val=r.data">
									<div ng-include="'accordion.html'"></div>
								</accordion-group>
							</accordion>
							<div class="text-center text-muted">Listed GPAs are estimates and may be higher depending on class selections.</div>
						</tab>
						<tab heading="Find Classes" ng-controller="FindClassesCtrl" active="interface.tabs[3]" id="tutorial-find-classes">
							<br/><div ng-include="'/templates/partials/find-classes.html'"></div>
						</tab>
					</tabset>
				</div>
			</div>
		</div>
		</div>
		<script type="text/ng-template" id="accordion.html">
			<accordion-heading>
				<div class="row pointer">
					<div class="col-xs-8" ng-class="{'text-muted':(val.total - val.base > remainingClassesCount())}" ng-bind="::key"></div>
					<div class="col-xs-1 text-muted" ng-bind="(user.transcript.getContextGPA(val.used) || '').toFixed(2)"></div>
					<div class="col-xs-3 text-right" tooltip="{{val.total}} classes total" tooltip-placement="right" tooltip-append-to-body="true">
						<span class="label label-default" ng-hide="val.base == val.total">{{val.total - val.base}} class<span ng-if="val.total - val.base != 1">es</span></span>
						<span class="label label-success" ng-show="val.base == val.total">Finished!</span>
					</div>
				</div>
			</accordion-heading>
			<div ng-if="interface.accordion[key]">
				<alert type="danger" ng-if="val.total - val.base > remainingClassesCount()">
					It is not possible to graduate within <abbr title="Assuming twelve classes a year">four years</abbr> and complete these requirements with the below course list.
				</alert>
				<span ng-bind="::val.notes"></span>
				<h3>Requirements <small>
					<span ng-if="::val.link.catalog">
						<a href="http://collegecatalog.uchicago.edu/thecollege/{{val.link.catalog}}" target="_blank">College Catalog <i class="fa fa-external-link"></i></a>
						<span ng-if="::val.type=='major'"> - </span>
					</span>
					<a href="#" ng-if="::val.type=='major'" ng-click="generateWorksheet(key)" tooltip="Hand this to your adviser, it might speed up your meeting :D">Degree Program Worksheet</a>
				</small></h3>
				<ul class="list-group">
					<li class="list-group-item" ng-repeat="child in val.classes" ng-include="'requirements.html'"></li>
				</ul>
				<div ng-repeat="specialization in getSpecializations(key)">
					<h3 ng-bind="::specialization.title"></h3>
					<ul class="list-group">
						<li class="list-group-item" ng-repeat="child in specialization.data.classes" ng-include="'requirements.html'"></li>
					</ul>
				</div>
			</div>
		</script>
		<script type="text/ng-template" id="requirements.html">
			<div ng-if="!isLeaf(child)" class="pointer" ng-mouseenter="child.hover=true" ng-mouseleave="child.hover=false" ng-click="child.hidden=!child.hidden">
				<i ng-hide="child.hidden || !child.classes" class="fa fa-angle-down fa-fw"></i>
				<i ng-show="child.hidden && child.classes" class="fa fa-angle-right fa-fw"></i>
				<span ng-show="!child.complete">
					<span ng-show="child.require==child.classes.length" tooltip="{{::child.require}} total">All</span>
					<span ng-hide="child.require==child.classes.length" ng-bind="::child.require"></span>
					of the following <span ng-if="child.base" class="label label-danger"><span ng-bind="child.total - child.base"></span> remaining</span>
				</span>
				<span ng-show="child.complete" class="text-success">
					<span ng-bind="::child.require"></span>
					requirement<span ng-if="child.require > 1">s</span>
					<span ng-if="child.force">ignored</span>
					<span ng-if="!child.force">finished</span>
				</span>
				<a class="pull-right pointer" ng-click="forceIgnore(child)" ng-show="!child.complete || child.force">
					<i class="fa fa-volume-off" ng-show="!child.force && child.hover" tooltip="Ignore"></i><i class="fa fa-volume-up" ng-show="child.force" tooltip="Unignore"></i>
				</a>
				<small class="text-muted" ng-bind="::child.notes"></small>
			</div>
			<div ng-if="!child.hidden && !isLeaf(child)">
				<ul class="list-group">
					<li class="list-group-item" ng-repeat="child in child.classes track by $index" ng-include="'requirements.html'"></li>
				</ul>
			</div>
			<span ng-if="isLeaf(child)" ng-class="{'text-danger':!child.complete, 'text-success':child.complete, 'text-info':child.complete && isCredited(child.classes)}" class="pointer">
				<div class="clearfix" ng-mouseenter="child.hover=true" ng-mouseleave="child.hover=false">
					<span ng-click="isElectiveClass(child.classes) ? interface.findClass(child.classes) : (showDetail=!showDetail)">
						<i class="fa fa-check" ng-show="child.complete"></i>
						<i class="fa fa-book" ng-hide="child.complete"></i>
						<span ng-bind="::child.classes | fill"></span>
						<span ng-bind="::getName(child.classes)"></span>
						<i class="fa fa-question-circle" ng-show="child.message.length" tooltip="{{child.message}}"></i>
						<small class="text-muted" ng-if="child.complete && isElectiveClass(child.classes)" ng-bind="child.userClass" tooltip="{{getName(child.userClass)}}"></small>
					</span>
					<a class="pull-right pointer" ng-click="forceIgnore(child)" ng-show="!child.complete || child.force">
						<i class="fa fa-volume-off" ng-show="!child.force && child.hover" tooltip="Ignore"></i><i class="fa fa-volume-up" ng-show="child.force" tooltip="Unignore"></i>
					</a>
				</div>
				<div ng-if="showDetail && isExplicitClass(child.classes)" ng-include="'/templates/partials/class-info.html'"></div>
			</span>
		</script>
		<script type="text/ng-template" id="template/accordion/accordion-group.html">
			<div class="panel panel-default">
			  <div class="panel-heading">
			    <h4 class="panel-title">
			      <a class="accordion-toggle" ng-click="toggleOpen()" accordion-transclude="heading"><span ng-class="{'text-muted': isDisabled}">{{heading}}</span></a>
			    </h4>
			  </div>
			  <div class="panel-collapse" ng-show="isOpen">
				  <div class="panel-body" ng-transclude></div>
			  </div>
			</div>
		</script>
		<footer ng-cloak>
			<div class="text-center text-muted">
				<p>DISCLAIMER: This is intended to be a helpful tool, not a replacement for intelligence. Manually verify that you've completed your requirements every so often before you graduate.</p>
				<p>Indexing <span ng-bind="classes.length" tooltip="Why this doesn't match the filtered record count? I have no idea."></span> classes,
					<span ng-bind="timeschedules.section_count"></span> sections,
					<span ng-bind="timeschedules.activity_count"></span> activities,
					<span ng-bind="major_count"></span> majors,
					<span ng-bind="minor_count"></span> minors
				</p>
				<p>Looking for UChicago APIs or statistical data? <a href="mailto:kdwang@uchicago.edu">Email me!</a></p>
				<p>Field of study missing? <a href="https://github.com/kevmo314/canigraduate.uchicago.edu">Submit your own for review!</a> Found a mistake? Have a suggestion or question? Giving away free cows? <a href="mailto:kdwang@uchicago.edu">Let me know!</a></p>
				<p>Written by <a href="http://kevmo314.com/">Kevin Wang</a>, <a href="https://github.com/kevmo314/canigraduate.uchicago.edu">GitHub</a>, <a href="bitcoin:15AeuxTuPQpntVvq4KVGqSxZM3ry39PV6Q">15AeuxTuPQpntVvq4KVGqSxZM3ry39PV6Q</a>. This site is not affiliated with The University of Chicago.</p>
			</div>			
		</footer>
		<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.0-rc.2/angular.min.js"></script>
		<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.0-rc.2/angular-route.min.js"></script>
		<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.0-rc.2/angular-cookies.min.js"></script>
		<script src="//crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/tripledes.js"></script>
		<script src="//angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.11.2.min.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.6.0/moment.min.js"></script>
		<!-- <script src="//cdn.socket.io/socket.io-1.1.0.js"></script>-->
		<script src="/js/angular-gravitate.js"></script>
		<script src="/js/SortedList.js"></script>
		<script src="/js/IntervalTree.js"></script>
		<script src="/js/angular-tags-0.3.1.min.js"></script>
		<script src="utility.js"></script>
		<script src="requirements.js"></script>
		<script src="kevin-wangular.js"></script>
	</body>
</html>
