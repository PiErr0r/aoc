
import math, copy

def get_max(letters):
	ret = list(letters.values())
	ret.sort()
	ret.reverse()

	return ret[:5]

def is_real(room):
	enc = room.split('-')
	cond = enc[-1].split('[')
	hsh = ''.join(enc[:-1])

	ID = int(cond[0])
	cond = set(cond[1][:-1])

	letters = dict()

	for l in hsh:
		if l in letters.keys():
			letters[l] += 1
		else:
			letters[l] = 1

	max_list = get_max(letters)
	max_letters = []
	for m in max_list:
		for l in sorted(letters):
			if l not in max_letters and hsh.count(l) == m:
				max_letters.append(l)
				if len(max_letters) == 5:
					break
		if len(max_letters) == 5:
			break

	if len(cond - set(max_letters)) == 0:
		return ID
	else: 
		return None


def decrypt(room):
	enc = room.split('-')
	cond = enc[-1].split('[')
	hsh = ' '.join(enc[:-1])

	ID = int(cond[0])
	# cond = set(cond[1][:-1])

	inc = ID % 26
	string = []
	for letter in hsh:
		if letter == ' ':
			string.append(' ')
			continue
		curr_inc = ord(letter) + inc
		if curr_inc > ord('z'):
			curr_inc -= (ord('z') - ord('a')) + 1
			string.append(chr(curr_inc))
		else:
			string.append(chr(curr_inc))
			pass

	if 'north' in ''.join(string).lower() or 'object' in ''.join(string).lower():
		print(ID, ''.join(string))


def part_1(data):
	cnt = 0
	ids = []
	for room in data:
		tmp = is_real(room)
		if tmp is not None:
			cnt += 1
			ids.append(tmp)
	print(sum(ids))

	return ids

def part_2(data):
	for room in data:
		if is_real(room) is not None:
			decrypt(room)

	return 


if __name__ == '__main__':
	with open('4_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))

	part_1(data)
	part_2(data)
	