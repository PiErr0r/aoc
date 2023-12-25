import networkx as nx

G = nx.Graph()
with open("25_input", "r") as f:
    for line in f.readlines():
        left, right = line.split(":")
        for r in right.split():
            G.add_edge(left.strip(), r.strip())

# print(G.edges)

C = nx.minimum_edge_cut(G)
for c in C:
    G.remove_edge(*c)

print([len(x) for x in nx.connected_components(G)])