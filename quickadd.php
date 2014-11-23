<!DOCTYPE html>
<html ng-app="app" lang="en">
	<head>
		<title>Can I Graduate? | UChicago</title><!-- No, you cannot -->
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css"/>
		<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"/>
		<link rel="stylesheet" href="/css/style.css"/>
		<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.0-beta.10/angular.min.js"></script>
		<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.0-beta.10/angular-cookies.min.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.11.0/ui-bootstrap-tpls.min.js"></script>
		<script src="//crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/tripledes.js"></script>
		<script type="text/javascript">
			angular.module('app', ['ngCookies', 'ui.bootstrap']).controller('QuickAddCtrl', function($scope, $http, $modal, $cookies) {
				$scope.data = {
					quarter:'<?=$_GET['quarter']?>',
					add:[{
						id:'<?=$_GET['id']?>',
						section:'<?=$_GET['section']?>',
						activity:'<?=$_GET['activity']?>'
					}],
					cnetid:'<?=$_GET['cnetid']?>',
					password:''
				};
				$scope.quarters = [];
				if($cookies.key) {
					$http.post('/data/storage.php', {key:$cookies.key.substr(0, 8)}).success(function(data) {
						data = JSON.parse(CryptoJS.TripleDES.decrypt(data.data, $cookies.key.substr(8)).toString(CryptoJS.enc.Utf8));
						angular.extend($scope.data, data.authentication);
					});
				}
				// load timeschedules on demand
				var cancelWatch = $scope.$watch('data.quarter', function(v, p) {
					if(v == '') {
						$http.get('/data/timeschedules-compressed/').success(function(quarters) {
							$scope.quarters = quarters;
							if(p == '') {
								$scope.data.quarter = quarters[0];
							}
							cancelWatch();
						});
					}
				});
				$scope.errors = [];
				$scope.messages = [];
				$scope.pending = false;
				$scope.clearWatch = true;
				$scope.submit = function() {
					$scope.pending = true;
					$scope.errors = [];
					$scope.messages = [];
					$http.post('/data/registration.php', $scope.data).success(function(data) {
						$scope.pending = false;
						for(var i = 0; i < data.messages.length; i++) {
							if(data.messages[i][0] == 'error') {
								$scope.errors.push(data.messages[i][1]);
							} else {
								$scope.messages.push(data.messages[i][1]);
							}
						}
						if($scope.clearWatch && $scope.errors.length == 0) {
							$http.post('/data/watches.php', angular.extend({
								action:'remove'
							}, $scope.data, $scope.data.add[0]));
						}
					}).error(function(data) {
						$scope.pending = false;
						$scope.errors.push(data);
					});
				};
				$scope.swap = function() {
					$modal.open({
						templateUrl:'/templates/modals/swap.html',
						controller:['$scope', function($modalScope, $modalInstance) {
							$modalScope.data = {
								registrations:null,
								selected:{}
							};
							$http.post('/data/registration.php', {
								quarter:$scope.data.quarter,
								cnetid:$scope.data.cnetid,
								password:$scope.data.password
							}).success(function(d) {
								$modalScope.data.registrations = [];
								for(var i = 0; i < d.courses.length; i++) {
									$modalScope.data.registrations.push(d.courses[i].course);
								}
							}).error(function(d) {
								$scope.errors.push(d);
								$modalInstance.dismiss();
							});
						}]
					}).result.then(function(data) {
						$scope.data.drop = Object.keys(data);
						$scope.submit();
					});
				};
			});
		</script>
	</head>
	<body ng-controller="QuickAddCtrl">
		<header>
			<div class="container">
				<nav class="navbar">
					<div class="navbar-header">
						<div class="navbar-brand">Can I Graduate?</div>
					</div>
				</div>
			</div>
		</header>
		<div class="container">
			<div class="row">
				<div class="col-md-6 col-sm-offset-3">
					<h1>Quick Add</h1>
					<hr/>
					<form role="form" class="form-horizontal">
						<div class="form-group">
							<label for="quarter" class="col-sm-2 control-label">Quarter</label>
							<div class="col-sm-10">
								<input type="text" class="form-control" id="quarter" ng-model="data.quarter" typeahead="quarter for quarter in quarters"/>
							</div>
						</div>
						<div class="form-group">
							<label for="id" class="col-sm-2 control-label">Class</label>
							<div class="col-sm-10">
								<input type="text" class="form-control" id="id" ng-model="data.add[0].id"/>
							</div>
						</div>
						<div class="form-group">
							<label for="section" class="col-sm-2 control-label">Section</label>
							<div class="col-sm-10">
								<input type="text" class="form-control" id="section" ng-model="data.add[0].section"/>
							</div>
						</div>
						<div class="form-group">
							<label for="activity" class="col-sm-2 control-label">Activity</label>
							<div class="col-sm-10">
								<input type="text" class="form-control" id="activity" ng-model="data.add[0].activity"/>
							</div>
						</div>
						<hr/>
						<div class="form-group">
							<label for="cnetid" class="col-sm-2 control-label">CNetID</label>
							<div class="col-sm-10">
								<input type="text" class="form-control" id="cnetid" ng-model="data.cnetid"/>
							</div>
						</div>
						<div class="form-group">
							<label for="password" class="col-sm-2 control-label">Password</label>
							<div class="col-sm-10">
								<input type="password" class="form-control" id="password" autofocus ng-model="data.password"/>
							</div>
						</div>
						<div class="form-group">
							<div class="col-sm-offset-2 col-sm-10">
								<div class="checkbox">
									<label>
										<input ng-model="clearWatch" type="checkbox"/> Remove watch after adding
									</label>
								</div>
							</div>
						</div>
						<div class="alert alert-info" role="alert" ng-repeat="message in messages" ng-bind="message"></div>
						<div class="alert alert-danger" role="alert" ng-repeat="message in errors" ng-bind="message"></div>
						<div class="form-group">
							<div class="col-sm-offset-2 col-sm-10">
								<button ng-disabled="pending" type="submit" class="btn btn-success" ng-click="submit()">Add this class!</button>
								<button ng-disabled="pending" type="submit" class="btn btn-warning" ng-click="swap()">Swap this class with another!</button>
							</div>
						</div>
					</form>
					<hr/>
					<p class="text-center text-muted">This site is not affiliated with The University of Chicago.</p>
				</div>
			</div>
		</div>
	</body>
</html>
