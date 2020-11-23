
import math, hashlib

with open('4_input') as f:
	data = f.read()

data = data.strip()
# data = data.split()
# data = list(map(int, data.split()))

i = 0

while True:
	enc_str = data + str(i)
	res = str( hashlib.md5(enc_str.encode()).hexdigest() )
	if res[:6] == '000000':
		break

	i += 1
print (i)