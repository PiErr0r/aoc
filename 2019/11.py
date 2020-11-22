from lib import disp
from intcode import IntCode
import math, copy, re, hashlib
import itertools as it

DIRS = 'NESW'
MOVS = [(0, -1), (1, 0), (0, 1), (-1, 0)]


def get_new_pos(rp, rd, d):
	i_rd = DIRS.index(rd)
	i_rd += 1 if d == 1 else -1
	i_rd %= len(DIRS)
	new_rd = DIRS[i_rd]
	new_rp = (rp[0] + MOVS[i_rd][0], rp[1] + MOVS[i_rd][1])
	return (new_rp, new_rd)

def part_1(data):
	
	code = IntCode(data)
	r_pos = (0, 0)
	r_d = 'N'
	panels = {r_pos: 0}
	painted = set()
	while not code.is_halted():
		try:
			in_data = [panels[r_pos]]
		except:
			in_data = [0]

		code.unpause(in_data)
		code.calculate()
		[color, d] = code.get_output(2)
		painted |= {r_pos}
		panels[r_pos] = color
		r_pos, r_d = get_new_pos(r_pos, r_d, d)

	print(len(painted))
	print('END OF PART1')
	return

def part_2(data):
	GRID = [['.' for i in range(100)] for j in range(100)]
	code = IntCode(data)
	r_pos = (0, 0)
	r_d = 'N'
	panels = {r_pos: 1}
	while not code.is_halted():
		try:
			in_data = [panels[r_pos]]
		except:
			in_data = [0]

		code.unpause(in_data)
		code.calculate()
		[color, d] = code.get_output(2)
		panels[r_pos] = color
		GRID[50 + r_pos[1]][50 + r_pos[0]] = '#' if color == 1 else '.'
		r_pos, r_d = get_new_pos(r_pos, r_d, d)
	disp(GRID)
	print('END OF PART2')
	#CBLPJZCU
	return 


if __name__ == '__main__':
	with open('11_input') as f:
		data = f.read()
		# data = data.split('\n')
		data = list(map(int, data.split(',')))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	