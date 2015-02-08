jasper.controller('buildsController',['$scope', '$http', function($scope, $http) {
    $scope.addBuildModel = false;

    $scope.addBuildShow = function() {
        $scope.addBuildModel = true;
    };

    $scope.addBuildCancel = function() {
        $scope.addBuildModel = false;
    };

    $scope.addBuildSave = function() {
        $scope.addBuildModel = false;
    };
}]);

//Requires a data attribute, data-model-state to work (init w/ false)
jasper.directive('showModel', function() {
    return {
        link: function(scope, element, attr) {
        	scope.$watch(attr.showModel, 

        	function (shouldShow) {
        	    if (shouldShow) {
        	    	$(element[0]).modal('show');
        	    } else if (!shouldShow) {
        	       	$(element[0]).modal('hide');
        	    }
        	}, true);
        }
    };
});

//Date picker directive
jasper.directive('datePicker', function() {
    return {
        link: function(scope, element, attr) {
            
        }
    };
});