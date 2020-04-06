
import math, copy, re

MAX = 50

LABYRINTH = [[None for j in range(MAX)] for i in range(MAX)]
GOAL = [31, 39]

def get_ones(string):
	cnt = 0
	for i in string:
		if i == '1':
			cnt += 1
	return cnt

def part_1(data):
	magic_number = int(data)
	formula = 'x*x + 3*x + 2*x*y + y + y*y'
	for i in range(MAX):
		for j in range(MAX):
			res = i * i + 3 * i + 2 * i * j + j + j * j
			res += magic_number
			binary = bin(res)[2:]
			ones = get_ones(binary)
			LABYRINTH[i][j] = ' ' if ones % 2 == 0 else '#'
	LABYRINTH[1][1] = 'O'
	LABYRINTH[31][39] = 'X'
	for row in LABYRINTH:
		print(''.join(row))
	return

def part_2(data):
	return 


if __name__ == '__main__':
	with open('13_input') as f:
		data = f.read()
		# data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	