const { set } = require("../set")
const { combinations } = require("../itertools");
const { graphFactory, nodeFactory, edgeFactory } = require("./factory");

/**
 * TODO:
 * implement algorithms from Diestel Graph Theory - Chapter 1.3 
 *  find cycles
 *  find girth and circumference
 *  find distance (and greatest distance) between nodes
 *  find diameter
 *  find central vertex and radius
 * 
 * for implementation ideas consult python graph library networkx: https://github.com/networkx/networkx/blob/main/networkx/classes/graph.py#L372
 * 
 * */

/** Class representing a graph */
class Graph {
  #G; // private field containing graph data (nodes, edges and corresponding props)
  constructor() {
    this.#G = graphFactory();
  }

  /**
   * Iterator for nodes and node data
   * @return {Iterable[Tuple[object, GMap]]}
   */ 
  *[Symbol.iterator]() {
    for (const k of this.#G.keys()) {
      yield [k, this.#G.get(k)];
    }
    return null;
  }

  /**
   * Get node names
   * @return {Array<NodeName>}
   */
  nodes() {
    return [...this.#G]
    .map(([node, _]) => node);
  }

  /**
   * Get node names and props
   * @return {Array<Tuple<NodeName, object>>}
   */
  nodesWithProps() {
    return [...this.#G]
      .map(([node, _]) => [node, this.#G.get(node).getProps()]);
  }

  /**
   * Check if graph contains node
   * @param {NodeName} v - node name
   * @return {Boolean} true if node is in graph
   */
  hasNode(v) {
    return this.#G.has(v);
  }

  /**
   * Get props for some node
   * @param {NodeName} v - node name
   * @return {null|object} null if node is not in graph, otherwise node props
   */
  getNodeProps(v) {
    if (!this.hasNode(v)) return null;
    return this.#G.get(v).getProps()
  }

  /**
   * Set props for some node
   * @param {NodeName} v - node name
   * @param {object} data - props for node
   */
  setNodeProps(v, data) {
    if (!this.hasNode(v)) return;
    this.#G.get(v).setProps(data);
  }

  /**
   * Add node to graph
   * @param {NodeName} v - node name
   * @param {object} data - props for node
   */
  addNode(v, data = {}) {
    if (this.hasNode(v)) return; // disable update
    this.#G.set(v, nodeFactory(data));
  }

  /**
   * Add multiple nodes to graph
   * @param {Array<NodeName>} vs - node names
   * @param {object} data - props for all of the nodes from vs array
   */
  addNodes(vs, data = {}) {
    if (!Array.isArray(vs)) return;
    vs.forEach(v => {
      this.addNode(v, data);
    })
  }

  /**
   * Delete a node from graph
   * @param {NodeName} v - node name to remove from graph
   */
  removeNode(v) {
    if (!this.hasNode(v)) return;
    for (const vn of this.neighbours(v)) {
      this.#G.get(vn).delete(v);
    }
    this.#G.delete(v);
  }

  /**
   * Delete a list of nodes from graph
   * @param {Array<NodeName>} vs - list of node names to remove from graph
   */
  removeNodes(vs) {
    vs.forEach(v => {
      this.removeNode(v);
    })
  }

  /**
   * Get edges in graph
   * @return {Array<Edge>} list of edges with weight
   * @todo make this a bit more efficient, use `neighbours` method
   */
  edges() {
    const edges = [];
    const nodes = this.nodes();
    for (let i = 0; i < nodes.length; ++i) {
      const v1 = nodes[i];
      for (let j = i + 1; j < nodes.length; ++j) {
        const v2 = nodes[j];
        if (this.hasEdge([v1, v2])) {
          edges.push([v1, v2, this.#G.get(v1).get(v2).get('w')]);
        }
      }
    }
    return edges;
  }

  /**
   * Get edges with props from graph
   * @return {Array<Edge>} list of edges with props
   * @todo more efficient
   */
  edgesWithProps() {
    // returns [fromNode, toNode, weight]
    const edges = [];
    const nodes = this.nodes();
    for (let i = 0; i < nodes.length; ++i) {
      const v1 = nodes[i];
      for (let j = i + 1; j < nodes.length; ++j) {
        const v2 = nodes[j];
        if (this.hasEdge([v1, v2])) {
          edges.push([v1, v2, this.#G.get(v1).get(v2)]);
        }
      }
    }
    return edges;
  }

  /**
   * Get edge and its props
   * @param {Edge} e
   * @return {object} edge props
   */
  edge(e) {
    const [v1, v2] = e;
    // console.log(this.#G.get(v1), v1, v2, )
    return Graph.getPropsObj(this.#G.get(v1).get(v2));
  }

  /**
   * Check if graph contains an edge
   * @param {Edge} e - edge definition
   * @return {Boolean} true if graph contains an edge
   */
  hasEdge(e) {
    const [v1, v2] = e;
    return this.#G.has(v1) && this.#G.get(v1).has(v2);
  }

  /**
   * Add an edge to graph, if nodes from edge are not in graph add those nodes
   * @param {Edge} e - edge definition
   * @param {object} data - props for edge
   */
  addEdge(e, data = {}) {
    const [v1, v2] = e;
    this.addNode(v1);
    this.addNode(v2);
    this.#G.get(v1).set(v2, edgeFactory(data));
    this.#G.get(v2).set(v1, edgeFactory(data));
  }

  /**
   * Add an edge with particular weight to graph, if nodes from edge are not in graph add those nodes
   * @param {Edge} e - edge definition
   * @param {Number} weight - edge weight
   */
  addEdgeWithWeight(e, weight) {
    this.addEdge(e, { w: weight });
  }

  /**
   * Add list of edges to graph, if nodes from some edge are not in graph add those nodes
   * @param {Array<Edge>} es - list of edge definitions
   * @param {object} data - props for every edge from the list
   */
  addEdges(es, data = {}) {
    es.forEach(e => {
      this.addEdge(e, data);
    })
  }

  /**
   * Delete edge from the graph
   * @param {Edge} e - edge definition
   */
  removeEdge(e) {
    if (!this.hasEdge(e)) return;
    const [v1, v2] = e;
    this.#G.get(v1).delete(v2);
    this.#G.get(v2).delete(v1);
  }

  /**
   * Delete edges from the graph
   * @param {Array<Edge>} es - edge definitions
   */
  removeEdges(es) {
    es.forEach(e => {
      this.removeEdge(e);
    })
  }

  /**
   * Get adjacent nodes for some node
   * @param {NodeName} n - node name
   * @return {Array<NodeName>} list of node names which are adjacent to some node
   */
  neighbours(n) {
    return [...this.#G.get(n).keys()]
  }

  /**
   * Get degree of some node (number of neighbours)
   * @param {NodeName} n - node name
   * @return {Number} number of adjacent nodes to some node
   */
  degree(n) {
    return this.neighbours(n).length
  }

  /**
   * Get order of the graph (number of nodes)
   * @return {Number} number of nodes in graph
   */
  order() {
    return this.nodes().length;
  }

  /**
   * Get size of the graph (number of edges or weight of edges)
   * @param {Boolean} weight - if true calculate sum of weight of edges, otherwise calculate number of edges
   * @return {Number} wither sum of weights of edges or number of edges
   */
  size(weight = false) {
    // number of edges or weight of edges
    return this.edges()
      .map(([from, to, w]) => weight ? w : 1)
      .reduce((acc, curr) => (acc += curr), 0);
  }

  /**
   * Create a subgraph containing nodes provided with edges preserved
   * @param {Array<NodeName>} nodes - list of nodes with which to create the subraph
   * @return {Graph} subgraph containing provided nodes with edges preserved
   */
  subgraph(nodes) {
    const hasAllNodes = nodes
      .reduce((acc, curr) => acc &= this.hasNode(curr), true);
    if (!hasAllNodes) return null;
    const G = new Graph();
    const nodesSet = new set(nodes);
    this.edgesWithProps()
      .map(([from, to, props]) => {
        if (nodesSet.has(from) && nodesSet.has(to)) {
          G.addEdge(
            [from, to],
            Graph.getPropsObj(props));
        }
      })
    return G;
  }

  /**
   * Create a subgraph containing all edges provided
   * @param {Array<Edge>} edges - list of edges with which to create the subgraph
   * @return {Graph} subragph containing provided edges
   */
  edgeSubgraph(edges) {
    const hasAllEdges = edges
      .reduce((acc, curr) => acc &= this.hasEdge(curr), true);
    if (!hasAllEdges) return null;
    const G = new Graph();
    edges.forEach(([from, to]) => {
      const props = this.#G.get(from).get(to);
      G.addEdge(
        [from, to],
        Graph.getPropsObj(props));
    })
    return G;
  }

  /**
   * Check if provided graph is spanning current graph (all nodes from provided graph are also in this graph)
   * @param {Graph} G - graph to check does it span current graph
   * @return {Boolean} true if provided graph spans current graph
   */
  isSpanning(G) {
    const otherNodes = new set(G.nodes());
    const thisNodes = new set(this.nodes());
    return otherNodes.size === set.and(otherNodes, thisNodes).size;
  }

  /**
   * Create a graph that is complement to current graph.
   * Delete all edges in current graph from complete graph Kn created from all nodes in current graph/
   * @return {Graph} G - graph complement to current graph
   */
  complement() {
    const nodePairs = combinations(this.nodes(), 2);
    const G = new Graph();
    G.addNodes(this.nodes());
    G.addEdges(nodePairs);
    G.removeEdges(this.edges().map(([from, to, _]) => [from, to]));
    return G;
  }

  /**
   * Get minimal degree of some node in graph
   * @return {Number} minimal degree of graph
   */
  minDegree() {
    return Math.min(...this.nodes().map(n => this.degree(n)));
  }

  /**
   * Get maximal degree of some node in graph
   * @return {Number} maximal degree of graph
   */
  maxDegree() {
    return Math.max(...this.nodes().map(n => this.degree(n)));
  }

  /**
   * Get average degree of nodes in graph 
   * (sum(degree(v)) for v in graph) / |V|
   * where degree(v) is degree od vertex v and |V| is number of vertices (nodes) in graph
   * @return {Number} average degree of graph
   */
  averageDegree() {
    const nodes = this.nodes();
    return nodes
      .map(n => this.degree(n))
      .reduce((acc, curr) => acc += curr, 0) / nodes.length;
  }

  /**
   * Get epsilon, or averageDegree() * 2
   * eps = |E| / |V|
   * where |E| is the number of edges and |V| is number of vertices (nodes)
   * @return {Number} epsilon
   */
  epsilon() {
    return this.averageDegree() / 2;
  }

  /**
   * Check if graph is regular, every node has the same degree.
   * Or check if graph is k-regular, every node has degree k.
   * @param {Number} k - if k == -1 check if graph is regular else check if graph is k-regular
   * @return {Boolean} whether graph is regular or k-regular
   */
  isRegular(k = -1) {
    const nodes = this.nodes();
    const d = this.degree(nodes[0]);
    return nodes.every(n => k === -1 ? this.degree(n) === d : this.degree(n) === k);
  }

  /**
   * Clear the graph, delete all nodes and edges
   */
  clear() {
    this.#G.clear();
  }

  /**
   * Clear the edges in the graph but preserve nodes
   */
  clearEdges() {
    this.nodes().forEach(v => {
      this.#G.get(v).clear();
    })
  }

  /**
   * Copy the current graph
   * @return {Graph} copy of current graph
   */ 
  copy() {
    const G = new Graph();
    this.nodesWithProps()
      .forEach(([v, props]) => {
        G.addNode(v, props);
      });
    this.edgesWithProps()
      .forEach(([from, to, props]) => {
        G.addEdge(
          [from, to], 
          Graph.getPropsObj(props));
      });
    return G;
  }

  /**
   * Print all nodes with corresponding edges 
   */
  print() {
    console.log("=== START ===")
    for (const [k, v] of this.#G) {
      console.log(k, v)
    }
    console.log("=== END ===")
  }

  /**
   * Create object from props map
   * @param {GMap} props - GMap of graph/node/edge props
   * @return {object} object of props converted from GMap
   */
  static getPropsObj(props) {
    return [...props.entries()]
      .reduce((acc, [k, v]) => {
        acc[k] = v;
        return acc;
      }, {})
  }
}

module.exports = {
  Graph
}

