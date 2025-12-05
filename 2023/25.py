import networkx as nx

G = nx.Graph()
with open("25_input", "r") as f:
    for line in f.readlines():
        left, right = line.split(":")
        for r in right.split():
            G.add_edge(left.strip(), r.strip())

# print(G.edges)

C = nx.minimum_edge_cut(G)
print(C)
D = nx.stoer_wagner(G)
print(D[0])
print(len(D[1][0]), len(D[1][1]))
print(nx.kosaraju_strongly_connected_components(G))
for c in C:
    G.remove_edge(*c)

print([len(x) for x in nx.connected_components(G)])