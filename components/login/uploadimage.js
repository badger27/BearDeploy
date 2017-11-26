'use strict';
angular.module('poolBear.Images', [ 'ngFileUpload'

]) .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('app.images', {
            url: '/images',

            views: {
                'main': {
                    templateUrl: 'components/login/images.html'}
            }
        })

    }).controller('imagesController', ['$scope','$rootScope', '$state' ,    '$location', '$firebaseAuth', '$firebaseObject', "$firebaseArray", 'FIREBASE_URL', 'fileUpload', 'Upload', '$timeout', '$window',
        function(  $scope,$rootScope,$state,     $location, $firebaseAuth, $firebaseObject, $firebaseArray, FIREBASE_URL ,fileUpload, Upload, $timeout , $window) {


            console.log("IMAGE CONTROLLER FIRED ");

            var vm = this;
            var ref = new Firebase(FIREBASE_URL);
            var auth = $firebaseAuth(ref);


            auth.$onAuth(function (authUser) {
                if (authUser) {

                    var PlayerRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid);
                    var bearRef = new Firebase(FIREBASE_URL + 'bears/');

                    var userID =  authUser.uid ;

                    PlayerRef.once('value', function(snapshot) {
                        var user = snapshot.val();
                        console.log("user" , user);
                        if( user.userimage ==="userImage" ) {$location.path('/success');}
                    });


                    vm.submitImage = function () { //function to call on form submit
                        if (vm.upload_form.file.$valid && vm.file) { //check if from is valid

                            vm.upload(vm.file); //call upload function
                        }
                    }


                    vm.upload = function (file) {
                        console.log("file1", file);
                        file = Upload.rename(file,  userID + ".jpg");
                        console.log("file2", file);
                        Upload.upload({
                            url: 'http://localhost:3000/upload/', //webAPI exposed to upload the file
                            data: {file: file} //pass file as data, should be user ng-model
                        }).then(function (resp) { //upload function returns a promise
                            if (resp.data.error_code === 0) { //validate success
                                $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');


                                PlayerRef.once('value', function(snapshot) {
                                    var user = snapshot.val();
                                    console.log("user" , user);
                                    snapshot.ref().update({userimage: "https://micrositeifdstorage.blob.core.windows.net/users/" + userID + ".jpg"});
                                    $location.path('/success');
                                });


                            } else {
                                $window.alert('an error occured');
                            }
                        }, function (resp) { //catch error
                            console.log('Error status: ' + resp.status);
                            $window.alert('Error status: ' + resp.status);
                        }, function (evt) {
                            console.log(evt);
                            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                            vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress


                        });
                    };

                } // User Authenticated
            }); // on Auth


        }//controller

]);
         

