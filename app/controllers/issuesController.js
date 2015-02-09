jasper.controller('issuesController',['$scope', '$state', '$http', '$timeout', function($scope, $state, $http, $timeout) {
	$scope.newIssueModel = false;
	$scope.editIssueModel = false; 
	$scope.assignees = [];
	$scope.newIssue = {'assignTo' : '', 'description' : '', 'title' : '', 'priority' : '', 'id' : '', 'status' : ''};
	$scope.editIssue = {'assignTo' : '', 'description' : '', 'title' : '', 'priority' : '', 'id' : '', 'status' : ''};
	$scope.priorities = ['Trivial', 'Minor', 'Major', 'Critical'];
	$scope.statuses = ['Open', 'Resolving', 'Resolved', 'Closed'];
	$scope.issuesOpen = null;
	$scope.issuesClosed = null;

	$http({
	    method  : 'GET',
	    url     : '/issues/assignees'
	 })
	.success(function(resp) {
	    $scope.assignees = angular.fromJson(resp);
	});


	$scope.getIssues = function() {
		$http({
		    method  : 'GET',
		    url     : '/issues/list'
		 })
		.success(function(resp) {
		   	var allIssues = angular.fromJson(resp);
		   	$scope.issuesOpen = null;
			$scope.issuesClosed = null;

		   for (var i = 0; i < allIssues.length; i++) {
		   		if (allIssues[i].status == "Open" || allIssues[i].status == "Resolving") {
		   			if ($scope.issuesOpen == null) {
		   				$scope.issuesOpen = [];
		   			}

		   			$scope.issuesOpen.push(allIssues[i]);
		   		} else {
		   			if ($scope.issuesClosed == null) {
		   				$scope.issuesClosed = [];
		   			}

		   			$scope.issuesClosed.push(allIssues[i]);
		   		}
		   }
		});
	};

	$scope.getIssues();

	$scope.newIssueShow = function() {
        $scope.newIssue = {'assignTo' : $scope.assignees[0], 'status' : $scope.statuses[0], 'description' : '', 'title' : '', 'priority' : $scope.priorities[0], 'id' : ''};
        $scope.newIssueModel = true;
    };

    $scope.newIssueCancel = function() {
        $scope.newIssueModel = false;
    };

    $scope.newIssueSave = function() {
        $scope.newIssueModel = false;

        $http({
            method  : 'POST',
            url     : '/issues/save',
            data    : $.param($scope.newIssue),
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .success(function(resp) {
            if (angular.fromJson(resp).status == "success") {
                $scope.getIssues();
            } else {
                console.warn("Failed to confirm save!");
            }
        });
    };

    $scope.editIssueShow = function(issue) {
        $scope.editIssue = issue;
        $scope.editIssue.id = $scope.editIssue._id;
        delete $scope.editIssue._id;

        $scope.editIssueModel = true;
    };

    $scope.editIssueCancel = function() {
        $scope.editIssueModel = false;
    };

    $scope.editIssueSave = function() {
        $scope.editIssueModel = false;

        $http({
            method  : 'POST',
            url     : '/issues/save',
            data    : $.param($scope.editIssue),
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .success(function(resp) {
            if (angular.fromJson(resp).status == "success") {
                $scope.getIssues();
            } else {
                console.warn("Failed to confirm save!");
            }
        });
    };

    $scope.editIssueDelete = function() {
    	$http({
            method  : 'POST',
            url     : '/issues/delete',
            data    : $.param({'id' : $scope.editIssue.id}),
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .success(function(resp) {
            if (angular.fromJson(resp).status == "success") {
                 $scope.editIssueModel = false;
                 $scope.getIssues();
            } else {
                console.warn("Failed to confirm removal!");
            }
        });
    };
}]);