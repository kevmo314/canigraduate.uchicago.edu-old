// based off of https://github.com/shinout/interval-tree/blob/master/IntervalTree.js
function IntervalTree(center, options) {
	this.pointTree = new SortedList();
	this.root = new Node(center, this);
}
IntervalTree.prototype.add = function(start, end) {
	var itvl = {start:start, end:end};
	this.pointTree.insert(itvl.start);
	this.pointTree.insert(itvl.end);
	_insert.call(this, this.root, itvl);
};
IntervalTree.prototype.check = function(val1, val2) {
	return _rangeCheck.call(this, val1, val2);
};
function _insert(node, itvl) {
	if (itvl.end < node.idx) {
		if (!node.left) {
			node.left = new Node(itvl.start + itvl.end >>> 1, this);
		}
		return _insert.call(this, node.left, itvl);
	}
	if (node.idx < itvl.start) {
		if (!node.right) {
			node.right = new Node(itvl.start + itvl.end >>> 1, this);
		}
		return _insert.call(this, node.right, itvl);
	}
	return node.insert(itvl);
}
function _pointCheck(node, idx) {
	if (!node) return false;

	if (idx < node.idx) {
		// check if there are any overlapping intervals at this node
		return node.starts.some(function(itvl) {
			return itvl.start <= idx; 
		// or at a future node
		}) || _pointCheck.call(this, node.left, idx);
	} else if (idx > node.idx) {
	 return node.ends.some(function(itvl) {
			return itvl.end >= idx;
		}) || _pointCheck.call(this, node.right, idx);
	}
	// exact equal
	else {
		// at least one ends or starts here
		return true;
	}
}
function _rangeCheck(start, end) {
	var idx1 = this.pointTree.binarySearch(start);
	if(idx1 < 0) { idx1 = ~idx1 }
	var idx2 = this.pointTree.binarySearch(end);
	if(idx2 < 0) { idx2 = ~idx2 }
	// if the two points are different, then there's an endpoint between them
	if(idx1 < idx2) {
		return true;
	} else {
		// otherwise, check for encompassing ranges
		return _pointCheck(this.root, start);
	}
}
function Node(idx) {
	this.idx = idx;
	this.starts = new SortedList({
		compare: function(a, b) {
			return a.start - b.start;
		}
	});
	this.ends = new SortedList({
		compare: function(a, b) {
			return a.end - b.end;
		}
	});
};
Node.prototype.insert = function(interval) {
	this.starts.insert(interval);
	this.ends.insert(interval);
};
