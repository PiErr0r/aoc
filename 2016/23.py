
import math, copy, re, hashlib

REG = dict(a = 7, b = 0, c = 0, d = 0)

class fib(object):
	"""docstring for fib"""
	def __init__(self):
		super(fib, self).__init__()
		self.f = [0, 1]

	def get_next(self):
		ret = self.f[-1]
		self.f.append(self.f[-1] + self.f[-2])
		return ret		
	def get_prev(self):
		return self.f.pop() if len(self.f) > 2 else self.f[-1]

def parse_cmd(cmd, data, i, f):
	global REG
	# global f
	if cmd[0] == 'inc':
		REG[ cmd[1] ] += 1
	elif cmd[0] == 'dec':
		REG[ cmd[1] ] -= 1
	elif cmd[0] == 'jnz':
		if cmd[1] in REG.keys():
			return int(cmd[2]) if REG[ cmd[1] ] != 0 else 1, data
		else:
			if cmd[2] in REG.keys():
				return int(REG[cmd[2]]) if int(cmd[1]) != 0 else 1, data
			else:
				return int(cmd[2]) if int(cmd[1]) != 0 else 1, data
	elif cmd[0] == 'cpy':
		if cmd[1] in REG.keys():
			REG[ cmd[2] ] = REG[ cmd[1] ]
		else:
			REG[ cmd[2] ] = int(cmd[1])
	elif cmd[0] == 'tgl':
		print(REG)
		print(cmd)
		print(data)
		new_i = -1
		if cmd[1] in REG.keys():
			new_i = REG[ cmd[1] ]
		else:
			new_i = int(cmd[1])
		if i + new_i >= len(data):
			return 1, data
		new_cmd = data[i + new_i].split()
		if len(new_cmd) == 2:
			if new_cmd[0] == 'inc':
				data[i + new_i] = 'dec' + data[i + new_i][3:]
			else:
				data[i + new_i] = 'inc' + data[i + new_i][3:]
		elif len(new_cmd) == 3:
			if new_cmd[0] == 'jnz':
				data[i + new_i] = 'cpy' + data[i + new_i][3:]
			else:
				data[i + new_i] = 'jnz' + data[i + new_i][3:]
		print(data)

	return 1, data


def part_1(data):
	i = 0
	while i < len(data):
		cmd = data[i].split()
		new_i, data = parse_cmd(cmd, data, i)
		i += new_i
	print(REG['a'])
	print('END OF PART1')
	return

def part_2(data):
	# doesnt work, solved by hand
	f = fib()
	REG['a'] = 12
	i = 0
	while i < len(data):
		cmd = data[i].split()
		new_i, data = parse_cmd(cmd, data, i, f)
		i += new_i
		# print(REG)
		# print(data)
	print(REG['a'])
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('23_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	# part_2(copy.deepcopy(data))
	