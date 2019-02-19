angular.module('timing', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){
	$scope.currentTemperature = {temperature: "-", timestamp: "-"};
	$scope.profile = {location: "-", name: "-", threshold: "-", number: "-"};
    $scope.temperatures = [];
	$scope.threadsholds = [];
    $scope.eci = "9tN6xgMjnmXobbuTykrYub";

    var bURL = 'http://localhost:8080/sky/event/'+$scope.eci+'/5/sensor/profile_updated';
    $scope.submitProfile = function() {
      var pURL = bURL + "?location=" + $scope.location + "&name=" + $scope.name + "&threshold=" + $scope.threshold + "&number=" + $scope.number;
      return $http.post(pURL).then(function(data){
        $scope.getProfile();
        $scope.location='';
        $scope.name='';
        $scope.threshold='';
        $scope.number='';
      });
    };
	
	var pURL = 'http://localhost:8080/sky/cloud/'+$scope.eci+'/io.picolabs.sensor_profile/retrieveData';
	$scope.getProfile = function() {
			return $http.get(pURL).then(function(data){
			angular.copy(data.data, $scope.profile);
		});
	};

    var gURL = 'http://localhost:8080/sky/cloud/'+$scope.eci+'/io.picolabs.temperature_store/temperatures';
    $scope.getTemperatures = function() {
      return $http.get(gURL).then(function(data){
        angular.copy(data.data, $scope.temperatures);
        angular.copy(data.data[data.data.length - 1], $scope.currentTemperature);
      });
    };
	
	var eURL = 'http://localhost:8080/sky/cloud/'+$scope.eci+'/io.picolabs.temperature_store/temperatures_threshold';
    $scope.getThreadshold = function() {
      return $http.get(eURL).then(function(data){
        angular.copy(data.data, $scope.threadsholds);
      });
    };

  }
]);