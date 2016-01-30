import requests
import sys
from PIL import Image

f = open('Image1.jpg', 'wb')
url1 = "http://files.parsetfss.com/b7dd35dc-b01c-4492-b846-ef2a47bafc6b/tfss-0b3759e3-2265-430a-b033-f8f4421cdaab-Image1"
f.write(requests.get(url1).content)
f.close()
f1 = open('Image2.jpg', 'wb')
url2 = "http://files.parsetfss.com/b7dd35dc-b01c-4492-b846-ef2a47bafc6b/tfss-0b3759e3-2265-430a-b033-f8f4421cdaab-Image1"
f1.write(requests.get(url2).content)
f1.close()
background = Image.open('images/Share_Pattern.jpg')
background.thumbnail((300,300),Image.ANTIALIAS)
# background.show()
image1 = Image.open('Image1.jpg')
image1.thumbnail((75,100),Image.ANTIALIAS)
# image1.show()
image2 = Image.open('Image2.jpg')
image2.thumbnail((75,100),Image.ANTIALIAS)
image2.show()
background.paste(image1,(40,10))
background.show()
