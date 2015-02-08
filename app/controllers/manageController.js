jasper.controller('manageController',['$scope', '$state', '$http', function($scope, $state, $http) {
	var userInfo = null;
	$scope.name = "";
	$scope.imageStats = {};

	resize();

	$state.go("manage.dashboard");

	$http({
	 	method  : 'GET',
		url     : '/userInfo'
	 })
	.success(function(resp) {
		userInfo = angular.fromJson(resp);
		
		$scope.name = userInfo.name;
	});
}]);