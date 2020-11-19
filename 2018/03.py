from disp import disp
import math, copy, re, hashlib
import itertools as it


def parse(data):
	ret_data = []
	for i in data:
		[id, meas] = i.split('@')
		id = id.strip()[1:]
		[pos, dim] = meas.split(':')
		pos = tuple(map(lambda x: int(x.strip()), pos.split(',')))
		dim = tuple(map(lambda x: int(x.strip()), dim.split('x')))
		ret_data.append((pos[::], dim[::], id))
	return ret_data

def overlap(data, i, j):
	pos1, dim1, _ = data[i]
	pos2, dim2, _ = data[j]

	if (pos1[1] <= pos2[1] < (pos1[1] + dim1[1]) or pos1[1] < (pos2[1] + dim2[1]) <= (pos1[1] + dim1[1])) and (pos1[0] <= pos2[0] < (pos1[0] + dim1[0]) or pos1[0] < (pos2[0] + dim2[0]) <= (pos1[0] + dim1[0])):
		return True
	if (pos2[1] <= pos1[1] < (pos2[1] + dim1[1]) or pos2[1] < (pos1[1] + dim2[1]) <= (pos2[1] + dim1[1])) and (pos2[0] <= pos1[0] < (pos2[0] + dim1[0]) or pos2[0] < (pos1[0] + dim2[0]) <= (pos2[0] + dim1[0])):
		return True

	return False


def cut(grid, seg):
	pos, dim, _ = seg
	for i in range(pos[0], pos[0] + dim[0]):
		for j in range(pos[1], pos[1] + dim[1]):
			if grid[i][j] == "#":
				grid[i][j] = " "
			elif grid[i][j] == " ":
				grid[i][j] = "*"
	return grid

def part_1(data):
	GRID = [["#" for i in range(1000)] for j in range(1000)]
	data = parse(data)
	olaps = set()
	for seg in data:
		GRID = cut(GRID, seg)

	cnt = 0
	for i in GRID:
		for j in i:
			if j == "*": cnt += 1

	print(cnt)
	print('END OF PART1')
	return

def part_2(data):
	data = parse(data)
	ids = set()
	for i in data:
		ids |= {int(i[2])}
	for i in range(len(data)):
		# I have no idea why commented doesn't work and the other loop does
		# There may be a mistake in overlap function but I do not see it
		# for j in range(i + 1, len(data)):			
		for j in range(len(data)):			
			if i == j: continue
			if overlap(data, i, j): 
				ids -= {int(data[i][2]), int(data[j][2])}


	print(ids)
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('03_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	