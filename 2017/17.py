
import math, copy, re

MOVE = 314

def part_1(data):
	init = [0]
	L = 1
	curr = 0
	for i in range(1, 2018):
		curr = (curr + MOVE) % L
		init.insert(curr + 1, i)
		L = len(init)
		curr += 1
	i = init.index(2017)
	print(init[i + 1])


	print('END OF PART1')
	return

def part_2(data):
	init = [0]
	L = 1
	curr = 0
	afters = []
	for i in range(1, 50000001):
		curr = (curr + MOVE) % L
		if curr == 0:
			afters.append(i)
		L += 1
		curr += 1
	print(afters[-1])
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('17_input') as f:
		data = f.read()

	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	