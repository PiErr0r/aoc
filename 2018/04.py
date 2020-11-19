import math, copy, re, hashlib
import itertools as it

template = '[YYYY-MM-DD HH:MM]'

def parse(row):
	guard = dict()
	ts = row[0:len(template)]
	action = row[len(template) + 1:]

	ts = ts[1:len(ts) - 1]
	[date, time] = ts.split(' ')
	[y, m, d] = list(map(int, date.split('-')))
	[h, min] = list(map(int, time.split(':')))
	t = 100
	ts = min + t * h + t ** 2 * d + t ** 4 * m + t ** 8 * y

	return (ts, action)

def sort_data(data):
	data = [parse(i) for i in data]
	data.sort(key=lambda x: x[0])
	return data

def get_minutes(i, guards):
	i += 1
	res = 0
	t1 = 0
	intervals = []
	while i < len(guards) and guards[i][1][0] != 'G':
		ts, act = guards[i]
		if act[0] == 'f':
			t1 = ts % 100
		elif act[0] == 'w':
			res += (ts % 100) - t1 
			r = (ts % 100) - t1 
			intervals.append((t1, t1 + r))
		i += 1
	return (i, res, intervals)

def get_id(guard):
	_, action = guard
	r = "#\d+"
	return re.findall(r, action)[0][1:]

def part_1(data):

	guards = sort_data(data)
	i = 0
	gs = dict()

	while i < len(guards):
		i_next, minutes, ints = get_minutes(i, guards)
		gid = get_id(guards[i])
		try:
			gs[gid]
			gs[gid]['mins'].append(minutes)
			gs[gid]['ints'] += ints
		except:
			gs[gid] = dict(mins=[minutes], ints=ints)

		i = i_next

	maxi = 0
	maxi_id = None
	for i in gs.keys():
		if (s:=sum(gs[i]['mins'])) > maxi:
			maxi = s
			maxi_id = i

	all_min = [0] * 60
	for i in gs[maxi_id]['ints']:
		s, e = i
		for j in range(s, e):
			all_min[j] += 1

	maxi = all_min.index(m:=max(all_min))
	print(maxi * int(maxi_id))
	print('END OF PART1')
	return

def part_2(data):

	guards = sort_data(data)
	i = 0
	gs = dict()

	while i < len(guards):
		i_next, minutes, ints = get_minutes(i, guards)
		gid = get_id(guards[i])
		try:
			gs[gid]
			gs[gid]['mins'].append(minutes)
			gs[gid]['ints'] += ints
		except:
			gs[gid] = dict(mins=[minutes], ints=ints)

		i = i_next

	gs_mins = dict()
	for i in gs.keys():
		all_min = [0] * 60
		for interval in gs[i]['ints']:
			s, e = interval
			for j in range(s, e):
				all_min[j] += 1
		gs_mins[i] = all_min[::]


	maxi = 0
	maxi_min = None
	m_id = None
	for i in gs_mins.keys():
		cmax = max(gs_mins[i])
		if cmax > maxi:
			maxi = cmax
			maxi_min = gs_mins[i].index(maxi)
			m_id = int(i)

	print(m_id * maxi_min)
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('04_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	