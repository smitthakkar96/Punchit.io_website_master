var app = angular.module('app.factory',[])

app.factory('PostService',['$http','Time','$q',function ($http,Time,$q) {
  var Posts = []
  return {
     GetPosts : function(notContainedIn)
     {
      var deferred = $q.defer();
    	// $http.get('/GetUserInterests').then(function(response) {
    	// })
      Parse.initialize("Y4Txek5e5lKnGzkArbcNMVKqMHyaTk3XR6COOpg4", "fR1P17QhE9b7PKOa1wXozi0yo8IAlYLSIzqYh4EU");
      Parse.Cloud.run("GetUserIntrest",{},{
        success : function(Interests)
        {
          var posts = Parse.Object.extend("Posts")
    		var Query = new  Parse.Query(posts)
        // console.log(notContainedIn.length)
        Query.containedIn("TargetIntrests",Interests)
    		if(notContainedIn.length > 0){
    			var ExistingObjectIds=new Array();
    			for(var i=0;i<notContainedIn.length;i++)
    			{
            //console.log(notContainedIn[i].id)
    				ExistingObjectIds[i] = notContainedIn[i].id;
    			}
    			Query.notContainedIn("objectId",ExistingObjectIds)
    		}

    		Query.include("_User")
    		Query.descending("createdAt")
    		Query.limit(5);
    		Query.find({
    			success : function (data) {
    					if(data !=null && data != 'undefined')
              {
    						for(var i=0;i<data.length;i++)
    						{
                  var SinglePost = data[i];
                  SinglePost.Image1Title = SinglePost.get("Image1Title")
                  SinglePost.Image2Title = SinglePost.get("Image2Title")
    							var user = data[i].get('By')
    							user.fetch({
    								success:function(myObject) {
    									SinglePost.set('By',myObject)
                							  deferred.notify(Posts)
    								}
    							});
                  var createdAt = SinglePost.get('createdAt')
                  var timeStamp = Time.GetTimeStamp(createdAt)
                  SinglePost.set('TimeStamp',timeStamp);
                  SinglePost.set("Votes1",SinglePost.get('Punchers1').length)
                  SinglePost.set("Votes2",SinglePost.get('Punchers2').length)
                  if(SinglePost.get('Votes1') > 0 || SinglePost.get('Votes2') > 0)
                  {
                    if(SinglePost.get('Punchers1').indexOf(Parse.User.current().id) > -1)
                    {
                    SinglePost.set('isVoted1',"block")
                    SinglePost.set('isVoted2',"none")
                    //alert(SinglePost.Image1Title + SinglePost.Image2Title + " = isVoted1 = " + SinglePost.get('isVoted1') + " isVoted2 = " + SinglePost.get('isVoted2'));
                    }

                  else if(SinglePost.get('Punchers2').indexOf(Parse.User.current().id) > -1)
                    {
                      SinglePost.set('isVoted1',"none")
                      SinglePost.set('isVoted2',"block")
                    //alert(SinglePost.Image1Title + SinglePost.Image2Title + " = isVoted1 = " + SinglePost.get('isVoted1') + " isVoted2 = " + SinglePost.get('isVoted2'));
                    }
                    else {
                      SinglePost.set('isVoted1',"none")
                      SinglePost.set('isVoted2',"none")
                    }
                  }
                  else {
                    SinglePost.set('isVoted1',"none")
                    SinglePost.set('isVoted2',"none")
                  }
                  Posts.push(SinglePost)
    						}
                deferred.resolve(Posts);
    					}
    					else
              {
					       deferred.reject("No data found")
    					}
    			},
    			error : function (error) {
    				deferred.reject("Error occured : " + error)
    			}
    		})

        }
      });
      return deferred.promise;
    },
    GetSinglePost : function(objectId)
    {
     var deferred = $q.defer();
     Parse.initialize("Y4Txek5e5lKnGzkArbcNMVKqMHyaTk3XR6COOpg4", "fR1P17QhE9b7PKOa1wXozi0yo8IAlYLSIzqYh4EU");
       var posts = Parse.Object.extend("Posts")
       var Query = new  Parse.Query(posts)
       Query.equalTo("objectId",objectId)
       Query.include("_User")
       Query.descending("createdAt")
       Query.limit(5);
       Query.find({
         success : function (data) {
             if(data !=null && data != 'undefined')
             {
               for(var i=0;i<data.length;i++)
               {
                 var SinglePost = data[i];
                 SinglePost.Image1Title = SinglePost.get("Image1Title")
                 SinglePost.Image2Title = SinglePost.get("Image2Title")
                 var user = SinglePost.get('By')
                 user.fetch({
                   success:function(myObject) {
                     var createdAt = SinglePost.get('createdAt')
                     var timeStamp = Time.GetTimeStamp(createdAt)
                     SinglePost.set('TimeStamp',timeStamp);
                     SinglePost.set("Votes1",SinglePost.get('Punchers1').length)
                     SinglePost.set("Votes2",SinglePost.get('Punchers2').length)
                     deferred.resolve(SinglePost);
                   }
                 });

               }

             }
             else
             {
                deferred.reject("No data found")
             }
         },
         error : function (error) {
           deferred.reject("Error occured : " + error)
         }
       })
     return deferred.promise;
   }

  }
}])


app.factory('Time', function(){
  return {
    GetTimeStamp : function(createdAt)
    {
      var currentDate = new Date()
      var Time;
      if(Math.abs(currentDate.getMonth() - createdAt.getMonth()) == 0)
      {
        if(Math.abs(currentDate.getDay() - createdAt.getDay()) > 7)
        {
          Time = String(parseInt(Math.abs(currentDate.getDay() - createdAt.getDay())) / 7 ) + "W"
        }
        else if (Math.abs(currentDate.getDay() - createdAt.getDay()) > 0)
        {
          Time = String(Math.abs(currentDate.getDay() - createdAt.getDay())) + "d"
        }
        else if (Math.abs(currentDate.getHours() - createdAt.getHours()) > 0){
          Time = String(Math.abs(currentDate.getHours() - createdAt.getHours())) + "h"
        }
        else {
        {
              Time = String(Math.abs(currentDate.getMinutes() - createdAt.getMinutes())) + 'm'
        }
        }
      }
      else {
        Time = String(Math.abs(currentDate.getMonth() - createdAt.getMonth())) + 'M'
      }
      return Time;
    }
  }
})

app.factory('Model',function(){
  var Value;
  return {
    Value : Value
  }
})

app.factory('Data',function(){
  var Value;
  return {
    Value : Value
  }
})

app.factory('Search',['$q','Time',function($q,Time){
      var SearchAccordingToKeyWord = function(KeyWord){
      var deferred = $q.defer();
      var SearchResults = [];
      KeyWord = KeyWord.replace('#','').trim()
      //console.log(KeyWord);
      if(KeyWord != null && KeyWord != 'undefined')
      {
        var SearchInImage1Title = new Parse.Query("Posts")
        SearchInImage1Title.startsWith("Image1Title",KeyWord)
        var SearchInImage2Title = new Parse.Query("Posts")
        SearchInImage2Title.startsWith("Image2Title",KeyWord)
        var FinalQuery = Parse.Query.or(SearchInImage1Title,SearchInImage2Title);
        FinalQuery.find({
          success:function(Posts){
            if(Posts.length > 0)
            {
              for(var i=0;i<Posts.length;i++)
              {
                var SinglePost = Posts[i];
                SinglePost.Image1Title = SinglePost.get("Image1Title")
                SinglePost.Image2Title = SinglePost.get("Image2Title")
                var user = SinglePost.get('By')
                user.fetch({
                  success:function(myObject) {
                  }
                });
                var createdAt = SinglePost.get('createdAt')
                var timeStamp = Time.GetTimeStamp(createdAt)
                SinglePost.set('TimeStamp',timeStamp);
                console.log(SinglePost.get('Punchers1'))
                SinglePost.set("Votes1",SinglePost.get('Punchers1').length)
                SinglePost.set("Votes2",SinglePost.get('Punchers2').length)
                if(SinglePost.get('Votes1') > 0 || SinglePost.get('Votes2') > 0)
                  {
                    if(SinglePost.get('Punchers1').indexOf(Parse.User.current().id) > -1)
                    {
                    SinglePost.set('isVoted1',"block")
                    SinglePost.set('isVoted2',"none")
                    }

                  else if(SinglePost.get('Punchers2').indexOf(Parse.User.current().id) > -1)
                    {
                      SinglePost.set('isVoted1',"none")
                      SinglePost.set('isVoted2',"block")
                    //alert(SinglePost.Image1Title + SinglePost.Image2Title + " = isVoted1 = " + SinglePost.get('isVoted1') + " isVoted2 = " + SinglePost.get('isVoted2'));
                    }
                    else {
                      SinglePost.set('isVoted1',"none")
                      SinglePost.set('isVoted2',"none")
                    }
                  }
                  else {
                    SinglePost.set('isVoted1',"none")
                    SinglePost.set('isVoted2',"none")
                  }
                SearchResults.push(SinglePost)
              }
              deferred.resolve(SearchResults)
            }
            else {
              deferred.reject("No Posts Found")
            }
          },
          error:function(error){
            deferred.reject("OOps it failed")
          }
        })
      }
      return deferred.promise;
    };
    return{
      SearchAccordingToKeyWord : SearchAccordingToKeyWord
    }
}])

app.factory('FetchInterests',['$http','$q',function($http,$q){
  return{
    Fetch : function(){
      //console.log("Hear")
      var Query = new Parse.Query("Intrestlist");
      var deferred = $q.defer()
    	$http.get('/GetUserInterests').then(function(response) {
      Query.find({
        success: function(Intersts)
        {
          var data = new Array();
          for(var i=0;i<Intersts.length;i++)
          {
            //response.data.result
            mydata = {id:Intersts[i].id,Text:Intersts[i].get("IntrestText"),has:false}
            for(var j=0;j<response.data.result.length;j++)
            {
                          if(response.data.result[j] == Intersts[i].get("IntrestText"))
                          {
                              mydata.has = true;
                              mydata.leverColor = "#ff4545"
                              break;
                          }
                          else
                          {
                            mydata.has = false
                            mydata.leverColor = ""
                          }
              }
            data.push(mydata)
          }
          deferred.resolve(data)
        },
        error : function(error)
        {
          deferred.resolve(error)
        }
      })
    })
      return deferred.promise;
    }
  }
}])

app.factory('GetFacebookFriends',['$http','$q',function($http,$q){
  return{
    GetFriends : function(){
      var deferred = $q.defer()
      try
      {
      var access_token = Parse.User.current().get('authData')['facebook']["access_token"]
      }
      catch(err)
      {
      	
      }
      if(access_token != null)
      {
      $http.get('https://graph.facebook.com/me/friends?access_token=' + access_token).then(function(response){
        var data = response.data.data
        var namesArray = []
        var Friends = []
        for(var x=0;x<data.length;x++)
        {
          namesArray.push(data[x].name)
        }
        Parse.Cloud.run("GetFriendsDetail", {name:namesArray},{
      		success : function(FriendObjects)
      		{
            var Data = []
            var Query = new Parse.Query("FollowList")
            Query.equalTo("Follower",Parse.User.current())
            Query.find({success:function(Objects){
              var objectIds = []
              for(var j=0;j<Objects.length;j++)
              {
                objectIds.push(Objects[j].get("Following").id)
              }
              for(var i=0;i<FriendObjects.length;i++)
              {
                var singleFriend = FriendObjects[i];

                if(objectIds.indexOf(singleFriend.id) > -1)
                {
                  var mydict = {Name:singleFriend.get("Name"),objectId:singleFriend.id,Picture:singleFriend.get("ProfilePicture").url(),isFollowing:true}
                  Data.push(mydict)
                }
                else {
                  var mydict = {Name:singleFriend.get("Name"),objectId:singleFriend.id,Picture:singleFriend.get("ProfilePicture").url(),isFollowing:false}
                  Data.push(mydict)
                }
              }
              deferred.resolve(Data)
            },error:function(Error){
            console.log(Error);
            }
          })

      		},
      		error : function(error)
      		{
      			console.log("error" + error);
      		}
      	})
      })
      }
      return deferred.promise
    }
  }
}])
// $http.get('/GetUserInterests').then(function(response) {
app.factory('GetFriendsFromInterests',['$http','$q',function($http,$q){
  return{
    GetFriends : function(){
      var deferred = $q.defer()
      var Data = []

      //console.log("hear");
      $http.get('/GetUserInterests').then(function(response) {
        var Interests = response.data.result
        // Interests = Interests.split(',')
        var whomIamFollowing = []
        var Query = new Parse.Query('UserIntrest');
        Query.containedIn('IntrestText',Interests)
        Query.find({
          success:function(Objects){
            var FobjectIds = []
            var Query = new Parse.Query("FollowList")
            Query.equalTo("Follower",Parse.User.current())
            Query.find({success:function(Objects){
              var objectIds = []
              for(var j=0;j<Objects.length;j++)
              {
                  whomIamFollowing.push(Objects[j].get('Following').id)
              }
              },
              error : function(error){console.log(error);deferred.reject(error)}
              });
                for(var o in Objects)
                {
                var user = Objects[o].get("User")
                var singleFriend = Objects[o]
                if(user.id != Parse.User.current().id)
                {
                user.fetch().then(function(user){
                      if(user.id == whomIamFollowing.id)
                      {
                        var mydict = {Name:user.get("Name"),objectId:user.id,Picture:user.get("ProfilePicture").url(),isFollowing:true,symbol:"remove"}
                        Data.push(mydict)
                      }
                      else
                      {
                        var mydict = {Name:user.get("Name"),objectId:user.id,Picture:user.get("ProfilePicture").url(),isFollowing:false,symbol:"add"}
                        Data.push(mydict)
                      }
                      Data = _.map(_.groupBy(Data,function(doc){
                        return doc.objectId;
                      }),function(grouped){
                        return grouped[0];
                      });


                      // console.log(Data);
                      deferred.notify(Data)
                      })
              }
               }
            }
    })
  })
  return deferred.promise;
}
}
}])
