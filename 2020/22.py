
import math, copy, re, hashlib
import itertools as it
# import lib for year 2020
from lib import check_data, parse_row, has_all_fields

def rl(arr):
	return range(len(arr))

def part_1(data):
	p1 = data[0].split()
	p1 = list(map(int, p1[2:]))
	p2 = data[1].split()
	p2 = list(map(int, p2[2:]))

	while len(p1) and len(p2):
		c1 = p1.pop(0)
		c2 = p2.pop(0)
		if c1 > c2:
			p1 = p1 + [c1, c2]
		else:
			p2 = p2 + [c2, c1]

	score = 0
	if len(p1):
		for i, c in enumerate(p1[::-1]):
			score += c * (i + 1)
	else:
		for i, c in enumerate(p2[::-1]):
			score += c * (i + 1)
	print(score)
	print('END OF PART1')
	return

games = dict()

def play(p1, p2, rnd = 0):
	global games
	rounds = dict()
	while len(p1) and len(p2):
		try:
			if rounds[(tuple(p1),tuple(p2))]:
				return [True] + p1, [False] + p2
		except:
			rounds[(tuple(p1[::]), tuple(p2[::]))] = True
			c1, c2 = p1.pop(0), p2.pop(0)
			if c1 <= len(p1) and c2 <= len(p2):
				if (curr := games.get((tuple(p1), tuple(p2)), False)):
					w1, w2 = curr
				else:
					w1, w2 = play(p1[:c1:], p2[:c2:], rnd + 1)
					games[(tuple(p1), tuple(p2))] = ([w1[0]], [w2[0]])
				if w1[0]:
					p1 += [c1, c2]
				else:
					p2 += [c2, c1]
			else:
				if c1 > c2:
					p1 += [c1, c2]
				else:
					p2 += [c2, c1]
	return [len(p1) > 0] + p1, [len(p2) > 0] + p2

def part_2(data):

	p1 = data[0].split()
	p1 = list(map(int, p1[2:]))
	p2 = data[1].split()
	p2 = list(map(int, p2[2:]))

	p1, p2 = play(p1, p2)
	score = 0
	if p1[0]:
		for i, c in enumerate(p1[:0:-1]):
			score += c * (i + 1)
	else:
		for i, c in enumerate(p2[:0:-1]):
			score += c * (i + 1)
	print(score)

	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('22_input') as f:
		data = f.read()
		data = data.split('\n\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	