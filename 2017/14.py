
import math, copy, re

RANGE = 256
ROUNDS = 64
APPENDIX = [17, 31, 73, 47, 23]
GRID = []

def sparse_hash(len_seq, rounds, LIST):
	skip = pos = 0
	for i in range(rounds):
		for L in len_seq:
			if pos + L > RANGE:
				sublist = LIST[pos :] + LIST[: (pos + L) % RANGE]
			else:
				sublist = LIST[pos : pos + L]
			sublist.reverse()
			if pos + L > RANGE:
				LIST[pos :] = sublist[: RANGE - pos]
				LIST[: (pos + L) % RANGE] = sublist[RANGE - pos :]
			else:
				LIST[pos : pos + L] = sublist
			pos = (pos + L + skip) % RANGE
			skip += 1

	return LIST

def dense_hash(lst):
	ret_hash = ''
	xor = 0
	L = len(lst)
	for i in range(L + 1):
		if i > 0 and i % 16 == 0:
			ret_hash += hex(xor)[2:]
			xor = 0
		if i == L:
			break
		xor ^= lst[i]

	return ret_hash

def calc_bits(hsh, cout = False):
	ret = 0
	L = 32 - len(hsh)
	hsh = L * '0' + hsh
	new_row = ""
	for char in hsh:
		ret += bin(int('0x' + char,16))[2:].count('1')
		s = bin(int('0x' + char,16))[2:]
		prnt = f'{s:0>4}'.replace('1', '#').replace('0', '.')
		# print(prnt)
		new_row += prnt
		if cout:
			print(prnt, end='')
	if cout:
		print()
	GRID.append(new_row)
	return ret


def part_1(data):
	bits = 0
	for i in range(128):
		data_str = data + '-' + str(i)
		LIST = [j for j in range(RANGE)]
		len_seq = [ord(x) for x in data_str] + APPENDIX
		LIST = sparse_hash(len_seq, ROUNDS, LIST)
		hsh = dense_hash(LIST)
		bits += calc_bits(hsh)
	
	print(bits)

	print('END OF PART1')
	return

def parse_grid():
	cnt = 0
	brk = True
	new_grid = []
	print(len(GRID))
	for i in range(len(GRID)):
		new_row = ''
		for j in range(len(GRID[i])):
			if brk and GRID[i][j] == '#':
				if i > 0 and GRID[i - 1][j] != '.':
					S = new_grid[i - 1][j]
					cnt = int(S)
				else: S = str(cnt)

				new_row += S
			else:
				if GRID[i][j] == '.':
					new_row += GRID[i][j]
					brk = False
				if GRID[i][j] == '#':
					cnt += 1
					cnt = cnt % 10
					brk = True
					new_row += str(cnt)
		new_grid.append(new_row)

	for row in new_grid:
		print(row)



##############
# NOT SOLVED #
##############
def part_2(data):
	bits = 0
	for i in range(128):
		data_str = data + '-' + str(i)
		LIST = [j for j in range(RANGE)]
		len_seq = [ord(x) for x in data_str] + APPENDIX
		LIST = sparse_hash(len_seq, ROUNDS, LIST)
		hsh = dense_hash(LIST)
		calc_bits(hsh)

	parse_grid()
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('14_input') as f:
		data = f.read()
		# data = data.split('\n')
		# data = list(map(int, data.split()))


	# part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	