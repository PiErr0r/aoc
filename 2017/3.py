
import math, copy, re

MAX = 1000
HALF = 500
SPIRAL = [[None for j in range(MAX)] for i in range(MAX)]
SPIRAL[500][500] = 1
dirs = 'enws'

def part_1(data):
	n = math.sqrt(data) 
	if n == n // 1:
		print(n - 1)
		return
	else:
		n = n // 1
		n += 1 if n % 2 == 0 else 2
	half = n // 2
	end = n ** 2
	start = (n - 2) ** 2 + 1
	tmp = data - start
	diff = n - 1
	half_side = (diff - 1) // 2


	a = half
	b = abs((tmp % diff) - half_side)
	manhattan = a + b
	print(manhattan)

	return

def get_neighbours_num(pos):
	[row, col] = pos
	cnt = 0
	for i in range(row - 1, row + 2):
		for j in range(col - 1, col + 2):
			if i == row and j == col: continue
			if SPIRAL[i][j] is not None: cnt += 1
	return cnt

def get_neighbours_sum(pos):
	[row, col] = pos
	suma = 0
	for i in range(row - 1, row + 2):
		for j in range(col - 1, col + 2):
			if i == row and j == col: continue
			if SPIRAL[i][j] is not None: suma += SPIRAL[i][j]
	return suma

def move(position, direction):
	[row, col] = position
	if direction == 'e':
		col += 1
	elif direction == 'w':
		col -= 1
	elif direction == 'n':
		row += 1
	elif direction == 's':
		row -= 1
	return [row, col]

def part_2(data):
	curr_dir = 'e'
	curr_pos = [HALF, HALF]
	suma = 0
	while True:
		curr_pos = move(curr_pos, curr_dir)
		if (suma := get_neighbours_sum(curr_pos)) >= data:
			print(suma)
			break
		print(suma)
		SPIRAL[curr_pos[0]][curr_pos[1]] = suma
		neig_num = get_neighbours_num(curr_pos)
		if neig_num <= 2:
			curr_dir = dirs[(dirs.index(curr_dir) + 1) % len(dirs)]
	return 


if __name__ == '__main__':
	with open('3_input') as f:
		data = f.read()
		# data = data.split('\n')
		# data = list(map(int, data.split()))
		data = int(data)

	part_1(data)
	part_2(data)
	