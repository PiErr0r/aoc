const { Graph } = require("./graph")

const g = new Graph();
g.addNode(1, {color: "blue"});
g.addNodes([2,3,4], {color: "red"});
g.addNode([1, 6], {test: true});
g.removeNode(4);
g.removeNodes([5,6]);
g.addEdge([1, 2]);
g.addEdges([[2,3],[3,4],[4,2]], {w:2});
g.addEdge([[1,6], 5], {w: 10})
// g.removeEdge([1, 2]);
// g.removeEdge([1, 4]);
// g.removeEdges([[2, 3], [2, 3], [2, 4]]);
g.print();

console.log("NODES: ", g.nodesWithProps())
console.log("EDGES: ", g.edgesWithProps())
console.log("NEGHS: ", g.neighbours([1,6]))
console.log("NEGHS: ", g.neighbours(2))
const node = [1, 6];
console.log(g.getNodeProps(node), g.degree(node), g.degree(2), g.size(), g.size(true), g.order())
g.subgraph([[1, 6], 5]).print()
g.edgeSubgraph([[2,3], [3,4]]).print()
// g.clearEdges();
const G = g.copy();
G.removeEdge([[1, 6], 5])
console.log(G.isSpanning(g));
const G2 = g.complement();
g.print();
G2.print();

console.log(G2.minDegree(), G2.maxDegree())

const g2 = new Graph();
g2.addNodes([1, 2, 3], { visited: false })
g2.addEdges([[1, 2], [2, 3], [1, 3]]);
console.log(g2.isRegular(), g2.averageDegree(), g2.epsilon())
// g2.setNodeProps(1, { visited: false });
console.log(g2.nodesWithProps())
