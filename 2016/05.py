
import math, copy, hashlib



def part_1(data):

	i = 0
	password = ''
	while True:
		enc_str = data + str(i)
		res = str( hashlib.md5(enc_str.encode()).hexdigest() )
		if res[:5] == '00000':
			password += res[5]
			if len(password) == 8:
				break
		i += 1

	print(password)
	return

def part_2(data):
	i = 0
	password = '_' * 8
	password = list(password)
	positions = []
	while True:
		enc_str = data + str(i)
		res = str( hashlib.md5(enc_str.encode()).hexdigest() )
		if res[:5] == '00000':
			char = res[5]
			if char not in positions and char.isdigit() and int(char) < 8:
				positions.append(char)
				password[int(char)] = res[6]
				print(''.join(password))
			if '_' not in password:
				break
		i += 1

	return


if __name__ == '__main__':
	with open('5_input') as f:
		data = f.read()
		# data = data.split()
		# data = list(map(int, data.split()))

	# part_1(data)
	part_2(data)
	