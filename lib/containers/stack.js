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
	Stack
}