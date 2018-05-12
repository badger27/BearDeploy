'use strict';
angular.module('poolBear.chat', [

    "firebase",
    "ngAnimate",
    "ui.router"
    
   
])
.config(function ($stateProvider) {

    $stateProvider
        .state('app.welcome', {
            url: '/welcome',
            data: { title: 'Chat' },
            views: {
                'main': {
                    templateUrl: 'views/welcome.html',
                    controller: "WelcomeController"
                }
            }

        })
      .state('app.chat', {
          url: '/chat',
          data: { title: 'Chat' },
          views: {
              'main': {
                  controller: 'ChatController',
                  templateUrl: 'components/chat/template/chat.html'
              }
          }

      })
    
}).controller('ChatController', [
    '$scope', 'UserFactory', '$location', '$firebaseArray', '$timeout',
    function($scope, UserFactory, $location, $firebaseArray, $timeout){
        var userInfo = UserFactory.get();

        if(!userInfo || !userInfo.nick)
            return $location.path('/');

        $scope.user = userInfo;

        var ref = firebase.database().ref().child('messages');

        var messages = $firebaseArray(ref);
        $scope.messages = messages;

        $scope.sendMessage = function(){
            if(!$scope.newmessage || !$scope.newmessage.value)
                return alert("Digite uma mensagem");

            var newMessage = {
                value: $scope.newmessage.value,
                date: new Date().getTime(),
                user: userInfo
            };

            messages.$add(newMessage);
            $scope.newmessage.value = "";
        }

        ref.on('value', function(messagesSnap){
            $timeout(function() {
                var scroller = document.getElementsByClassName("messages")[0];
                scroller.scrollTop = scroller.scrollHeight;
            }, 0, false);
        });
    }
]).factory('UserFactory', function(){
    var user;

    return {
        get: function(){
            return user;
        },
        set: function(newUser){
            user = newUser;
        }
    };
}).controller("WelcomeController", [
    '$scope', 'UserFactory', '$location',
    function($scope, UserFactory, $location){
        $scope.userLogin = function(){
            var nickUser = $scope.user.nick;

            UserFactory.set({
                nick: nickUser
            });

            return $location.path('/chat');
        }
    }
]);
      

