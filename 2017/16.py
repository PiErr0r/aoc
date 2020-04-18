
import math, copy, re

# MAX = 1000000000
MAX = 1000

def setup():
	i = ord('a')
	ret = ""
	while chr(i) != chr( ord('p') + 1 ):
		ret += chr(i)
		i += 1
	return ret

def swap(dancers, pos1, pos2):
	tmp = list(dancers)
	tmp[pos1], tmp[pos2] = tmp[pos2], tmp[pos1]
	return ''.join(tmp)

def partner(dancers, p1, p2):
	tmp = list(dancers)
	p1i = tmp.index(p1)
	p2i = tmp.index(p2)
	return swap(''.join(tmp), p1i, p2i)

def dance(dancers, move):
	if move[0] == 's':
		by = int(move[1:])
		dancers = dancers[-1 * by :] + dancers[: -1 * by]
	elif move[0] == 'x':
		[pos1, pos2] = move[1:].split('/')
		dancers = swap(dancers, int(pos1), int(pos2))
	elif move[0] == 'p':
		[p1, p2] = move[1:].split('/')
		dancers = partner(dancers, p1, p2)
	return dancers


def part_1(data):
	dancers = setup()
	for i, move in enumerate(data):
		dancers = dance(dancers, move)
	print(dancers)
	print('END OF PART1')
	return

def part_2(data):
	dancers = setup()
	dancers_cp = setup()
	for test in range(MAX % 30):
		for i, move in enumerate(data):
			dancers = dance(dancers, move)
		if dancers == dancers_cp:
			print(test)


	print(dancers)
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('16_input') as f:
		data = f.read()
		data = data.split(',')
		# data = list(map(int, data.split()))


	# part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	