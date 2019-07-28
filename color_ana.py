
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


json_f = json.load(open("../json_of_pics.json","r"))

def Colors(num):
    path = "../best-artworks-of-all-time/images"
    artists = os.listdir(path)
    artists_ = artists[num]
    print(artists_)
    path_ = path + "/"+artists_
    pics = os.listdir(path + "/"+artists_)
    print("numbers:{0}".format(len(pics)))
    with open("json_of_pics_"+artists_+".js", 'w') as json_file:
        json_file.write("[\n")
        m = 1
        for i in pics:
            if i == "resized":
                continue
            json_file.write("{")
            json_file.write("url:'{0}',\n colors:[{1}] ".format(path_ + "/" + i, getColors(path_ + "/" + i)))
            json_file.write("},\n")
            print(m)
            m += 1
        json_file.write("]")

# for i in range(20,21):
#     Colors(i)

def Colors_json():
    path = "../best-artworks-of-all-time/resized/resized"
    pics = os.listdir(path)
    m = 0
    for i in pics:
        json_f["root"][m]["url"] = i
        m+=1
        json_f["root"][m]["url"] = " ".join(i[:-4].split("_")[:-1])
    print(json_f["root"][2])





