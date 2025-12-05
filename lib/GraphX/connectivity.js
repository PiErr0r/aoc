const { set } = require("../set");
const { Queue } = require("../containers");

function _bfs(G, start, without = []) {
	const visited = new set();
	without.forEach(node => {
		visited.add(node);
	})
	const q = new Queue();
	q.push(start);
	while (!q.empty()) {
		const node = q.pop();
		if (visited.has(node)) continue;
		visited.add(node);
		G.neighbours(node).forEach(n => {
			if (visited.has(n)) return;
			q.push(n);
		})
	}
	return visited;
}

function isConnected(G) {
	const nodes = G.nodes();
	if (nodes.length === 0) return true;

	const visited = _bfs(G, nodes[0]);
	return visited.size === nodes.length;
}

function components(G) {
	const nodes = G.nodes();
	const comps = [];
	let visited = new set();
	nodes.forEach(node => {
		if (visited.has(node)) return;
		const visitedFromNode = _bfs(G, node);
		comps.push([...visitedFromNode]);
		visited = set.or(visited, visitedFromNode);
	})
	return comps;
}

function _componentsWithoutNode(G, removedNode) {
	const nodes = G.nodes();
	const comps = [];
	let visited = new set();
	nodes.forEach(node => {
		if (node === removedNode) return;
		if (visited.has(node)) return;
		const visitedFromNode = _bfs(G, node, [removedNode]);
		visitedFromNode.delete(removedNode);
		if (visitedFromNode.size)
			comps.push([...visitedFromNode]);
		visited = set.or(visited, visitedFromNode);
	})
	return comps;
}

function separator(G) {
	const comps = components(G);
	const seps = [];
	comps.forEach(comp => {
		const H = G.subgraph(comp);
		comp.forEach(n => {
			const subComps = _componentsWithoutNode(H, n);
			if (subComps.length > 1) seps.push(n);
		});
	})
	return seps;
}

module.exports = {
	isConnected,
	components,
	separator,
}