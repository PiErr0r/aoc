const { set } = require('../set')
const { Graph } = require("./graph")
const { findCycles, girth, circumference, diameter, distance, bridges } = require('./cycle');
const { isConnected, components, separator } = require('./connectivity');

const g = new Graph();
g.addNode(1, {color: "blue"});
g.addNodes([2,3,4], {color: "red"});
g.addNode([1, 6], {test: true});
// g.addEdge([1, 2]);
g.addEdges([[2,3],[3,4],[4,2],[1,5]], {w:2});
g.addEdge([[1,6], 5], {w: 10})
g.addEdge([[1,6], 1])
g.removeEdge([2,4])

g.print();
console.log("NODES: ", g.nodesWithProps())
console.log("EDGES: ", g.edgesWithProps())
console.log("NEGHS: ", g.neighbours([1,6]))
console.log("NEGHS: ", g.neighbours(5))

const C = new Graph();
C.addEdges([[1,2], [2,3], [1,3], [2,4]])
C.print()
console.log(findCycles(C))

const D = new Graph();
D.addEdges([[1,2],[3,2],[2,4],[4,5],[5,6],[5,9],[6,7],[7,8],[7,9],[9,10],[10,11],[11,2], [4,12],[12,13]])
console.log(findCycles(D))

console.log(isConnected(D))
console.log(components(D))
console.log(bridges(D))
console.log(separator(D))
console.log(isConnected(g))
console.log(components(g).length)
