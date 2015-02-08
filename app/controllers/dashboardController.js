jasper.controller('dashboardController',['$scope', '$state', '$http', '$timeout', function($scope, $state, $http, $timeout) {
	$scope.stats = {'working' : 0, 'repair' : 0};
	$scope.repairs = [];

	$http({
	    method  : 'GET',
	    url     : '/builds/list'
	 })
	.success(function(resp) {
	    var builds = angular.fromJson(resp);

	    for (var osType in builds) {
	    	for (var i = 0; i < builds[osType].length; i++) {
	    		if (builds[osType][i].imageStatus == "Working") {
	    			$scope.stats.working++;
	    		} else if (builds[osType][i].imageStatus != "New") {
	    			$scope.stats.repair++;
	    			$scope.repairs.push(builds[osType][i]);
	    		}
	    	}
	    }
	});
}]);