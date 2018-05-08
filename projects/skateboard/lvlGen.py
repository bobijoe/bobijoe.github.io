import random

lvlCount = 100
sections = ["  flat(h_, 1000); // Just a buffer!", " "]

for i in range(1, lvlCount + 1):
    numSections = (20 * (i ** 0.25)) - 19
    numSections = int(round(numSections))

    for j in range(0, numSections):
        sectionType = random.randint(0, 1)
        
        if sectionType == 0:
            length = random.randint(70, 200)
            
            string = "  flat(h_, " + str(length) + ");"
            sections.append(string)
        else:
            slope = random.randint(-113, 113)
            slope /= 100
            length = random.randint(50, 700)

            string = "  slope(h_, " + str(slope) + ", " + str(length) + ");"
            sections.append(string)
            
    sections.append("  flat(h_, 50, 'END'); // End of level " + str(i))
    sections.append(" ")
sections.append(" ")
sections.append(" ")

for i in range(0, lvlCount):
    sectionType = random.randint(0, 1)
        
    if sectionType == 0:
        length = random.randint(70, 200)
            
        string = "  flat(h_, " + str(length) + ");"
        sections.append(string)
    else:
        slope = random.randint(-113, 113)
        slope /= 100
        length = random.randint(50, 700)

        string = "  slope(h_, " + str(slope) + ", " + str(length) + ");"
        sections.append(string)
            
sections.append("  flat(h_, 50, 'END'); // End of last level")
sections.append(" ")

for i in range(len(sections)):
    print(sections[i])
