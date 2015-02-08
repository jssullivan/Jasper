jasper.controller('dashboardController',['$scope', '$state', '$http', '$timeout', function($scope, $state, $http, $timeout) {
	$http({
	    method  : 'GET',
	    url     : '/builds/list'
	 })
	.success(function(resp) {
	    $scope.builds = angular.fromJson(resp);
	});
}]);