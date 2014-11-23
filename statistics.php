<!DOCTYPE html>
<html ng-app="app" lang="en">
	<head>
		<title>Can I Graduate? | UChicago</title><!-- No, you cannot -->
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"/>
		<link rel="stylesheet" href="/css/statistics.css"/>
		<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.8/angular.min.js"></script>
		<script src="//code.jquery.com/jquery-2.1.1.min.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/d3/3.4.11/d3.min.js"></script>	
		<script src="//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/waypoints/2.0.4/waypoints.min.js"></script>
		<script src="/js/d3-tip.js"></script>
		<script src="utility.js"></script>
		<script src="requirements.js"></script>
		<script type="text/javascript">
			const GPA_MAP = {
				'A':4.0, 'A-':3.7, 'B+':3.3, 'B':3.0, 'B-':2.7, 'C+':2.3, 'C':2.0, 'C-':1.7, 'D+':1.3, 'D':1.0, 'F':0.0
			};
			CORE_EXCLUSION_LIST.sort();
			$(document).ready(function() {
				$(window).on("scroll", function() {
					$(".fixed-left").each(function() {
						var top = $(this).parents(".row").position().top;
						var bottom = $(this).parents(".row").height() + top;
						var location = window.pageYOffset;
						if(location > top) {
							if(location + $(this).height() > bottom) {
								$(this).css('position', 'absolute');
								$(this).css('top', $(this).parents(".row").height() - $(this).height());
							} else {
								$(this).css('position', 'fixed');
								$(this).css('top', 0);
							}
						} else {
							$(this).css('position', 'relative');
						}
					});
				});
			});
		</script>
		<link href="/css/statistics.css" rel="stylesheet"/>
	</head>
	<body>
		<header>
			<div class="container">
				<div class="text-center"><h1>Grades at UChicago</h1></div>
				<div class="row">
					<div class="col-sm-6 col-sm-offset-3">
						<p><a href="/">Can I Graduate?</a> provides a way for students at <a href="//uchicago.edu/">The University of Chicago</a> to plan their future studies. The data collected from this service is presented in the following visualizations gain a better understanding into the environment that students study in and how differently departments and students within the university behave.</p>
						<p class="text-muted">Created by <a href="http://kevmo314.com/">Kevin Wang</a>, this page is not affiliated with The University of Chicago.</p>
					</div>
				</div>
			</div>
		</header>
		<div class="container clearfix" id="content">
			<div class="alert alert-warning text-center">Still under construction kthx &lt;3</div>
<?php die(); ?>
			<div class="text-center">
				<h2>Departments</h2>
				<hr/>
			</div>
			<div class="row">
				<div class="col-md-6">
					<svg id="department-table" class="fixed-left" style="height:100vh;width:100%"></svg>
					<script type="text/javascript">
					$(document).ready(function() {
						var svg = d3.select('#department-table');
						var margin = {top: 50, right: 15, bottom: 100, left: 100},
								width = svg[0][0].clientWidth - margin.left - margin.right,
								height = svg[0][0].clientHeight - margin.top - margin.bottom;
						var color = d3.scale.ordinal()
							.range(["#178FC7","#DC1D0C","#3BCA40","#785BEB","#A85572","#C93767","#469C67","#E3A1BE","#7068A4","#B3B306"].reverse());
						var x = d3.scale.linear().range([0, width]);
						var y = d3.scale.ordinal().rangeRoundBands([0, height], 0.1);
						var chart = svg
							.append('g')
							.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
						chart.append('g')
							.attr('class', 'x axis')
							.call(d3.svg.axis().scale(x).orient('top').tickFormat(d3.format('.0%')))
						.append('text')
							.attr('x', width)
							.attr('y', -30)
							.attr('dy', '0.71em')
							.attr('text-anchor', 'end')
							.text('Frequency');
						chart.append('g')
							.attr('class', 'y axis')
							.call(d3.svg.axis().scale(y).orient('left'));
						var yAxis = d3.svg.axis().scale(y).orient('left');
						var tooltip = d3.tip().attr('class', 'd3-tip').html(function(d) { return Math.round(100 * (d.to - d.from)) + "% (" + d.count + ") of grades issued by this department were " + d.label + "'s" });
						svg.call(tooltip);
						d3.csv('/data/distribution.php?format=csv', function(error, data) {
							var filterCore = function(invert) {
								return function(row) {
									var index = CORE_EXCLUSION_LIST.binarySearch(row['Class']);
									if(index < 0) {
										return (~index > 0 && row['Class'].startsWith(CORE_EXCLUSION_LIST[~index - 1])) == invert;
									} else {
										return row['Class'].startsWith(CORE_EXCLUSION_LIST[index]) == invert;
									}
								}
							};
							// set the color scheme
							color.domain(d3.keys(data[0]).filter(function(key) { return key != 'Class' }).reverse());
							var weightedAverage = function(c) {
								return d3.sum(c, function(d) {
									return d.count * GPA_MAP[d.label]
								}) / d3.sum(c, function(d) {
									return d.count
								});
							};
							var sample = svg.append('text')
								.attr('x', 10)
								.attr('y', height + margin.top + 15)
								.attr('font-size', '8pt');
							var refreshGraph = function(input) {
								var global = {'Class':'UChicago '};
								input.forEach(function(d) {
									color.domain().forEach(function(key) {
										global[key] = +d[key] + (global[key] ? global[key] : 0);
									});
								});
								// TODO: figure out how to do d3.layout.stack() normalization
								var process = d3.nest()
									.key(function(d) { return d['Class'].substring(0, d['Class'].indexOf(' ')) })
									.rollup(function(rows) {
										var from = 0, total = 0;
										return rows.reduce(function(aggregate, row) {
											color.domain().forEach(function(d, index) {
												if(!aggregate[index]) {
													aggregate[index] = {label:d, count:0};
												}
												aggregate[index].count += +row[d];
												total += +row[d];
											});
											return aggregate;
										}, []).map(function(row) {
											row.from = from;
											row.to = (from += row.count / total);
											return row;
										})
									})
									.entries(input.concat([global]));
								process.sort(function(a, b) {
									if(a.key == 'UChicago') { return 1 }
									if(b.key == 'UChicago') { return -1 }
									return weightedAverage(a.values) - weightedAverage(b.values);
								});
								for(var i = 0; i < process.length; i++) {
									var d = process[i], count = d.values.reduce(function(a, b) { return a + b.count }, 0);
									if(count < 10) { process.splice(i--, 1) }
									else { d.key += ' (' + weightedAverage(d.values).toFixed(2) + ')' }
								}
								y.domain(_.pluck(process, 'key'));
								chart.selectAll('.y.axis')
									.call(yAxis);
								var department = chart.selectAll('.department')
									.data(process, function(d) { return d.key.substring(0, 4) });
								department.enter().append('g')
									.attr('class', function(d) { return 'department ' + d.key.substring(0, 4) })
									.attr('transform', function(d) { return 'translate(0,' + y(d.key) + ')' });
								var rects = department.selectAll('rect')
										.data(function(d) { return d.values });
								rects.enter().append('rect')
										.attr('height', y.rangeBand())
										.attr('x', function(d) { return x(d.from) })
										.attr('width', function(d) { return x(d.to) - x(d.from) })
										.style('fill', function(d) { return color(d.label) })
										.on('mouseover', tooltip.show)
										.on('mouseout', tooltip.hide);
								department.transition()
									.attr('transform', function(d) { return 'translate(0,' + y(d.key) + ')' })
									.selectAll('rect')
										.attr('height', y.rangeBand())
										.attr('x', function(d) { return x(d.from) })
										.attr('width', function(d) { return x(d.to) - x(d.from) });
								department.exit().remove();

								sample.text('n = ' + _.values(global).filter(function(e) { return e != global['Class'] }).reduce(sum))
							};
							refreshGraph(data);
							$("#department-core").waypoint(function(direction) {
								refreshGraph(direction == 'down' ? data.filter(filterCore(false)) : data);
							});
							$("#department-core-only").waypoint(function(direction) {
								refreshGraph(data.filter(filterCore(direction == 'down')));
							});
							var legend = svg.selectAll('.legend')
								.data(color.domain())
							.enter().append('g')
								.attr('class', 'legend')
								.attr('transform', function(d, i) { return 'translate(' + (i * 40 - 160) + ', ' + (height + margin.top) + ')' });
							legend.append('rect')
								.attr('x', (width + margin.left + margin.right) / 2)
								.attr('width', 30)
								.attr('height', 20)
								.attr('fill', color);
							legend.append('text')
								.attr('x', (width + margin.left + margin.right) / 2 + 15)
								.attr('y', 10)
								.attr('dy', '0.35em')
								.attr('text-anchor', 'middle')
								.style('text-shadow', '1px 1px white')
								.text(function(d) { return d });
						});
						$("#department-content a[class='hover']").hover(function() {
							$("#department-table .department").not("." + $(this).data('department')).stop().fadeTo(250, 0.25);
						}, function() {
							$("#department-table .department").stop().fadeTo(250, 1);
						});
					});
					</script>
				</div>
				<div class="col-md-6" id="department-content">
					<div id="department-all">
						<h3>All Classes</h3>
						<p>The difference in grade distribution provides insight into the relative difficulty of the department and relative intelligence (within the subject) of the students who take it.</p>
						<p><a class="hover" data-department="CHIN">Chinese</a> appears at the bottom of the distribution with the highest average GPA. This is possibly due to the language requirement and the relatively <a href="https://registrar.uchicago.edu/sites/registrar.uchicago.edu/files/uploads/pdf/statistics/race/Race-Spr14.pdf">large fraction of Asian</a> students. It is possible that those who wish to complete the language requirement choose the one likely to be the easiest to them, thus Chinese students are more likely to take Chinese. This is consistent with other languages as well, as <a class="hover" data-department="GRMN">German</a>, <a class="hover" data-department="FREN">French</a>, and <a class="hover" data-department="SPAN">Spanish</a> also rank near the bottom of the distribution.</p>
						<p>On the other side of the spectrum, math and science subjects tend to have relatively lower grades compared to humanities. Yet, subjects that are commonly associated with being notoriously difficult, for example <a class="hover" data-department="MATH">math</a> and <a class="hover" data-department="BIOS">biology</a>, do not necessarily rank among the top, whereas subjects such as <a class="hover" data-department="STAT">statistics</a> rank higher overall. This effect is possibly due to the existence of the core and general education requirements that intersect with these departments. Among core classes, grades likely tend to be higher (analysis coming soon), thus departments that do not host as many general education requirements are more likely to have a lower overall GPA.</p>
						<p><a class="hover" data-department="BUSF">Booth school classes</a> rank relatively near the top, but Booth school also has a policy <a href="http://programs.chicagobooth.edu/docs/handbook.pdf">restricting the average grade in a class to a 3.33</a>. This may indicate that the average GPA is artificially low due to this policy. <em>Thanks, Frank Pinter.</em></p>
						<em>For sample sizes, see <a href="#department-dominance">Department Dominance</a>.</em>
					</div>
					<div style="height:100vh" id="department-core">
						<h3>Core Excluded</h2>
					</div>
					<div style="height:100vh" id="department-core-only">
						<h3>Core Only</h3>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<svg id="quarter-index-table" style="width:100%;height:50vh"></svg>
					<script type="text/javascript">
					$(document).ready(function() {
						var svg = d3.select('#quarter-index-table');
						var margin = {top: 50, right: 15, bottom: 20, left: 100},
								width = svg[0][0].clientWidth - margin.left - margin.right,
								height = svg[0][0].clientHeight - margin.top - margin.bottom;
						var color = d3.scale.ordinal()
							.range(["#178FC7","#DC1D0C","#3BCA40","#785BEB","#A85572","#C93767","#469C67","#E3A1BE","#7068A4","#B3B306"].reverse());
						var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.1);
						var y = d3.scale.linear().range([0, height]).domain([0, 1]);
						var xAxis = d3.svg.axis().scale(x).orient('bottom')
						              .tickValues([1/14 * 1, 1/14 * 5, 1/14 * 9, 1/14 * 13])
						              .tickFormat(function(d) { return 'Year ' + Math.round((d * 14 - 1) / 4 + 1) })
													.tickSize(0);
						var xDividers = d3.svg.axis().scale(x).tickValues([1/14 * 3, 1/14 * 7, 1/14 * 11])
						                                      .tickFormat('').tickSize(-height, 0, 0);
						var yAxis = d3.svg.axis().scale(y).orient('left').tickFormat(d3.format('.0%'));
						var chart = svg
							.append('g')
								.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
						chart.append('g')
							.attr('class', 'x axis')
							.attr("transform", "translate(0," + height + ")")
							.call(xAxis);
						chart.append('g')
							.attr('class', 'y axis')
							.call(yAxis);
						var stack = d3.layout.stack()
							.offset('expand')
							.values(function(d) { return d.values });
						d3.csv('/data/grade_quarter_index.php?format=csv', function(data) {
							var refreshGraph = function(input) {
								x.domain(input.map(function(d) { return +d.quarter_index }));
								color.domain(input.map(function(d) { return d.gpa }));
								var process = d3.nest()
									.key(function(d) { return +d.quarter_index })
									.rollup(function(rows) {
										var from = 0, total = 0;
										console.log(rows);
										var out = {};
										rows.forEach(function(row) { out[row.gpa] = +row.count });
										return rows.reduce(function(aggregate, row) {
											color.domain().forEach(function(d, index) {
												if(!aggregate[index]) {
													aggregate[index] = {label:d, count:0};
												}
												aggregate[index].count += +row[d];
												total += +row[d];
											});
											return aggregate;
										}, []).map(function(row) {
											row.from = from;
											row.to = (from += row.count / total);
											return row;
										})
									})
									.sortKeys(function(a, b) { return a - b })
									.entries(input)
									.filter(function(d) { return d.key != 'NaN' && +d.key > 0 });
								console.log(process);
								color.domain(process.map(function(a) { return a.key } ));
								var grades = chart.selectAll('.grades')
									.data(process, function(d) { return +d.key });
								grades.enter().append('g')
									.attr('class', 'quarter-index-grade')
									.attr('transform', function(d) { return 'translate(0,' + x(+d.key) + ')' });
								var rects = grades.selectAll('rect')
										.data(function(d) { return d.values });
								rects.enter().append('rect')
										.attr('width', x.rangeBand())
										.attr('y', function(d) { return y(d.y0) })
										.attr('height', function(d) { return y(d.y) - y(d.y) })
										.style('fill', function(d) { return color(d.key) })
										.on('mouseover', tooltip.show)
										.on('mouseout', tooltip.hide);
								grades.transition()
									.attr('transform', function(d) { return 'translate(0,' + y(d.key) + ')' })
									.selectAll('rect')
										.attr('y', function(d) { return y(d.from) })
										.attr('height', function(d) { return y(d.y) - y(d.y) })
							};
							refreshGraph(data);
						});
					});
					</script>
				</div>
			</div>
			<div class="row" style="height:50vh">
				<div class="col-md-12">
					<h3>Senioritis Effects</h3>
				</div>
			</div>
			<div class="row">
				<div class="col-md-6">
					<h2>Grade Inflation</h2>
					<p>Grade inflation is difficult to quantify as there isn't much long-term data. The data provided here only exists within the span of the students who opt to provide it, which is at most four years before the age of the application.</p>
					<p>Hopefully, in a few years this visualization will be more insightful.</p>
				</div>
				<div class="col-md-6">
					<div id="table-2" style="height:500px;">
					</div>
					<script type="text/javascript">
					</script>
				</div>
			</div>
			<div class="row">
				<div class="col-md-6">
					<h2>Class Pairs</h2>
					<p>Observing classes people tend to take together through their collegiate career, the core is very evident. Classes in humanities (HUMA) and social sciences (SOSC) and math have very strong associations. Also common are classes that are in similar subject areas, such as statistics (STAT) and economics (ECON).</p>
					<p>Major data is not collected in the interest of privacy.</p>
					<div id="table-4" style="height:800px"></div>
					<script type="text/javascript">
					</script>
				</div>
				<div class="col-md-6">
					<h2>Class Pairs, Core Removed</h2>
					<div id="table-4-exclude" style="height:800px"></div>
					<script type="text/javascript">
					</script>
				</div>
			</div>
			<div class="row">
				<div class="col-md-6">
					<h2>Class Prefixes</h2>
					<p>In the interest of looking at the difference in grades between higher level and lower level classes, we can group classes by the first two numbers in the course identifier. This isn't a perfect metric (eg PHYS 19700), but it's decently accurate. Looking at the distribution of A's and A-'s, it seems that the lowest level and highest level classes receive the highest grades. This is indicative that the core classes or other general education classes may tend to be more lenient in terms of grade distribution, but also that students get more intelligent as they go to higher level classes. Hopefully, that would be true at UChicago.</p>
				</div>
				<div class="col-md-6">
					<div id="table-3" style="height:600px"></div>
					<script type="text/javascript">
					</script>
				</div>
			</div>
			<div class="row">
				<div class="col-md-6 col-md-push-6">
					<h2>Upper-level Sequence Abatement</h2>
					<p>An interesting pattern I noticed while toying around with the data was that the econ 200's sequence progressively has fewer samples in both regular and honors, so as you continue with the sequence, more and more people drop. This wasn't as prevalent in any other sequence that I looked at.</p>
					<p>Also interesting was the increasing size of math 150's and decreasing size of 160's, suggesting that people drop 160's over time and take 150's instead. Note that the entire calc sequence may not be required for a lot of people, so this hypothesis might not be valid. Again, this was the only sequence I found this trend to be prevalent in.</p>
				</div>
				<div class="col-md-6 col-md-pull-6">
					<div id="table-6" style="height:400px"></div>
					<script type="text/javascript">
					</script>
				</div>
			</div>
			<div class="row">
				<div class="col-md-6">
					<h2 id="department-dominance">Department Dominance</h2>
					<p>As you would imagine, departments that host core classes issue more grades.</p>
					<em>NB: These samples are equivalent to the ones used in grade distribution by department.</em>
					<div id="table-7" style="height:750px;width:100%;"></div>
					<script type="text/javascript">
					</script>
				</div>
				<div class="col-md-6">
					<h2>Department Dominance, Core Removed</h2>
					<em>Coming ... eventually ...</em>
					<div id="table-7-excluded" style="height:750px;width:100%;"></div>
					<script type="text/javascript">
					</script>
				</div>
			</div>
			<div class="row">
				<div class="col-md-6 col-md-push-6">
					<h2>Maximum Major Acquisition</h2>
					<p>Choosing your classes perfectly, with twelve classes a year in four years, you could acquire <em>n</em> majors...</p>
				</div>
				<div class="col-md-6 col-md-pull-6">
					<script type="text/javascript">
					</script>
				</div>
			</div>
			<hr/>
			<div class="row">
				<div class="col-md-12">
					<h2>Appendix A: Core Classes</h2>
					<p>The core classes excluded are as follows by department:</p>
				</div>
				<div class="col-md-3" ng-repeat="class in excluded">
					{{class}}
				</div>
			</div>
		</div>
		<footer>
			<div class="container">
				<div class="text-center text-muted">
					<p>This page is provided as an analysis of <a href="/">Can I Graduate?</a>. Visit the main page for more details.</p>
					<p>Play with the data using the <a href="/api.php">API</a>!</p>
					<p>Visualizations generated by <a href="https://developers.google.com/chart/interactive/docs/reference">Google Charts</a>.</p>
				</div>
			</div>			
		</footer>
	</body>
</html>
