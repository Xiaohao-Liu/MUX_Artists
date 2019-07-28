
from sklearn.cluster import KMeans
from PIL import Image
import numpy as np
import cv2
import base64
import os
import pandas as pd
import json
def getColors(file):
    image = Image.open(file).convert("RGB")
    image.thumbnail((100,100))
    image_array = np.array(image)
    shape = image_array.shape[:-1]
    #print(shape)
    image_array = image_array.reshape((shape[0] * shape[1], 3))

    clf = KMeans(n_clusters=5, random_state=9)
    clf.fit(image_array)
    centers = clf.cluster_centers_
    colors = ""
    for i in np.array(centers, dtype=np.uint8):
        colors+="'rgb({0},{1},{2})',".format(i[0],i[1],i[2])

    return colors[:-1]
    #return np.array(centers, dtype=np.uint8)

def Colors():
    path = "./best-artworks-of-all-time/resized/resized"
    pics = os.listdir(path)
    print("numbers:{0}".format(len(pics)))
    with open("json_of_pics.json", 'w') as json_file:
        json_file.write("[\n")
        m = 1
        for i in pics:
            json_file.write("{")
            json_file.write("url:'{0}',\n colors:[{1}] ".format(path + "/" + pics[1], getColors(path + "/" + pics[1])))
            json_file.write("},\n")
            print(m)
            m += 1
        json_file.write("]")

csv_path = "./best-artworks-of-all-time/artists.csv"
csv = pd.read_csv(csv_path)
csv = csv.to_numpy()
print(csv)
csv2_path = "./best-artworks-of-all-time/artists_v0.2.csv"
csv2 = pd.read_csv(csv2_path)
csv2 = csv2.to_numpy()
def Factions():
    factions = []
    for i in csv:
        for f in i[3].split(","):
            if f not in factions:
                factions.append(f)
    # print(len(factions))
    # print(factions)
    return factions

# Factions()


def Countries():
    Countries_array = []
    countries = []
    for i in csv:
        for c in i[4].split(","):
            if c not in countries:
                countries.append(c)
    for i in csv:
        temp = []
        for c in i[4].split(","):
            temp.append(countries.index(c))
        Countries_array.append(temp)
    return Countries_array

# print(Countries())

def Life():
    Life_array = []
    for i in csv:
        temp = [int(i[2][:4]), int(i[2][-4:])]
        Life_array.append(temp)
    print(max(Life_array))
    print(min(Life_array))
    return Life_array
Life_a = Life()

def Paintings():
    Paintings_array = []
    for i in csv:
        Paintings_array.append(i[-1])
    print(Paintings_array)
Paintings()
def Artists():
    Artists_array = []
    for i in csv:
        Artists_array.append(i[1])
    return Artists_array

Artists_a = Artists()
print(Artists_a)

json_f = json.load(open("./json_of_pics.json","r"))

def Colors_json():
    path = "./best-artworks-of-all-time/resized/resized"
    pics = os.listdir(path)
    m = 0
    for i in pics:
        print(" ".join(i[:-4].split("_")[:-1]))
        print(m)
        json_f["root"][m]["url"] = i

        json_f["root"][m]["artist_ID"] = Artists_a.index(" ".join(i[:-4].split("_")[:-1]))

        m += 1
    print(json_f["root"][2])

#
# Colors_json()

def mapping():
    temp_a = Life()
    mapping_array = {}

    for i in range(0, len(temp_a)):
        min_ = min(temp_a)
        temp_a.remove(min_)
        mapping_array[Life_a.index(min_)] = i
    print(mapping_array)

def getC():
    pass
def Period():
    Period_nums = {"Modern Art":0, "Medieval Art":0}
    # print(csv2)
    for i in csv2:
        for p in i[3].split(" \n"):
            if p == "Modern Art":
                Period_nums["Modern Art"] += 1
            else :
                Period_nums["Medieval Art"] += 1
    print(Period_nums)

def Artists2genre():
    Artists2genre_mapping = []
    factions = Factions()

    for i in csv:
        for f in i[3].split(","):
            Artists2genre_mapping.append([Artists_a.index(i[1]),factions.index(f)])
    print(len(Artists2genre_mapping))
    print(Artists2genre_mapping)
    return Artists2genre_mapping

def Genre2Period():
    Genre2Period_mapping = {}
    factions = Factions()

    for i in csv2:
        for f in i[4].split(","):
            if i[3] == "Modern Art":
                Genre2Period_mapping[factions.index(f)] = 0
            else:
                Genre2Period_mapping[factions.index(f)] = 1

    print(Genre2Period_mapping)

def countgenre():

    factions = Factions()
    print(factions)
    print(len(factions))
    genre_num = np.zeros(len(factions), dtype=int)
    for i in csv2:
        for f in i[4].split(","):
            genre_num[factions.index(f)] += 1

    print(genre_num.tolist())

def JSON_OF_PICS():
    jsons_path = "./source/JsonOfPics"
    jsonsfile = os.listdir(jsons_path)
    with open("colorsData.js","w") as file:
        for i in jsonsfile:
            name = " ".join(i[13:].split(".js")[0].split("_"))
            if name == "Albrecht Dürer":
                file.write("var Colors19 = \n")
                file.write(open(jsons_path + "/" + i, "r").read())
                file.write("\n")
                continue
            file.write("var Colors{0} = \n".format(Artists_a.index(name)))
            file.write(open(jsons_path + "/" + i,"r").read())
            file.write("\n")


def Artist_color(num):
    path = "./best-artworks-of-all-time/images"
    artists = os.listdir(path)
    artists_ = artists[num]
    # print(artists_)
    path_ = path + "/" + artists_
    pics = os.listdir(path + "/" + artists_)
    # print("numbers:{0}".format(len(pics)))
    images = np.array([0, 0, 0])
    for i in pics:
        if i == "resized":
            continue
        image = Image.open(path_ + "/" + i).convert("RGB")
        image.thumbnail((100, 100))
        image_array = np.array(image)
        shape = image_array.shape[:-1]
        # print(shape)
        image_array = image_array.reshape((shape[0] * shape[1], 3))
        images = np.vstack((images, image_array))
    # print(images)

    name = " ".join(artists_.split("_"))

    clf = KMeans(n_clusters=1, random_state=9)
    clf.fit(images)
    centers = clf.cluster_centers_
    print(centers[0])
    return Artists_a.index(name), centers[0]

# for i in range(22,50):
#     temp = Artist_color(i)
#     index = temp[0]
#     color = np.array(temp[1], dtype=np.uint8).tolist()
#     print(str(index)+":'rgb({0},{1},{2})'".format(color[0],color[1],color[2]))

# Artist_color_ = {2:'rgb(130,96,63)', 30:'rgb(126,100,77)',41:'rgb(143,141,105)',6:'rgb(104,90,80)',48:'rgb(153,139,121)',29:'rgb(103,85,76)',0:'rgb(120,92,72)',34:'rgb(93,81,65)',38:'rgb(105,94,73)',1:'rgb(140,124,101)',14:'rgb(106,84,67)',4:'rgb(110,101,93)',10:'rgb(125,102,64)',20:'rgb(138,139,131)',18:'rgb(80,69,60)',9:'rgb(146,141,119)',25:'rgb(83,64,54)',46:'rgb(124,117,101)',8:'rgb(131,124,97)',24:'rgb(112,94,73)',49:'rgb(128,117,99)',5:'rgb(152,135,124)',3:'rgb(138,142,134)',31:'rgb(58,46,34)',11:'rgb(160,148,135)',7:'rgb(147,124,90)',36:'rgb(154,136,110)',13:'rgb(135,120,95)',12:'rgb(133,122,109)',33:'rgb(143,118,90)',39:'rgb(94,78,56)',17:'rgb(141,105,66)',23:'rgb(122,102,85)',45:'rgb(143,119,112)',37:'rgb(116,95,82)',40:'rgb(113,111,92)',27:'rgb(89,69,55)',28:'rgb(131,112,87)',26:'rgb(176,155,132)',22:'rgb(150,143,136)',16:'rgb(122,114,106)',47:'rgb(104,89,74)',32:'rgb(80,65,51)',42:'rgb(150,120,96)',35:'rgb(125,123,106)',21:'rgb(137,123,104)',15:'rgb(127,106,83)',43:'rgb(158,141,131)',44:'rgb(147,126,100)',19:'rgb(173,171,167)'}
#
# Artist2genre_mapping = [[0, 0], [1, 0], [1, 1], [2, 2], [2, 3], [3, 4], [4, 5], [4, 4], [5, 5], [6, 6], [6, 4], [7, 7], [8, 8], [9, 9], [9, 10], [10, 11], [11, 12], [12, 9], [13, 13], [14, 14], [15, 4], [16, 15], [17, 16], [17, 5], [18, 17], [19, 11], [20, 4], [21, 11], [22, 16], [23, 18], [24, 19], [25, 14], [26, 20], [27, 14], [28, 4], [28, 8], [29, 11], [30, 4], [31, 14], [32, 20], [32, 17], [33, 8], [34, 6], [35, 4], [35, 8], [36, 15], [37, 9], [37, 0], [38, 8], [39, 15], [40, 16], [41, 8], [42, 0], [42, 1], [42, 5], [43, 21], [44, 5], [45, 22], [46, 9], [46, 8], [47, 20], [48, 20], [49, 23]]
#
# Genre_color=[]
# for i in range(0,24):
#     Genre_color.append([0,0,0])
#
# for i in Artist2genre_mapping:
#
#     index_A = i[0]
#     index_G = i[1]
#     color = Artist_color_[i[0]][4:-1].split(",")
#     temp_c = [0,0,0]
#     m = 0
#     for i in color:
#         temp_c[m] = int(color[m])
#         m+=1
#     m=0
#     for i in color:
#         Genre_color[index_G][m] += int(color[m])
#         m+=1
#
# Gcolors = []
# genres_num = [4, 2, 1, 1, 8, 5, 2, 1, 7, 4, 1, 4, 1, 1, 4, 3, 3, 2, 1, 1, 4, 1, 1, 1]
# m = 0
# for i in Genre_color:
#     temp = ["","",""]
#     for t in range(0,3):
#         temp[t] = str(int(i[t]/ genres_num[m]))
#     m+=1
#     Gcolors.append("rgba("+",".join(temp)+", .7)")
# print(Gcolors)


def Artists_marriage():
    AM_array = []
    m_path = "./source/marriage.csv"
    csv_m = pd.read_csv(m_path)
    csv_m = csv_m.to_numpy()
    for i in csv_m:
        if(type(i[2]) is float):
            AM_array.append([])
            continue

        temp = i[2].split("-")
        temp_A = []
        for tem in range(0,int(len(temp)/2)):
            temp_A.append([int(temp[tem]),int(temp[tem+1])])
        AM_array.append(temp_A)
    print(AM_array)

# Artists_marriage()

def Artists_work():
    w_path = "./source/work.csv"
    csv_w = pd.read_csv(w_path)
    csv_w = csv_w.to_numpy()
    print(csv_w)
    AW_array = []
    for i in range(0,50):
        AW_array.append([])
    img_dir = os.listdir("./best-artworks-of-all-time/resized/resized")
    for i in csv_w:
        temp = {0:[], 1:0, 2:""}
        if type(i[3]) is float:
            continue
        file = "./best-artworks-of-all-time/resized/resized/" + i[3] + ".jpg"
        if i[3] + ".jpg" not in img_dir:
            continue
        index_A = int(i[0])
        temp[1] = int(i[4])
        temp[2] = i[3]
        image = Image.open(file).convert("RGB")
        image.thumbnail((50, 50))
        image_array = np.array(image)
        shape = image_array.shape[:-1]
        # print(shape)
        image_array = image_array.reshape((shape[0] * shape[1], 3))

        clf = KMeans(n_clusters=2, random_state=9)
        clf.fit(image_array)
        centers = clf.cluster_centers_
        for c in centers:
            temp[0].append("rgb({0},{1},{2})".format(int(c[0]), int(c[1]), int(c[2])))

        AW_array[index_A].append(temp)
    print(AW_array)

# Artists_work()

#MAP

def Artists_country():
    Artists_country_a = []
    countries = []
    countries_nums_a = []
    for i in range(0,50):
        Artists_country_a.append([]);
    for i in range(0,16):
        countries_nums_a.append(0);
    m = 0
    for i in csv:
        for c in i[4].split(","):
            if c not in countries:
                if c == "Jewish":
                    continue
                countries.append(c)
            countries_nums_a[countries.index(c)] += 1
            Artists_country_a[m].append(countries.index(c))
        m+=1

    print(len(countries))
    print(countries)
    print(countries_nums_a)
    print(Artists_country_a)

Artists_country()

# def Artists_desc():
#     Artists_desc_a = []
#     for i in csv:
#         Artists_desc_a.append(i[5])
#
#     print(Artists_desc_a)
#
#
# # Artists_desc()
#
# def Artists_price():
#     p_path = "./source/price.csv"
#     p_csv = pd.read_csv(p_path)
#     p_csv = p_csv.to_numpy()
#     Artists_price_a = []
#     for i in p_csv:
#         if(i[0]>= 0 ):
#             Artists_price_a.append(i[0])
#         else:
#             Artists_price_a.append(0)
#     print(Artists_price_a)
#
# Artists_price()