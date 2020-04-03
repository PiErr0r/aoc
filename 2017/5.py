
import math, copy, re


def part_1(data):
	steps = 0
	i = 0
	L = len(data)
	while i >= 0 and i < L:
		curr = data[i]
		data[i] += 1
		i += curr
		steps += 1
	print(steps)
	return

def part_2(data):
	steps = 0
	i = 0
	L = len(data)
	while i >= 0 and i < L:
		curr = data[i]
		if curr >= 3: data[i] -= 1
		else: data[i] += 1
		i += curr
		steps += 1
	print(steps)
	return 


if __name__ == '__main__':
	with open('5_input') as f:
		data = f.read()
		# data = data.split('\n')
		data = list(map(int, data.split()))


	part_1(data)
	part_2(data)
	