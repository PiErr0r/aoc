
import math, copy, re

MAX_ROW = 6
MAX_COL = 50
RECT = [['..' for j in range(MAX_COL)] for i in range(MAX_ROW)]

def make_rect(row, col):
	for i in range(row):
		for j in range(col):
			RECT[i][j] = '##'

def rotate_row(row, step):
	tmp = [None for i in range(MAX_COL)]
	for i in range(MAX_COL):
		tmp[(i + step) % MAX_COL] = copy.deepcopy(RECT[row][i])
	RECT[row] = copy.deepcopy(tmp)

def rotate_col(col, step):
	tmp = [None for i in range(MAX_ROW)]
	for i in range(MAX_ROW):
		tmp[(i + step) % MAX_ROW] = copy.deepcopy(RECT[i][col])
	for i in range(MAX_ROW):
		RECT[i][col] = copy.deepcopy(tmp[i])

def parse_cmd(cmd):
	print(cmd)
	cmd = cmd.split()
	if cmd[0] == 'rect':
		[col, row] = cmd[1].split('x')
		make_rect(int(row), int(col))
	elif cmd[0] == 'rotate':
		if cmd[1] == 'row':
			[row, _, step] = cmd[2:]
			[r, n] = row.split('=')
			rotate_row(int(n), int(step))

		elif cmd[1] == 'column':
			[col, _, step] = cmd[2:]
			[c, n] = col.split('=')
			rotate_col(int(n), int(step))


def part_1(data):
	cnt = 0
	for cmd in data:
		parse_cmd(cmd)
	for row in RECT:
		for col in row:
			if col == '#':
				cnt += 1
	print(cnt)

	return

def part_2(data):
	for cmd in data:
		parse_cmd(cmd)
	for row in RECT:
		print(''.join(row))
	return 


if __name__ == '__main__':
	with open('8_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(data)
	#part_2(data)
	