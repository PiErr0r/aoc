const { set } = require('../set')
const { Graph } = require("./graph")
const { findCycles, girth, circumference, diameter, distance } = require('./cycle');

const g = new Graph();
g.addNode(1, {color: "blue"});
g.addNodes([2,3,4], {color: "red"});
g.addNode([1, 6], {test: true});
g.addEdge([1, 2]);
g.addEdges([[2,3],[3,4],[4,2],[1,5]], {w:2});
g.addEdge([[1,6], 5], {w: 10})
g.addEdge([[1,6], 1])
g.removeEdge([2,4])

g.print();
console.log("NODES: ", g.nodesWithProps())
console.log("EDGES: ", g.edgesWithProps())
console.log("NEGHS: ", g.neighbours([1,6]))
console.log("NEGHS: ", g.neighbours(5))

const G = g.complement();

G.print();

const C = new Graph();
C.addEdges([[1,2], [2,3], [1,3], [2,4]])
C.print()
console.log(findCycles(C))

const D = new Graph();
D.addEdges([[1,2],[3,2],[2,4],[4,5],[5,6],[5,9],[6,7],[7,8],[7,9],[9,10],[10,11],[11,2], [4,12],[12,13]])
console.log(findCycles(D))

const E = new Graph();
E.addNodes([1, 2, 3, 4, 5]);
const F = E.complement();
// F.print()
console.log(findCycles(F))
console.log(findCycles(g))
console.log(girth(D));
console.log(circumference(D));
console.log(diameter(D))

console.log(g.edge([5,[1,6]]))
console.log(distance(D, 1, 7))
console.log(distance(D, 1, 13))
// D.print()