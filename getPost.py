from parse_rest.datatypes import Object
import settings_local

def getSinglePost(objectId):
    settings_local.initParse()
    className="Posts"
    Posts=Object.factory(className)
    SinglePost=Posts.Query.get(objectId=objectId)
    print SinglePost.Image1.url
    return SinglePost

