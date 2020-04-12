
import math, copy, re

def setup(data):
	network = dict()
	for record in data:
		[n, _, conns] = record.split()
		conns = conns.split(',')
		network[n] = conns[:]
	return network

CHECKED = []

def connections(node, network):
	if node not in CHECKED:
		CHECKED.append(node)
	num = 0
	for nd in network[node]:
		if nd not in CHECKED:
			num += 1 + connections(nd, network)
	return num

def part_1(data):
	network = setup(data) 
	conn_0 = connections('0', network)
	print(len(CHECKED))
	return

def part_2(data):
	network = setup(data)
	L = len(CHECKED)
	cnt = 1
	for i in range(1, 2000):
		connections(str(i), network)
		if len(CHECKED) != L:
			L = len(CHECKED)
			cnt += 1
	print(cnt)
	return 


if __name__ == '__main__':
	with open('12_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	