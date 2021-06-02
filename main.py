def euclidean(m,n):
    r = 0
    while (n != 0):
        r = m % n
        m = n
        n = r
    # n = 0, maka PBB(m,n) = m
    pbb = m
    return pbb

print(euclidean(80,12))
print(euclidean(4,9))

# print(balikan(5,77))
N = int(input())

persamaan = []
for i in range(N):
    element = []
    a = int(input("Remainder: "))
    b = int(input("Modulos: "))
    element.append(a)
    element.append(b)
    kongruen = tuple(element)
    persamaan.append(kongruen)
print(persamaan)

# Hitung m
m = 1
for i in range(len(persamaan)):
    m *= persamaan[i][1]
print("m = ",m)

# Hitung M_i
M = [1 for i in range(N)]
print(M)

for i in range(len(persamaan)):
    for j in range(len(persamaan)):
        if (i != j):
            M[i] *= persamaan[j][1]
    print("M",(i+1)," = ",M[i])

# Hitung y_i
y = [1 for i in range(N)]
print(y)
# for i in range(len(N)):

