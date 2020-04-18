
import math, copy, re

MAX = 200

def change_dir(row, col, curr, grid):
	if curr in 'ns':
		if col == 0:
			return 'e'
		elif col == MAX - 1:
			return 'w'
		else:
			if data[row][col + 1] == '-':
				return 'e'
			elif data[row][col - 1] == '-':
				return 'w'
	elif curr in 'we':
		if row == 0:
			return 's'
		elif row == MAX - 1:
			return 'n'
		else:
			if data[row + 1][col] == '|':
				return 's'
			elif data[row - 1][col] == '|':
				return 'n'


def part_1(data):
	first = data[0]
	i = 0
	j = first.index('|')

	string = ""
	dirs = "nesw"
	curr_dir = 's'
	# part_2
	steps = 1
	PATHS = ['|', '-', '+']

	while True:
		if curr_dir == 'n':
			i -= 1
		elif curr_dir == 'e':
			j += 1
		elif curr_dir == 's':
			i += 1
		elif curr_dir == 'w':
			j -= 1

		if data[i][j] not in PATHS:
			string += data[i][j]
			if string[-1] == 'Z': break
		else:
			if data[i][j] == ' ':
				break
			if data[i][j] == '+':
				curr_dir = change_dir(i, j, curr_dir, data)
		steps += 1
	print(string)
	print('END OF PART1')
	print(steps + 1)
	return

def part_2(data):
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('19_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	