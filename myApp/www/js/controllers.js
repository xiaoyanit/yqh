angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $log, $rootScope, $ionicModal, $ionicLoading, $timeout, cache, ajax, dataService) {
    $scope._string= 'AppCtrl';
    $scope.dataService= dataService;
  //取消侦听
  $rootScope.$off = function (name, listener) {
            var namedListeners = this.$$listeners[name];
            if (namedListeners) {
                // Loop through the array of named listeners and remove them from the array.
                for (var i = 0; i < namedListeners.length; i++) {
                    if (namedListeners[i] === listener) {
                        return namedListeners.splice(i, 1);
                    }
                }
            }
  }
  // 数据同步
  $rootScope.ajax= function(){
    var _string= 'rootScope>ajax'
    var key= null,         //资源key       
        callback= null,    //索取变量字符
        isMonitor= false   //是否加入到侦听队列
    //console.log(arguments[1], arguments.callee, this);
    if(arguments.length>0 && typeof arguments[0] == 'string' && typeof arguments[1] == 'string'){
      key= arguments[0];
      callback= arguments[1];
      isMonitor= arguments[2] || false;
    }else if( typeof arguments[0] == 'object' && typeof arguments[0]['key'] == 'string'){
      key= arguments[0]['key'];
    }else{
       $log.log(this._string+'>'+_string+ ': this pramem no found!');
    }
    if(key){
      var self= this;
      self.$on(key,function(event, msg){
        $ionicLoading.hide();
        self[callback]= msg;
        if(!isMonitor){
        self.$off(key, arguments.callee);
        }
        console.log('msg',msg,self.$$listeners[key]);
      });
       $ionicLoading.show({
          template: 'Loading...'
       });
      ajax.get(key);
    }
  };
  //用户相关
  $rootScope.user= function(){

  }


  $scope.df= null;
  $scope.loginData = {};
  /*$scope.$watch('df', function(newValue, oldValue) {
    console.log('66666666-df: ',newValue, oldValue)
  },true);*/
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };
    $rootScope.tt= '554456464------------';

  // Open the login modal
  $scope.login = function() {
    var t= dataService.req('mbanner') 
    console.log(t);
      t.then(function (data) {  
        // Successful  
        $scope.df = data;  
      },   
      function () {  
        // failure  
        $scope._string = "failure";  
      },function(info){
        console.log(info);
      }); 
    

    $scope.modal.show();
     


    //ajax.get('mbanner');
   //$scope.ajax('mbanner', 'df');
   // console.log('453',$rootScope);
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();

    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
  { title: 'Reggae', id: 1 },
  { title: 'Chill', id: 2 },
  { title: 'Dubstep', id: 3 },
  { title: 'Indie', id: 4 },
  { title: 'Rap', id: 5 },
  { title: 'Cowbell', id: 6 },
  { title: 'Cowbell2', id: 7 }
  ];
  console.log('4455',$scope.tt);
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
    $scope._string= 'PlaylistCtrl';
    $scope.dd= '4434534543';
    $scope.ajax('mbanner',  'dd');

})

.controller('IndexCtrl', function($scope, $http, $stateParams, $ionicBackdrop, $timeout, user, $$jqLite, dataService) {
    $scope._string= 'PlaylistCtrl';
    /*$scope.items = [1,2,3];
    console.log($scope, $$jqLite());
    user.refresh($scope);
  $scope.doRefresh = function() {
    $http.get('/new-items')
     .success(function(newItems) {
       $scope.items = newItems;
     })
     .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
  };*/
//$scope.items = [1,2,3];
    var t= dataService.req('mbanner') 
    console.log(t);
      t.then(function (data) {  
        // Successful  
        $scope._string = data;  
      },   
      function () {  
        // failure  
        $scope._string = "failure";  
      }); 
   
});
