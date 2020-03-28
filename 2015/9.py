
import math, copy
from itertools import permutations 

with open('9_input') as f:
	data = f.read()
	data = data.split('\n')
	# data = list(map(int, data.split()))

l_dists = dict()
l_names = []

def part_1():
	for route in data:
		[l1, _, l2, __, d] = route.split()

		if l1 not in l_names:
			l_names.append(l1)
		if l2 not in l_names:
			l_names.append(l2)

		if l1 not in l_dists:
			l_dists[l1] = dict()
			l_dists[l1][l2] = int(d)
		else:
			l_dists[l1][l2] = int(d)

		if l2 not in l_dists:
			l_dists[l2] = dict()
			l_dists[l2][l1] = int(d)
		else:
			l_dists[l2][l1] = int(d)
	perms = permutations(l_names)
	tmp = next(perms)
	d_sums = []
	while tmp:
		tmp_sum = 0
		for i in range(len(tmp) - 1):
			tmp_sum += l_dists[ tmp[i] ][ tmp[i + 1] ]
		d_sums.append(tmp_sum)
		tmp = next(perms, False)
	print(min(d_sums), max(d_sums))
	return

def part_2():
	return 


if __name__ == '__main__':
	part_1()
	#part_2()

	