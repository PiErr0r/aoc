
import math, copy, re
from functools import reduce

PROGRAMS = dict()
HELD = list()

def part_1(data):
	global HELD 
	for program in data:
		program = program.split()
		if len(program) == 2:
			holder, weight = program[0], int(program[1][1:-1])
			PROGRAMS[holder] = dict(weight = weight, holds = None)
		else:
			holder, weight, holds = program[0], int(program[1][1:-1]), ''.join(program[3:]).split(',')
			PROGRAMS[holder] = dict(weight = weight, holds = holds[:])
			HELD += holds[:]
	for program in PROGRAMS.keys():
		if program not in HELD:
			return program

## recursive function for mass calculation

def all_equal(arr):
	L = len(arr)
	for i in range(L - 1):
		if arr[i] != arr[i + 1]:
			return i + 1
	return -1

def calc_mass(prog):
	if PROGRAMS[prog]['holds'] is not None:
		mass_arr = list()
		for sub in PROGRAMS[prog]['holds']:
			mass_arr.append( calc_mass(sub) )
		if (tmp := all_equal(mass_arr)) != -1:
			print(PROGRAMS[prog]['holds'][tmp], PROGRAMS[ PROGRAMS[prog]['holds'][tmp] ])
			print(PROGRAMS[prog]['holds'])
			print(mass_arr)
		return PROGRAMS[prog]['weight'] + sum(mass_arr)
	else: return PROGRAMS[prog]['weight']


def part_2(data):
	daddy = part_1(data)
	print(daddy)
	calc_mass(daddy)

	return 


if __name__ == '__main__':
	with open('7_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	# part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	