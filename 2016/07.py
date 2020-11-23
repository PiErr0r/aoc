
import math, copy, re

def has_reverse(string):
	i = 0
	while i < len(string) - 3:

		if string[i] != string[i + 1] and string[i: i + 2] == string[i + 3 : i + 1 :-1]:
			return True
		i += 1
	return False
	 

def is_tls(ip):
	reg = r'\[(.*?)\]'
	in_brack = list(re.findall(reg, ip))

	for S in in_brack:
		if has_reverse(S):
			return False
		ip = ip.replace('[' + S + ']', '-')

	out_brack = ip.split('-')

	for S in out_brack:
		if has_reverse(S):
			return True

	return False

def bab(lst, a, b):

	for string in lst:
		i = 0
		L = len(string)

		while i < L - 2:
			if string[i] == string[i + 2] and string[i] == b and string[i + 1] == a:
				return True
			i += 1
	return False

def aba(string):
	i = 0
	L = len(string)
	ab = []
	while i < L - 2:
		if string[i] != string[i + 1] and string[i] == string[i + 2]:
			ab.append(string[i: i + 2])
		i += 1
	return None if len(ab) == 0 else ab
	
def is_ssl(ip):
	reg = r'\[(.*?)\]'
	in_brack = list(re.findall(reg, ip))

	for S in in_brack:
		ip = ip.replace('[' + S + ']', '-')

	out_brack = ip.split('-')

	for S in out_brack:
		tmp = aba(S)
		if tmp is not None:
			for ab in tmp:
				[a, b] = list(ab)
				if bab(in_brack, a, b):
					return True
	return False


def part_1(data):
	cnt = 0
	for ip in data:
		if is_tls(ip):
			cnt += 1
	print(cnt)
	return

def part_2(data):
	cnt = 0
	for ip in data:
		if is_ssl(ip):
			cnt += 1
	print(cnt)
	return 


if __name__ == '__main__':
	with open('7_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(data)
	part_2(data)
	