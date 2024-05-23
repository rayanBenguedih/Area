
# import json

fls = open("toto.json")
lines = fls.readlines()
print(lines)

for line in lines:
    if (line[0] != '['):
        lines = lines[1:]
        break



file2 = open("test2.json", "w")
file2.writelines(lines)
file2.close()
fls.close()

print("Succesffully did the job")
# file2 = open("test2.json", "r")
# data = json.load(file2)

# for i in data:
#     print(i)

# file2.close()