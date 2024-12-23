import networkx as nx

with open("23_input") as f:
	data = f.read()

G = nx.Graph()

data = data.split("\n")
for row in data:
	a, b = row.split("-")
	G.add_edge(a, b)

mxC = None
mx = 0
for C in nx.find_cliques(G):
	if len(C) > mx:
		mx = len(C)
		mxC = C


print(",".join(sorted(mxC)))

