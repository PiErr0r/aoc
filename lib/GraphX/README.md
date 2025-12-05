# gx - GraphX library

GraphX is custom library used to manipulate and work with graphs. Mostly based on [networkx](https://networkx.org/documentation/stable/index.html).

## Types

TypeA[TypeB] means that TypeA extends TypeB
Type {TypeA|TypeB} means that Type is either TypeA or TypeB
TypeA<TypeB> means that TypeA is container for TypeB


Types:
- `Primitive {Number|String|Boolean}`
- `NodeName {Primitive|Array<Primitive>}`
- `Edge {Tuple<NodeName,NodeName,?Number|object>}`
- `GMap {Map<Array<Primitive>|Primitive,object>}`
