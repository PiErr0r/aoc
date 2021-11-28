function binSearch(arr, n, fn = (a, b) => a - b) {
	let l = 0, r = arr.length - 1;
	let m = 0, res;
	while (l <= r) {
		m = Math.floor(l + (r - l) / 2);
		res = Math.sign(fn(n, arr[m]));
		// console.log(n, fn(n, arr[m]))
		if (res === 0) {
			return [m, 0];
		} else if (res === 1) {
			l = m + 1;
		} else { // res === -1
			r = m - 1;
		}
	}
	return [m, Math.sign(fn(n, arr[m]))];
}

class Queue {
	q = [];
	constructor(q) {
		if (Array.isArray(q)) {
			this.q = [...q];
		} else if (q != null) {
			this.q.push(q);
		}
	}
	pop() 	{	return this.q.shift(); }
	front() {	return this.q[0];	}
	back() 	{ return this.q[ this.q.length - 1 ]; }
	size() 	{ return this.q.length; }
	empty() { return this.q.length === 0; }
	push(n) { this.q.push(n); }
}

class PriorityQueue extends Queue {
	fn = (a, b) => a - b; // sort descending
	constructor(q, fn) {
		super(q);
		if (fn && typeof fn === 'function') {
			this.fn = fn;
		}
		this.q.sort(fn);
	}
	push(n) {
		if (this.q.length === 0) {
			this.q.push(n);
			return;
		}
		const [i, pos] = binSearch(this.q, n, this.fn);
		this.q.splice(Math.max(0,pos) + i, 0, n);
	}	
}

class Stack {
	s = [];
	constructor(s) {
		if (Array.isArray(s)) {
			this.s = s;
		} else if (s != null) {
			this.s.push(s);
		}
	}
	pop() 	{ return this.s.pop(); }
	top() 	{ return this.s[ this.s.length - 1 ];	}
	size() 	{ return this.s.length; }
	empty() { return this.s.length === 0;	}
	push(n) { this.s.push(n); }
}

module.exports = {
	PriorityQueue,
	Queue,
	Stack
}