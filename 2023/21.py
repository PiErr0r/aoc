import numpy as np

y0, y1, y2 = 3941, 35259, 97807
x0, x1, x2 = 65, 65 + 131, 65 + 131 + 131 

Y = np.matrix([[y0], [y1], [y2]])

X0 = list(reversed([x0 ** i for i in range(3)]))
X1 = list(reversed([x1 ** i for i in range(3)]))
X2 = list(reversed([x2 ** i for i in range(3)]))
X = np.matrix([X0, X1, X2])

S = 26501365
a, b, c = np.linalg.inv(X) @ Y
a = a[0,0]
b = b[0,0]
c = c[0,0]
res =  round(a * S * S + b * S + c)

print(res)
print("END OF PART2");
