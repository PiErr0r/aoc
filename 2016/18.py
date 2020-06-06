
import math, copy, re, hashlib

TRAP = '^'
SAFE = '.'
TRAPS = [1, 3, 4, 6]
MAX_ROWS = 40

def get_row(prev):
	ret = ''
	for i in range(len(prev)):
		add = 4
		suma = 0
		for j in range(i - 1, i + 2):
			if j < 0 or j >= len(prev):
				add /= 2
				continue
			suma += add if prev[j] == TRAP else 0
			add /= 2
		ret += TRAP if suma in TRAPS else SAFE
	return ret

def part_1(data):
	rows = []
	for i in range(MAX_ROWS):
		rows.append(data)
		data = get_row(data)

	suma = 0
	for row in rows:
		print(row)
		for col in row:
			suma += 1 if col == SAFE else 0
	print(suma)
	print('END OF PART1')
	return

def part_2(data):
	suma = 0
	for i in range(MAX_ROWS * 10000):
		for c in data:
			suma += 1 if c == SAFE else 0
		data = get_row(data)
	print(suma)
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('18_input') as f:
		data = f.read()
		# data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	