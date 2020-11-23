
import math, copy, re

REGISTERS = dict()

def compare(reg, n, comp):
	if comp == '==':
		return REGISTERS[reg] == n
	elif comp == '!=':
		return REGISTERS[reg] != n
	elif comp == '<':
		return REGISTERS[reg] < n
	elif comp == '<=':
		return REGISTERS[reg] <= n
	elif comp == '>':
		return REGISTERS[reg] > n
	elif comp == '>=':
		return REGISTERS[reg] >= n
	return 

def part_1(data):
	for cmd in data:
		[reg1, op, n, _, reg2, comp, c] = cmd.split()
		if reg1 not in REGISTERS.keys():
			REGISTERS[reg1] = 0
		if reg2 not in REGISTERS.keys():
			REGISTERS[reg2] = 0

		if compare(reg2, int(c), comp):
			if op == 'inc':
				REGISTERS[reg1] += int(n)
			elif op == 'dec':
				REGISTERS[reg1] -= int(n)
	print(max(REGISTERS.values()))

	return

def part_2(data):
	maxi = 0
	for cmd in data:
		[reg1, op, n, _, reg2, comp, c] = cmd.split()
		if reg1 not in REGISTERS.keys():
			REGISTERS[reg1] = 0
		if reg2 not in REGISTERS.keys():
			REGISTERS[reg2] = 0

		if compare(reg2, int(c), comp):
			if op == 'inc':
				REGISTERS[reg1] += int(n)
			elif op == 'dec':
				REGISTERS[reg1] -= int(n)
		if REGISTERS[reg1] > maxi:
			maxi = REGISTERS[reg1]
	print(maxi)
	return 


if __name__ == '__main__':
	with open('8_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	# part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	