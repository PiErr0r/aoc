# R = [_, a, b, c, d, e]
_ = 0
a = b = c = d = e = 0
a = 0
c = 65536
a = 6780005
b = c & 255
a += b
a &= 16777215
a *= 65899
a &= 16777215
tmpc = c
# mn = 10000000000000000000000
prev = set()
while c >= 256:
	# print('c',c)
	b = 0
	# while e <= c:
	# 	e = 0
	# 	b += 1
	# 	e = b + 1
	# 	e *= 256
	b = ((c + 256) // 256) - 1
	# print('b', b)
	c = b

	b = c & 255
	a += b
	a &= 16777215
	a *= 65899
	a &= 16777215
	# print(a, b, c, d, e)
	if c < 256:
		print("more", a, c)
		if a in prev:
			print("####################3", a, c)
			# exit()
		prev.add(a)
		if _ == a:
			print("HALT")
			exit()
		else:
			c = a | 65536
			a = 6780005
			b = c & 255
			a += b
			a &= 16777215
			a *= 65899
			a &= 16777215
