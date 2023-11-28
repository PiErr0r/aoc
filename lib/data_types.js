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

function Counter(container) {
	const c = DefaultDict();
	if (typeof container === 'string' || Array.isArray(container)) {
		for (let i = 0; i < container.length; ++i)
			++c[ container[i] ];
	} else {
		throw new Error(`Unrecognized container type: ${typeof container}`);
	}
	return c;
}

// https://stackoverflow.com/questions/19127650/defaultdict-equivalent-in-javascript
function DefaultDict(defaultInit = 0) {
	return new Proxy({}, {
	  get: (target, name) => name in target ?
	    target[name] :
	    (target[name] = typeof defaultInit === 'function' ?
	      new defaultInit().valueOf() :
	      defaultInit)
		});
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
	pop() 	{ return this.q.shift(); }
	front() { return this.q[0];	}
	back() 	{ return this.q[ this.q.length - 1 ]; }
	size() 	{ return this.q.length; }
	empty() { return this.q.length === 0; }
	push(n) { this.q.push(n); }
	*values() {
		for (let i = 0; i < this.q.length; ++i) {
			yield this.q[i];
		}
	}
}

class FastQueue extends Queue {
	constructor(q) {
		super(q);
		this.ii = 0;
	}
	pop() 	{ return this.q[ this.ii++ ]; }
	front() { return this.q[ this.ii ]; }
	size()	{ return this.q.length - this.ii; }
	empty() { return this.q.length === this.ii; }
	push(n) { this.q[ ++this.ii ] = n; }
	*values() {
		for (let i = this.ii; i < this.q.length; ++i) {
			yield this.q[i];
		}
	}
}

class FastQueueWrapper {
	q = [];
	ii = 0;
	constructor(q, type = null) {
		// think of how to use typed arrays since they dont have splice method
		if (true || type === null) {
			return new FastQueue(q);
		} else if (typeof type === 'function') {
			this.q = new type(q);
		}
	}
	pop() 	{ return this.q[ this.ii++ ]; }
	front() { return this.q[ this.ii ]; }
	back() 	{ return this.q[ this.q.length - 1 ]; }
	size()	{ return this.q.length - this.ii; }
	empty() { return this.q.length === this.ii; }
	push(n) { this.q[ ++this.ii ] = n; }
	*values() {
		for (let i = this.ii; i < this.q.length; ++i) {
			yield this.q[i];
		}
	}
}

const parent = (i) => ((i - 1) >> 1);
const left = (i) => (i << 1) + 1;
const right = (i) => (i << 1) + 2;

const swap = (A, i, j) => {
	const tmp = A[i];
	A[i] = A[j];
	A[j] = tmp;
}

const heapify = (A, i, fn) => {
	const l = left(i);
	const r = right(i);
	let largest = -1;
	
	if (l < A.heapSize() && fn(A[l], A[i]) > 0)
		largest = l;
	else
		largest = i;
	
	if (r < A.heapSize() && fn(A[r], A[largest]) > 0)
		largest = r;
	
	if (i !== largest) {
		swap(A, i, largest);
		heapify(A, largest, fn);
	}
}

class PriorityQueue extends Array {
	size = 0;
	fn = (a, b) => b - a; // descending
	constructor(fn) {
		super(0);
		if (fn)
			this.fn = fn;
	}
	heapSize() { return this.size; }
	pop() {
		if (this.size === 0) throw new Error("Empty Queue");
		--this.size;
		const tmp = this[0];
		this[0] = this[this.size];
		super.pop();
		heapify(this, 0, this.fn);
		return tmp;
	}
	front() { return this[0]; }
	empty() { return this.size === 0; }
	push(n) {
		let i = this.size;
		++this.size;
		while (i > 0 && this.fn(this[parent(i)], n) < 0) {
			this[i] = this[parent(i)];
			i = parent(i);
		}
		this[i] = n;
	}
	*values() {
		for (let i = 0; i < this.q.length; ++i) {
			yield this[i];
		}
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

const empty = (a, b, c) => (
	a && b && c
	? new Array(a).fill(0).map(aa => new Array(b).fill(0).map(cc => new Array(c).fill(0)))
	: a && b
	? new Array(a).fill(0).map(aa => new Array(b).fill(0))
	: new Array(a).fill(0));

module.exports = {
	Counter,
	DD: DefaultDict,
	empty,
	FastQueue: FastQueueWrapper,
	PriorityQueue,
	Queue,
	Stack
}