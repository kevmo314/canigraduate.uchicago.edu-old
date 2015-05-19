Array.prototype.binarySearch = function(v) {
	var min = 0, max = this.length - 1;
	var mid, e;
	while(min <= max) {
		el = this[mid = (min + ((max - min) >> 1)) | 0];
		if(el < v) {
			min = mid + 1;
		} else if(el > v) {
			max = mid - 1;
		} else {
			return mid;
		}
	}
	return ~min;
};
Array.prototype.clear = function() {
	while(this.length > 0) { this.pop() }
};
RegExp.compile = function(pattern, args) {
	try {
		return new RegExp(pattern, args);
	} catch(error) {
		console.error(pattern + ' is not valid RegExp. Escaping...');
		// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions
		return RegExp.compile(pattern.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1"), args);
	}
}
// You may be wondering why I didn't use something like lodash.
// It's because my implementations are faster, and I don't need all of the functionality in lodash.

// That is, I wouldn't save 15k of space by using lodash. The js is only 75k anyways. :P

// TODO: maybe not populate in the global namespace

function isString(s) { // NOTE: only tests string or array
	// see http://jsperf.com/testing-string-vs-array
	return !s.sort;
}
// log n time LIKE A BOSS
function prefixBinarySearch(a, v) {
	if(!a.length) { return -1 }
	var start = 0, end = a.length - 1, mid = -1, el = null;
	while(start <= end) {
		mid = (start + (end - start) / 2) | 0;
		el = a[mid];
		if(el.length >= v.length && el.lastIndexOf(v, 0) == 0) {
			while(mid > 0 && a[mid - 1].length >= v.length && a[mid - 1].lastIndexOf(v, 0) == 0) {
				 mid--;
			}
			return mid;
		} else if(el < v) {
			start = mid + 1;
		} else if(el > v) {
			end = mid - 1;
		} else {
			// y'know a shouldn't happen...
			return mid;
		}
	}
	return -1;
};
function getTime() {
	return !!window.performance ? window.performance.now() : new Date().getTime();
}
const grades = ['D', 'D+', 'C-', 'C', 'C+', 'B-', 'B', 'B+', 'A-', 'A'];
function toGradeArray(grade_object) {
	return fetch(grade_object, grades);
}
function getGPA(grade_array) {
	return apply([1.0, 1.3, 1.7, 2.0, 2.3, 2.7, 3.0, 3.3, 3.7, 4.0], grade_array, product).reduce(sum) / grade_array.reduce(sum);
}
function strcmp(a, b) {
	if(a < b) { return -1 }
	else if(a > b) { return 1 }
	else { return 0 }
}
function toTermOrdinal(term) {
	var year = 4 * parseInt(term.substring(term.length - 4));
	if(term[0] == 'W') {
		return year;
	}
	if(term[0] == 'A') {
		return year + 3;
	}
	if(term[1] == 'p') {
		return year + 1;
	}
	return year + 2;
}
function fetch(a, keys) {
	var out = [];
	for(var i = 0; i < keys.length; i++) {
		out.push(a[keys[i]]);
	}
	return out;
}
function difference(a, b) {
	var out = [];
	for(var i = 0; i < a.length; i++) {
		if(b.indexOf(a[i]) == -1) {
			out.push(a[i]);
		}
	}
	return out;
}
function apply(a, b, operator) {
	var out = [];
	for(var i = 0; i < a.length; i++) {
		out.push(operator(a[i], b[i]));
	}
	return out;
}
function normalize(a) {
	var total = a.reduce(sum, 0);
	for(var i = 0; i < a.length; i++) {
		a[i] /= total;
	}
	return a;
}
function pick(o, keys) {
	var out = {};
	for(var i = 0; i < keys.length; i++) {
		out[keys[i]] = o[keys[i]];
	}
	return out;
}
function sum(a, b) { return a + b }
function product(a, b) { return a * b }
function addDataColumns(table) {
	for(var i = 0; i < grades.length; i++) {
		table.addColumn('number', grades[i]);
	}
}
// convenient string functions
if(!String.prototype.startsWith) {
	String.prototype.startsWith = function(pattern) {
		// this is faster on chrome, firefox's startsWith implementation is fastest
		// ie and safari can suck it.
		for(var i = 0, length = pattern.length; i < length; i++) {
			if(pattern.charAt(i) !== this.charAt(i)) {
				return false;
			}
		}
		return true;
	};
}
