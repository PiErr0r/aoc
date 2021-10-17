
import math, copy, re, hashlib
import itertools as it
# import lib for year 2020
# from lib import check_data, parse_row, has_all_fields

def rl(arr):
	return range(len(arr))

def parse(state):
	state = state.split('\n')
	sid = state[0][-2]
	state = state[1:]
	ret = { 'id': sid }
	for i in range(0, len(state), 4):
		
		val = state[i][-2]
		wrt = state[i+1][-2]
		mv = state[i+2][-3:]
		cont = state[i+3][-2]
		ret[val] = { 'write': int(wrt), 'move': 'r' if mv == 'ht.' else 'l', 'next': cont }
	return ret


def part_1(data):

	init = data[0]
	temp = [parse(d) for d in data[1:]]
	states = {}
	for s in temp:
		states[s['id']] = { 0: s['0'], 1: s['1'] }

	i = 0
	st = 'A'
	reg = {0:0}
	num = 6 
	num = 12302209
	for _ in range(num):
		tmp = reg.get(i, 0)
		curr = states[st][tmp]
		reg[i] = curr['write']
		i += (1 if curr['move'] == 'r' else -1)
		st = curr['next']

	cnt = 0
	for v in reg.values():
		cnt += v
	print(cnt)
	print('END OF PART1')
	return

def part_2(data):
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('25_input') as f:
		data = f.read()
		data = data.split('\n\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	