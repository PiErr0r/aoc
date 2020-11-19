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
	while i < len(guards) and guards[i][1][0] != 'G':
		ts, act = guards[i]
		if act[0] == 'f':
			t1 = ts % 100
		elif act[0] == 'w':
			res += (ts % 100) - t1 
		i += 1
	# print("HERE1",i, guards[i])
	return (i, res)

def get_id(guard):
	_, action = guard
	r = "#\d+"
	# print(action)
	return re.findall(r, action)[0][1:]

def part_1(data):

	guards = sort_data(data)
	i = 0
	maxi = 0
	g_id = None
	gs = dict()

	while i < len(guards):
		# print(i)
		i_next, minutes = get_minutes(i, guards)
		# print(i)
		if minutes > maxi:
			maxi = minutes
			# print(">>",i, guards[i])
			g_id = get_id(guards[i])
		i = i_next
		
	print(maxi * int(g_id))
	print('END OF PART1')
	return

def part_2(data):
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('04_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	