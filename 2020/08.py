
import math, copy, re, hashlib
import itertools as it
# import lib for year 2020
from lib import check_data, parse_row, has_all_fields

ACC = 0

def rl(arr):
	return range(len(arr))

def nop(v):
	return 1

def acc(v):
	global ACC
	ACC += v
	return 1

def jmp(v):
	return v

fnc = {
	'nop': nop,
	'acc': acc,
	'jmp': jmp
}

def part_1(data):
	global ACC
	cmds = []
	i = 0
	while i < len(data):
		cmds.append(i)
		if len(cmds) != len(set(cmds)):
			break
		c, val = data[i].split()
		i += fnc[c](int(val))
	print(ACC)
	print('END OF PART1')
	return

def part_2(ndata):
	global ACC
	j = 0
	while j < len(ndata):
		ACC = 0
		i = 0
		inf = False
		cmds = []
		data = copy.deepcopy(ndata)
		if ndata[j][:3] == 'nop':
			data[j] = 'jmp' + ndata[j][3:]
		if ndata[j][:3] == 'jmp':
			data[j] = 'nop' + ndata[j][3:]
		if ndata[j][:3] == 'acc':
			j += 1
			continue
		while i < len(data) and not inf:
			cmds.append(i)
			if len(cmds) != len(set(cmds)):
				inf = True
				break
			c, val = data[i].split()
			i += fnc[c](int(val))
		if not inf:
			break
		j += 1

	print(ACC)
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('08_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	