var app = angular.module('app',['app.controllers','app.factory'])

app.controller("MainController",function($scope){

});

app.controller("FriendsController",['$scope','GetFacebookFriends','GetFriendsFromInterests',function($scope,GetFacebookFriends,GetFriendsFromInterests){
  var promise = GetFacebookFriends.GetFriends()
  promise.then(function(Data){
    for(var i=0;i<Data.length;i++)
    {
      if(Data[i].isFollowing)
      {
        Data[i].symbol = "remove"
      }
      else {
        Data[i].symbol = "add"
         }
    }
    $scope.FacebookFriends = Data
  })
  var promise2 = GetFriendsFromInterests.GetFriends()
  promise2.then(function(Data){
    // console.log(Data);
    $scope.intrestBasedFriends = Data
  },function(error){
      console.log(error);
  },function(update){
    console.log(update);
    $scope.intrestBasedFriends = update
  })

  $scope.FollowUnfollowAction = function(d)
  {
    console.log(d);

    var FollowType = Parse.Object.extend("FollowList")
    var FollowObject = new FollowType();
    FollowObject.set("Follower",Parse.User.current())
    User = new Parse.User();
		User.id = d.objectId
    FollowObject.set("Following",User)
    FollowObject.set("FollowingName",d.Name)
    if(!d.isFollowing)
    {
      FollowObject.save({success : function(Object) {
        $scope.objectIdOfFollowObject = Object.id
      }})
      d.isFollowing = true
      d.symbol = "remove"
    }
    else {
      FollowObject = new FollowType();
      var Query = new Parse.Query(FollowType);
      Query.equalTo("Following",User)
      Query.find({
        success:function(Objects) {
          for(var i=0;i<Objects.length;i++)
          {
            if(Objects[i].get("Follower").id == Parse.User.current().id)
            {
              Objects[i].destroy()
            }
          }
        }
      })
      d.isFollowing = false
      d.symbol = "add"
    }

  }
}])

app.controller("InterestsController",['$scope','FetchInterests',function($scope,FetchInterests) {
  var promise = FetchInterests.Fetch()
  promise.then(function(Data){
      $scope.Data = Data
  });
  $scope.change = function(d){
    var InterestProto = Parse.Object.extend("UserIntrest")

    if(!d.has)
    {
      $scope.leverColor = "red"
      var InterestObject = new InterestProto();
      InterestObject.set("User",Parse.User.current())
      var InterestList = Parse.Object.extend("Intrestlist")
      var InterestListObject = new InterestList();
      InterestListObject.id = d.id;
      InterestObject.set("HisInterest",InterestListObject);
      InterestObject.set("IntrestText",d.Text)
      d.has = true
      d.leverColor = "red"
      InterestObject.save({
        success:function(Object){console.log("Added");},
        error:function(){console.log("Error occured");}
      })
    }
    else {
      d.has = false
      var Query = new Parse.Query(InterestProto)
      d.leverColor = ""
      Query.equalTo("User",Parse.User.current())
      Query.find({
        success:function(response){
        for(var i=0;i<response.length;i++)
        {
          var SingleObject = response[i];
          if(SingleObject.get("IntrestText") == d.Text)
          {
            SingleObject.destroy({
              error : function(error){console.log(error);}
            })
            break;
          }
        }
      },
      error : function(error)
      {
        console.log(error);
      }
    })
    }
  };
  }]);

app.controller("EditProfileController",function($scope){
  var user = Parse.User.current()
  $scope.Email = user.get("email");
  $scope.Ninja_name = user.get("Ninja_name");
  $scope.Name = user.get("Name")
  alert(user.get('ProfilePicture').url())
  $scope.image = user.get('ProfilePicture').url()
  $scope.update = function(){
    var fileUploadControl = document.getElementsByName('profilePic')[0];
    console.log(fileUploadControl.files.length)
    if (fileUploadControl.files.length > 0) {
        var file = fileUploadControl.files[0];
        alert(JSON.stringify(file))
        var name = "profilePic.png";
        var parseFile = new Parse.File(name, file);
        parseFile.save().then(function(){
          user.set("ProfilePicture",parseFile);
          user.set("email",$scope.Email)
          user.set("Ninja_name",$scope.Ninja_name)
          user.set("Name",$scope.Name)
          user.save({
            success: function(user){
              Materialize.toast('Your Profile was successfully updated', 3000);
              location.reload()
              },
            error : function(error){
              Materialize.toast(error, 2000);
            }
          });

        },function(){})
    }
    else {
      Materialize.toast('Please choose your Profile Picture', 2000);
    }
  }
})

app.controller("ChangePassword",function($scope){
  $scope.update = function(){
    var user = Parse.User.current()
    if($scope.Pass_con == $scope.Pass_main)
    {
      user.set("password",$scope.Pass_main)
      user.save({
        success : function(user){
                Materialize.toast('Password updated', 3000);
        }
      })
    }
  }
})
