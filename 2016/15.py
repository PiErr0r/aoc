
import math, copy, re

class disk:
	"""docstring for disk"""
	def __init__(self, curr_pos, max_pos, ball_t):
		super(disk, self).__init__()
		self.curr_pos = (curr_pos + ball_t + 1) % max_pos
		self.max_pos = max_pos

	def next(self):
		self.curr_pos = (self.curr_pos + 1) % self.max_pos
		

def part_1(data):
	# Disc #1 has 17 positions; at time=0, it is at position 5.
	disks = []
	for d, i in zip(data, range(len(data))):
		[_, _, _, mp, _, _, t0, _, _, _, _, cp] = d.split()
		tmp_disk = disk(int(cp[:-1]), int(mp), i)
		disks.append(tmp_disk)
	i = 0
	while True or False:
		passed = True
		for d in disks:
			if passed and d.curr_pos:
				passed = False
			d.next()
		if passed:
			break
		i += 1

	print(i)
	print('END OF PART1')
	return

def part_2(data):
	disks = []
	for d, i in zip(data, range(len(data))):
		[_, _, _, mp, _, _, t0, _, _, _, _, cp] = d.split()
		tmp_disk = disk(int(cp[:-1]), int(mp), i)
		disks.append(tmp_disk)
		
	disks.append(disk(0, 11, len(data)))
	i = 0
	while True or False:
		passed = True
		for d in disks:
			if passed and d.curr_pos:
				passed = False
			d.next()
		if passed:
			break
		i += 1

	print(i)
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('15_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	