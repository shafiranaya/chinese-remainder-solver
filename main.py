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

def modulo_multiplicative_inverse(A, M):
    for i in range(0, M):
        if (A*i) % M == 1:
            return i
    return -1

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

for i in range(len(persamaan)):
    for j in range(i,len(persamaan)):
        if (i != j):
            print(persamaan[i][1],persamaan[j][1])
            if(euclidean(persamaan[i][1],persamaan[j][1])!=1):
                print("false")
            else:
                print("true")
# Hitung y_i
y = [1 for i in range(N)]
for i in range(len(y)):
    y[i] = modulo_multiplicative_inverse(M[i],persamaan[i][1])
print(y)

# Solusi
sum = 0
for i in range(N):
    sum += persamaan[i][0]*M[i]*y[i]
x = sum % m
print(" x = ",x)