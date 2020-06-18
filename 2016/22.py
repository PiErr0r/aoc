
import math, copy, re, hashlib

def init1():
	return [None for i in range(39 * 25)]


def init2():
	return [[None for j in range(25)] for i in range(39)]

def part_1(data):
	grid = init1()
	for d in data[2:]:
		node, size, used, avail, used_p = d.split()
		_, x, y = node.split('-')
		x = int(x[1:])
		y = int(y[1:])
		grid[x * 25 + y] = dict(
			size = int(size[:-1]),
			used = int(used[:-1]),
			avail = int(avail[:-1]),
			used_p = int(used_p[:-1])
		)
	cnt = 0
	for i in range(len(grid)):
		if grid[i]['used'] == 0: continue
		for j in range(0, len(grid)):
			if i == j: continue
			if grid[i]['used'] <= grid[j]['avail']: 
				cnt += 1
				

	print(cnt)
	print('END OF PART1')
	return

def part_2(data):
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('22_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	