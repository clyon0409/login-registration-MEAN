
    //var appModule = angular.module('myApp',[]);

    //  inject the ngRoute dependency in the module.
    var appModule = angular.module('myApp', ['ngRoute']);
    //  use the config method to set up routing:
    appModule.config(function ($routeProvider) {
      $routeProvider
        .when('/',{
            templateUrl: 'partials/login.html'
        })
        .when('/register',{
            templateUrl: 'partials/register.html'
        })
        .otherwise({
          redirectTo: '/'
        });
    });

    // add a factory to the module
    appModule.factory('userFactory', function ($http){
        // a factory is nothing more than a function that returns an object literal!
        var appointments = [];
        var user;
        var factory = {};
        // add a getstudents method to the object we defined
        factory.show = function (callback){
          //user = prompt("Please enter your full name", user);
          console.log('saving user name ' + user);
          $http.get('/appointments').success(function(output) {
              appointments = output;
              console.log(appointments);

              callback(appointments);
          }) 
        }

        factory.getUser = function(callback){
            callback(user);
        }

        factory.add = function (data){
          console.log(data);
          data
          if (data.complain.length < 11){
            alert('Complain field must be at least 10 characters long');
          }else{
            var appt_data = ({patient_name: user, date:data.date, time: data.time, complain:data.complain });
            $http.post('/add', appt_data).success(function(output){
              if(output.error){
                alert ('doctor is fully booked that day, please pick another day');
              }else{
                alert('you successfully added an appointment');
                console.log('you successfully added an appointment');
                console.log(output);
                appointments.push(output);
              }
            });
          }
        }

        factory.edit = function(customer, callback){
          var new_name = prompt("Please enter the new name");
          var data = ({id: customer._id, name: new_name});
          $http.post('/customers/edit', data).success(function(output) {
              console.log('successfully updated customer name');
              console.log(output);
              console.log(customers.indexOf(customer));
              customers[customers.indexOf(customer)].name = new_name;
              callback(customers);
          })
        }

        factory.delete = function (appt, callback){
          $http.get('/delete/'+appt._id).success(function(output) {
              console.log(output);
              appointments.splice(appointments.indexOf(appt),1);
              console.log(appointments);
              callback(appointments);
          })
        }

      factory.login = function(user, callback){
        console.log('user factory: got into login function. user=');
        console.log(user);
        var data = ({email: user.email, password: user.password});
        $http.post('/login', data).success(function(output) {
              console.log('userFactory: output=');
              console.log(output);
              user = output;
              callback(user);
          }) 
      }

      factory.getOrders = function (callback){
             $http.get('/orders').success(function(output) {
              orders = output;
              callback(orders);
          }) 
      }

      factory.register = function(user, callback){
        console.log('user factory: got into register function. user=');
        console.log(user);
        $http.post('/register', user).success(function(output) {
              console.log('userFactory: output=');
              console.log(output);
              if (output.duplicate){
                var data = {errors: {type:{message: output.duplicate}}};
                callback(data);
              }
              else
                callback(output);
          }) 
      }

      // most important step: return the object so it can be used by the rest of our angular code
       return factory
    });

    //the .controller() method adds a controller to the module
    appModule.controller('loginController', function($scope, userFactory){
      $scope.user;

      //appointmentFactory.getUser(function(user){
      //        $scope.user = user;
      //})

      $scope.login = function(){
        console.log('login controller: got it login function');
        userFactory.login($scope.user, function(retData){
          console.log('login controller:able to login in user, user=');
          console.log(retData);
        });
      }
    });

    appModule.controller('registerController', function($scope, userFactory){
      $scope.user;
      $scope.errors=[];
      var error_flag;

      //appointmentFactory.getUser(function(user){
      //        $scope.user = user;
      //})

      $scope.register = function(){
        console.log('register controller: got it register function');

        if ($scope.user.password === $scope.user.confirm_password){
          userFactory.register($scope.user, function(retObj){
              if (retObj.errors){
                $scope.errors = retObj.errors;
                console.log('register controller: registration error, errors=');
                console.log($scope.errors);
                error_flag = true;
              }else{
                console.log('register controller:able to register user, user=');
                console.log(retObj);
                error_flag = false;
              }
          });
        }else{
          alert('Password confirmation does not match password');
        }
      }

      $scope.error =function(){
        return error_flag;
      }
    });

   