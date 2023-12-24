import sympy as sym

with open('24_input') as f:
    data = f.read()
data = data.split('\n')

ll = []
for i in range(3):
    [l, r] = data[i].split(' @ ')
    l = l.split(', ')
    r = r.split(', ')
    for j in range(3):
        ll.append(int(l[j]))
        ll.append(int(r[j]))

# x1 + a1 * vx1 = xs + a1 * vxs
# y1 + a1 * vy1 = ys + a1 * vys
# z1 + a1 * vz1 = zs + a1 * vzs
# x2 + a2 * vx2 = xs + a2 + vxs
# y2 + a2 * vy2 = ys + a2 + vys
# z2 + a2 * vz2 = zs + a2 + vzs
# x3 + a3 * vx3 = xs + a3 + vxs
# y3 + a3 * vy3 = ys + a3 + vys
# z3 + a3 * vz3 = zs + a3 + vzs

x, y, z, vx, vy, vz, t0, t1, t2 = sym.symbols('x,y,z,vx,vy,vz,t0,t1,t2')
f1 = sym.Eq(ll[0] + t0 * ll[1] , x + t0 * vx)
f2 = sym.Eq(ll[2] + t0 * ll[3] , y + t0 * vy)
f3 = sym.Eq(ll[4] + t0 * ll[5] , z + t0 * vz)
f4 = sym.Eq(ll[6] + t1 * ll[7] , x + t1 * vx)
f5 = sym.Eq(ll[8] + t1 * ll[9] , y + t1 * vy)
f6 = sym.Eq(ll[10] + t1 * ll[11] , z + t1 * vz)
f7 = sym.Eq(ll[12] + t2 * ll[13] , x + t2 * vx)
f8 = sym.Eq(ll[14] + t2 * ll[15] , y + t2 * vy)
f9 = sym.Eq(ll[16] + t2 * ll[17] , z + t2 * vz)

res = sym.solve([f1, f2, f3, f4, f5, f6, f7, f8, f9], (x, y, z, vx, vy, vz, t0, t1, t2))
print(sum(res[0][:3]))
