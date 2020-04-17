
import math, copy, re

RANGE = 256
ROUNDS = 64
APPENDIX = [17, 31, 73, 47, 23]
GRID = []
VISITED = '2'
nr = 128
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
			tmp = hex(xor)[2:]
			if len(tmp) == 1:
				tmp = '0' + tmp
			ret_hash += tmp
			xor = 0
		if i == L:
			break
		xor ^= lst[i]

	return ret_hash

def calc_bits(hsh, cout = False):
	ret = 0
	L = 32 - len(hsh)
	hsh = hsh + L * '0' 
	new_row = ""
	for char in hsh:
		ret += bin(int('0x' + char,16))[2:].count('1')
		s = bin(int('0x' + char,16))[2:]
		s = (4 - len(s)) * '0' + s
		new_row += s
	# new_row += L * '0'
	if cout:
		# print(hsh, len(hsh))
		print(new_row)

	GRID.append(list(new_row))
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

def dfs(r, c):
    GRID[r][c] = VISITED
    nc = len(GRID[r])
    if r - 1 >= 0 and len(GRID[r-1]) > c and GRID[r-1][c] == '1':
	    dfs(r-1, c)
    if r + 1 < nr and len(GRID[r+1]) > c and GRID[r+1][c] == '1':
      dfs(r+1, c)
    if c - 1 >= 0 and GRID[r][c-1] == '1':
        dfs(r, c-1)
    if c + 1 < nc and GRID[r][c+1] == '1':
        dfs(r, c+1)

def part_2(data):
	bits = 0
	for i in range(128):
		data_str = data + '-' + str(i)
		LIST = [j for j in range(RANGE)]
		len_seq = [ord(x) for x in data_str] + APPENDIX
		LIST = sparse_hash(len_seq, ROUNDS, LIST)
		hsh = dense_hash(LIST)
		calc_bits(hsh)

	islands = 0
	for row in range(len(GRID)):
		print(''.join(GRID[row]))
		for col in range(len(GRID[row])):
			if GRID[row][col] == '1':
				islands += 1
				dfs(row, col)

	print(islands)	
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('14_input') as f:
		data = f.read()
		# data = data.split('\n')
		# data = list(map(int, data.split()))


	# part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	