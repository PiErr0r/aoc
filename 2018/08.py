
import math, copy, re, hashlib
import itertools as it

"""
node anatomy:
{
	n_node -> int: number of subnodes
	n_meta -> int: number of metadata
	children -> array: subnodes
	metadata -> array: metadata
}

"""
nodes = dict()
tmp_names = [chr(i) for i in range(ord('A'), ord('Z') + 1)] + [chr(i) for i in range(ord('a'), ord('z') + 1)]
names = []
for l in tmp_names:
	for i in range(1000):
		names.append(l + str(i))
ni = 0

def new_node(node, meta):
	return dict(
		n_node=node,
		n_meta=meta,
		children=[],
		metadata=[],
		value = 0
	)

def get_data(parent, nil_pos, data):
	global nodes, names, ni
	i = nil_pos + 2
	if nodes[parent]['n_node'] == 0:
		metadata = data[i:i + nodes[parent]['n_meta']]
		nodes[parent]['metadata'] = metadata[::]
		nodes[parent]['value'] = sum(metadata)
		return i + nodes[parent]['n_meta']
	else:
		while len(nodes[parent]['children']) < nodes[parent]['n_node']:
			name = names[ni]
			ni += 1
			nodes[parent]['children'].append(name)
			nodes[name] = new_node(data[i], data[i + 1])
			i = get_data(name, i, data)
		metadata = data[i: i + nodes[parent]['n_meta']]
		nodes[parent]['metadata'] = metadata[::]
		v = 0
		for j in metadata:
			if 0 < j <= nodes[parent]['n_node']:
				v += nodes[ nodes[parent]['children'][j-1] ]['value']
		nodes[parent]['value'] = v
		return i + nodes[parent]['n_meta']

def parse(data):
	global nodes, names, ni

	n_node = data[0]
	n_meta = data[1]
	name = names[ni]
	nodes[name] = new_node(n_node, n_meta)
	ni += 1
	get_data(name, 0, data)


def part_1(data):
	global nodes
	data = parse(data)
	
	m_sum = 0
	for n in nodes.keys():
		m_sum += sum(nodes[n]['metadata'])

	print(m_sum)
	print('END OF PART1')
	return

def part_2(data):
	print(nodes['A0']['value'])
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('08_input') as f:
		data = f.read()
		# data = data.split('\n')
		data = list(map(int, data.split(" ")))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	