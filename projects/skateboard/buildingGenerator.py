import random

count = 20
imgCount = 3000

tList = []

# Colors taken from https://goo.gl/images/8UYDPh
# Colors are in RGB
colorList = ["127, 142, 158",
             "139, 128, 126",
             "128, 107, 101",
             "68, 98, 144",
             "136, 78, 74",
             "176, 161, 162",
             "155, 136, 120",
             "248, 248, 237",
             "212, 210, 207",
             "126, 151, 149"
             ]

def gen():
    for i in range(count):
        xCount = random.randint(2, 5);
        yCount = round((random.randint(133, 233) / 100) * xCount)
        color = random.choice(colorList)
        createGraphics(i, xCount, yCount, color)

def createGraphics(id_, xCount, yCount, color):
    width = (60 * xCount) + 10
    height = (50 * yCount) + 70
    
    name = "backgroundTower_" + str(id_)
    tList.append(name + " = createGraphics(" + str(width) + ", " + str(height) + ");")
    tList.append(name + ".noStroke();")
    tList.append(name + ".fill(0);")
    tList.append(name + ".background(" + color + ");")
    tList.append(" ")
    tList.append("// Windows:")

    # Windows VVV
    for x in range(0, xCount):
        for y in range(0, yCount + 1):
            x_ = (60 * x) + 20
            y_ = (50 * y) + 20
            pos = str(x_) + ", " + str(y_) + ", 30, 30"

            tList.append(name + ".rect(" + pos + ");")

    # Finish VVV
    tList.append(" ")
    tList.append(" ")
    tList.append(" ")
            
        

    

def run():
    gen()

    for i in range(0, imgCount):
        name = "backgroundTower_" + str(random.randint(0, count - 1))
        tList.append("append(backgroundImgs, " + name + ")")

    for i in range(0, count):
        name = "backgroundTower_" + str(i)

        tList.append("var " + name + ";")

    for i in range(len(tList)):
        print(tList[i])

run()
