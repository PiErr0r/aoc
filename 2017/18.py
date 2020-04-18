
import math, copy, re

"""

snd X plays a sound with a frequency equal to the value of X.
set X Y sets register X to the value of Y.
add X Y increases register X by the value of Y.
mul X Y sets register X to the result of multiplying the value contained in register X by the value of Y.
mod X Y sets register X to the remainder of dividing the value contained in register X by the value of Y (that is, it sets X to the result of X modulo Y).
rcv X recovers the frequency of the last sound played, but only when the value of X is not zero. (If it is zero, the command does nothing.)
jgz X Y jumps with an offset of the value of Y, but only if the value of X is greater than zero. (An offset of 2 skips the next instruction, an offset of -1 jumps to the previous instruction, and so on.)

"""
SOUNDS = []
PLAYED = []
REGISTERS = dict()

REGS_id0 = dict(p = 0)
REGS_id1 = dict(p = 1)

RCVD_id0 = []
RCVD_id1 = []

COUNT = 0

def c_set(cmd, id = None):
	[_, x, y] = cmd
	y = get_val(y, id)
	if id == 0:
		REGS_id0[x] = y
	else:
		REGS_id1[x] = y
	return 1

def c_add(cmd, id = None):
	[_, x, y] = cmd
	y = get_val(y, id)
	if id == 0:
		if x in REGS_id0.keys():
			REGS_id0[x] += y
		else:
			REGS_id0[x] = y
		return 1
	else:
		if x in REGS_id1.keys():
			REGS_id1[x] += y
		else:
			REGS_id1[x] = y
		return 1


def c_mul(cmd, id = None):
	[_, x, y] = cmd
	y = get_val(y, id)
	if id == 0:
		if x in REGS_id0.keys():
			REGS_id0[x] *= y
		else:
			REGS_id0[x] = 0
		return 1
	else:
		if x in REGS_id1.keys():
			REGS_id1[x] *= y
		else:
			REGS_id1[x] = 0
		return 1

def c_mod(cmd, id = None):
	[_, x, y] = cmd
	y = get_val(y, id)
	if id == 0:
		if x in REGS_id0.keys():
			REGS_id0[x] %= y
		else:
			REGS_id0[x] = 0
		return 1
	else:
		if x in REGS_id1.keys():
			REGS_id1[x] %= y
		else:
			REGS_id1[x] = 0
		return 1

def c_jgz(cmd, id = None):
	[_, x, y] = cmd
	x = get_val(x, id)
	if x > 0:
		return get_val(y, id)
	return 1

def c_snd(cmd, id = None):
	global COUNT
	[_, snd_val] = cmd
	snd_val = get_val(snd_val, id)
	if id == 0:
		RCVD_id1.append(snd_val)
	elif id == 1:
		COUNT += 1
		RCVD_id0.append(snd_val)
	return 1

def c_rcv(cmd, id = None):
	[_, x] = cmd
	if id == 0:
		REGS_id0[x] = RCVD_id0.pop(0)
	else:
		REGS_id1[x] = RCVD_id1.pop(0)
	return 1


CMDS = dict(snd = c_snd, set = c_set, add = c_add, mul = c_mul, mod = c_mod, rcv = c_rcv, jgz = c_jgz )

def get_val(y, id = None):
	if y[0] == '-' or y.isnumeric():
		y = int(y)
	else:
		if id == 0:
			if y in REGS_id0.keys():
				y = int(REGS_id0[y])
			else:
				REGS_id0[y] = 0
				y = 0
		else:
			if y in REGS_id1.keys():
				y = int(REGS_id1[y])
			else:
				REGS_id1[y] = 0
				y = 0
	return y

def part_1(data):

	i = 0
	while i < len(data):
		# print(i)
		cmd = data[i].split()
		i += CMDS[ cmd[0] ](cmd)

	print(PLAYED[0])
	print('END OF PART1')
	return

def part_2(data):
	i0 = i1 = 0
	curr_prog = 0
	while i1 < len(data) and i0 < len(data):
		# print(i0, i1)
		if curr_prog == 0:
			cmd = data[i0].split()
			if cmd[0] == 'rcv' and len(RCVD_id0) == 0:
				if len(RCVD_id1) == 0:
					break
				curr_prog = 1
				continue
			else:
				i0 += CMDS[ cmd[0] ](cmd, curr_prog)
		else:
			cmd = data[i1].split()
			if cmd[0] == 'rcv' and len(RCVD_id1) == 0:
				if len(RCVD_id0) == 0:
					break
				curr_prog = 0
				continue
			else:
				i1 += CMDS[ cmd[0] ](cmd, curr_prog)

	print(COUNT)
	print(REGS_id0)
	print(REGS_id1)
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('18_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	# part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	