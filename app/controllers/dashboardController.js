jasper.controller('dashboardController',['$scope', '$state', '$http', '$timeout', function($scope, $state, $http, $timeout) {
	$scope.stats = {'working' : 0, 'repair' : 0, 'issues' : 0};
	$scope.repairs = [];
	$scope.issues = [];

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

	$http({
	    method  : 'GET',
	    url     : '/issues/list'
	 })
	.success(function(resp) {
	    var allIssues = angular.fromJson(resp);

	    for (var i = 0; i < allIssues.length; i++) {
	    	if (allIssues[i].status == "Open" || allIssues[i].status == "Resolving") {
	    		$scope.stats.issues++;
	    		$scope.issues.push(allIssues[i]);
	    	}
	    }
	});
}]);