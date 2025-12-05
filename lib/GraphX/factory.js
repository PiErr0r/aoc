const { GMap } = require("./gmap")

/**
 * factory used to initialize GMap for graph
 * @return {GMap} GMap which contains graph nodes and edges
 */
const graphFactory = () => {
  return new GMap();
}

/**
 * factory used to initialize GMap for node
 * @param {object} data - any data which will be added as props to node GMap
 * @return {Gmap} GMap with props for node
 */
const nodeFactory = (data = {}) => {
  const node = new GMap();
  Object.keys(data).forEach(k => {
    node.setProp(k, data[k]);
  });
  node.setProp('visited', false)
  return node;
}

/**
 * factory used to initialize GMap for edge
 * @param {object} data - any data which will be added as props to edge GMap
 * @return {GMap} GMap with props for edge
 */
const edgeFactory = (data = {}) => {
  const edge = new GMap();
  Object.keys(data).forEach(k => {
    edge.set(k, data[k]);
  })
  if (!edge.has('w')) edge.set('w', 1);
  return edge;
}

module.exports = {
  graphFactory,
  nodeFactory,
  edgeFactory,
}