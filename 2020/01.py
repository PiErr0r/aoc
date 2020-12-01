
import math, copy, re, hashlib
import itertools as it

def rl(arr):
	return range(len(arr))

def part_1(data):

	over = False
	for i in data:
		for j in data:
			if i + j == 2020:
				print(i * j)
				over = True
				break
		if over:
			break

	print('END OF PART1')
	return

def part_2(data):
	over = False
	for i in data:
		for j in data:
			for k in data:
				if (i + j + k == 2020):
					print(i * j * k)
					over = True
					break
			if over: 
				break
		if over: 
			break
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('01_input') as f:
		data = f.read()
		# data = data.split('\n')
		data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	