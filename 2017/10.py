
import math, copy, re

RANGE = 256
ROUNDS = 64
LIST = [i for i in range(RANGE)]
APPENDIX = [17, 31, 73, 47, 23]

def sparse_hash(len_seq, rounds):
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




def part_1(data):
	skip = 0
	pos = 0
	for L in data:
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
	print(LIST[0] * LIST[1])


	return

def part_2(data):
	len_seq = [ord(x) for x in data] + APPENDIX
	sparse_hash(len_seq, ROUNDS)
	hsh = dense_hash(LIST)
	print(len(hsh), hsh)
	return 


if __name__ == '__main__':
	with open('10_input') as f:
		data = f.read()
		# data = data.split('\n')
		# data = list(map(int, data.split(',')))


	# part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	