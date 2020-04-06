
import math, copy, re

REG = dict(a = 0, b = 0, c = 0, d = 0)

def parse_cmd(cmd):
	if cmd[0] == 'inc':
		REG[ cmd[1] ] += 1
	elif cmd[0] == 'dec':
		REG[ cmd[1] ] -= 1
	elif cmd[0] == 'jnz':
		if cmd[1] in REG.keys():
			return int(cmd[2]) if REG[ cmd[1] ] != 0 else 1
		else:
			return int(cmd[2]) if int(cmd[1]) != 0 else 1
	elif cmd[0] == 'cpy':
		if cmd[1] in REG.keys():
			REG[ cmd[2] ] = REG[ cmd[1] ]
		else:
			REG[ cmd[2] ] = int(cmd[1])
	return 1


def part_1(data):
	i = 0
	while i < len(data):
		cmd = data[i].split()
		i += parse_cmd(cmd)
	print(REG['a'])

	return

def part_2(data):
	i = 0
	for key in REG.keys():
		if key == 'c':
			REG[key] = 1
		else:
			REG[key] = 0
	while i < len(data):
		cmd = data[i].split()
		i += parse_cmd(cmd)
	print(REG['a'])

	return
	return 


if __name__ == '__main__':
	with open('12_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	