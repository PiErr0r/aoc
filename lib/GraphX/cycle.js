const { set } = require("../set");
const { PriorityQueue } = require("../containers");

function _rotateWithReversed(arr) {
	const res = [];
	const tmp = [...arr];
	for (let i = 0; i < arr.length; ++i) {
		res.push(arr.slice(i).concat(arr.slice(0, i)));
	}
	tmp.reverse();
	for (let i = 0; i < tmp.length; ++i) {
		res.push(tmp.slice(i).concat(tmp.slice(0, i)));
	}
	return res;
}

function _dfsCycle(node, G, path, visited, cycles, start = null) {
	if (node === start && path.length > 2) {
		if (_rotateWithReversed(path).some(p => cycles.has(p))) return;
		cycles.add(path);
		return;
	}
	if (visited.has(node)) return;
	visited.add(node)
	G.neighbours(node).forEach(n => {
		_dfsCycle(n, G, path.concat([node]), visited, cycles, start === null ? node : start);
	})
	visited.delete(node)
}

/**
 * Get all cycles in graph
 * @param {Graph} G
 * @return {Array<Array<NodeName>>} list of cycles in graph
 */
function findCycles(G) {
	const nodes = G.nodes();
	const cycles = new set();
	nodes.forEach(node => {
		const visited = new set();
		_dfsCycle(node, G, [], visited, cycles);
	})
	return [...cycles];
}

/**
 * Get girth of graph
 * @param {Graph}
 * @return girth or minimal cycle length in graph
 */
function girth(G) {
	const cycles = findCycles(G);
	if (cycles.length === 0) return Infinity;
	return Math.min(...cycles.map(c => c.length));
}

/**
 * Get circumference of graph
 * @param {Graph}
 * @return circumference or maximal cycle length in graph
 */
function circumference(G) {
	const cycles = findCycles(G);
	if (cycles.length === 0) return 0;
	return Math.max(...cycles.map(c => c.length));
}

function _dfsDiam(node, G, visited, L) {
	if (visited.has(node)) return L - 1;
	visited.add(node);
	let mx = 0;
	G.neighbours(node).forEach(n => {
		mx = Math.max(mx, _dfsDiam(n, G, visited, L + 1));
	})
	visited.delete(node);
	return mx;
}

/**
 * Get diameter of graph
 * @param {Graph} G
 * @return {Number} diameter or maximal distance from some node to another
 */
function diameter(G) {
	const nodes = G.nodes();
	let mx = 0;
	nodes.forEach(node => {
		const visited = new set();
		mx = Math.max(mx, _dfsDiam(node, G, visited, 0));
	});
	return mx;
}

function _dijkstra(G, start, end, fn = null) {
	const q = new PriorityQueue(fn === null ? (a, b) => a[1] - b[1] : fn);
	q.push([start, 0]);
	const visited = new set();
	let mn = Infinity;

	while (!q.empty()) {
		const [curr, d] = q.pop();
		if (curr === end) {
			mn = Math.min(mn, d)
			continue;
		};
		if (d >= mn) continue;
		// if (visited.has(curr)) continue;
		visited.add(curr);
		const neighs = G.neighbours(curr);
		for (let i = 0; i < neighs.length; ++i) {
			if (visited.has(neighs[i])) continue;
			q.push([neighs[i], G.edge([curr, neighs[i]]).w + d]);
		}
	}
	return mn === Infinity ? -1 : mn;
}

/**
 * Get shortest distance between nodes x and y in graph G
 * @param {Graph} G
 * @param {NodeName} x
 * @param {NodeName} y
 * @return {Number} shortest distance between x and y
 */
function distance(G, x, y) {
	return _dijkstra(G, x, y);
}

function bridges(G) {
	const cycles = findCycles(G);
	const edges = G.edges();
	const sEdges = new set();
	edges.forEach(([from, to, _]) => {
		sEdges.add([from, to]);
	});
	cycles.forEach(c => {
		sEdges.delete([c[0], c[ c.length - 1 ]]);
		sEdges.delete([c[ c.length - 1 ], c[0]]);
		for (let i = 0; i < c.length - 1; ++i) {
			sEdges.delete([c[i], c[i+1]]);
			sEdges.delete([c[i+1], c[i]]);
		} 
	})
	return [...sEdges];
}

module.exports = {
	findCycles,
	girth,
	circumference,
	diameter,
	distance,
	bridges,
}