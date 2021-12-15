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
	pop() 	{	return this.q.shift(); }
	front() {	return this.q[0];	}
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
		this.q.splice(Math.max(0, pos) + i, 0, n);
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

const empty = (n) => new Array(n).fill(0);

module.exports = {
	Counter,
	DD: DefaultDict,
	empty,
	FastQueue: FastQueueWrapper,
	PriorityQueue,
	Queue,
	Stack
}