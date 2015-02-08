jasper.controller('buildsController',['$scope', '$http', function($scope, $http) {
    $scope.addBuildModel = false;
    $scope.editBuildModel = false;
    $scope.addRevisionModel = false;

    $scope.os = ['Windows 7 Starter', 'Windows 7 Home Basic', 'Windows 7 Home Premium', 'Windows 7 Professional', 'Windows 7 Enterprise', 'Windows 7 Ultimate', 'Windows 7 N', 
                 'Windows 8 Core', 'Windows 8 Pro', 'Windows 8 Enterprise', 'Windows 8.1 Core', 'Windows 8.1 Pro', 'Windows 8.1 Enterprise', 'Windows 8.1 N', 'Windows 10 Technical Preview',
                 'Generic Linux', 'Ubuntu Linux', 'Mint Linux', 'Arch Linux'];
    $scope.lics = ['Retail', 'MCA', 'Dreamspark'];
    $scope.sys = ['Both', 'Legacy', 'EFI'];
    $scope.statuses = ['New', 'Needs Testing', 'Needs Repair', 'Broken', 'Working'];

    $scope.newBuild = {'date' : '', 'name' : '', 'os' : $scope.os[0], 'license' : $scope.lics[0], 'type' : $scope.sys[0], 'imageStatus' : 'New'};
    $scope.editBuild = {'date' : '', 'name' : '', 'os' : $scope.os[0], 'license' : $scope.lics[0], 'status' : $scope.statuses[0], 'type' : $scope.sys[0]};
    $scope.selectedBuild = {'show' : false, 'title' : '', 'changeLog' : '', 'imageName' : ''};
    $scope.newRevision = {'changes' : '', 'id' : '', 'revision': ''};
    $scope.selectedBuildRevisions = [];
    $scope.revisonNum = 

    $scope.builds = {};
    $scope.imageCount = 0;
    $scope.imageWord = "image";

    $scope.getBuilds = function() {
        $http({
            method  : 'GET',
            url     : '/builds/list'
         })
        .success(function(resp) {
            $scope.builds = angular.fromJson(resp);
        });
    };

    $scope.getBuilds();

    $scope.$watch('builds', function() {
        for (var osType in $scope.builds) {
            $scope.imageCount = $scope.imageCount + $scope.builds[osType].length;
        }
    });

    $scope.editBuildShow = function(editBuild) {
        $scope.editBuild = {'date' : editBuild.lastCaptured, 'name' : editBuild.imageName, 'os' : editBuild.imageOSVersion, 'license' : editBuild.imageLicense, 'type' : editBuild.imageType, 'status' : editBuild.imageStatus, 'id': editBuild._id};
        $scope.editBuildModel = true;
    };

    $scope.editBuildCancel = function() {
        $scope.editBuildModel = false;
    };

    $scope.editBuildSave = function() {
        $scope.editBuildModel = false;

        $http({
            method  : 'POST',
            url     : '/builds/save',
            data    : $.param($scope.editBuild),
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .success(function(resp) {
            if (angular.fromJson(resp).status == "success") {
                $scope.getBuilds();
            } else {
                console.warn("Failed to confirm save!");
            }
        });
    };

    $scope.editBuildDelete = function() {
        $scope.editBuildModel = false;

        $http({
            method  : 'POST',
            url     : '/builds/delete',
            data    : $.param({'id': $scope.editBuild.id}),
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .success(function(resp) {
            if (angular.fromJson(resp).status == "success") {
                $scope.getBuilds();
            } else {
                console.warn("Failed to confirm delete!");
            }
        });
    };

    $scope.addBuildShow = function() {
        $scope.newBuild = {'date' : '', 'name' : '', 'os' : $scope.os[0], 'license' : $scope.lics[0], 'type' : $scope.sys[0], 'imageStatus' : 'New'};
        $scope.addBuildModel = true;
    };

    $scope.addBuildCancel = function() {
        $scope.addBuildModel = false;
    };

    $scope.addBuildSave = function() {
        $scope.addBuildModel = false;

        $http({
            method  : 'POST',
            url     : '/builds/save',
            data    : $.param($scope.newBuild),
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .success(function(resp) {
            if (angular.fromJson(resp).status == "success") {
                $scope.getBuilds();
            } else {
                console.warn("Failed to confirm save!");
            }
        });

        $scope.selectedBuild = {'show' : false, 'title' : '', 'changeLog' : ''};
        $scope.newRevision = {'changes' : '', 'id' : '', 'revision': ''};
    };

    $scope.addRevisionShow = function() {
        $scope.addRevisionModel = true;
    };

    $scope.addRevisionSave = function() {
        $scope.addRevisionModel = false;

        $http({
            method  : 'POST',
            url     : '/builds/addRevision',
            data    : $.param($scope.newRevision),
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .success(function(resp) {
            if (angular.fromJson(resp).status == "success") {
                $scope.selectedBuild.changeLog = " " + $scope.newRevision.changes;
                $scope.selectedBuild.title =  $scope.selectedBuild.imageName + " " + $scope.newRevision.revision;
            } else {
                console.warn("Failed to confirm revision addition!");
            }
        });
    };

    $scope.addRevisionCancel = function() {
        $scope.addRevisionModel = false;
    };

    $scope.showDetails = function(build) {
        $http({
            method  : 'GET',
            url     : '/builds/revisions',
            params    : {'buildId' : build._id}
         })
        .success(function(resp) {
            $scope.selectedBuildRevisions = angular.fromJson(resp);

            $scope.newRevision.revision = "r" + (parseInt($scope.selectedBuildRevisions[$scope.selectedBuildRevisions.length - 1].revision.replace("r","")) + 1);
            $scope.newRevision = {'changes' : '', 'id' : build._id, 'revision': $scope.newRevision.revision};
 
            $scope.selectedBuild.title = build.imageName + " " + $scope.selectedBuildRevisions[$scope.selectedBuildRevisions.length - 1].revision;
            $scope.selectedBuild.imageName = build.imageName;
            $scope.selectedBuild.changeLog = " " + $scope.selectedBuildRevisions[$scope.selectedBuildRevisions.length - 1].changes;

            $scope.selectedBuild.show = true;
        });
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
        compile: function(element, attr, transclude) {
            $(element[0]).datetimepicker();
        }
    };
});

//Re-bind the date picker value
jasper.directive('datePickerModel', function() {
    return {
        compile: function(element, attr, transclude) {
            element.on('blur', function () {
                angular.element(element[0]).triggerHandler('input');
            });
        }
    };
});

//One click in a dbl-click bound element
jasper.directive('sglclick', ['$parse', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
          var fn = $parse(attr['sglclick']);
          var delay = 300, clicks = 0, timer = null;
          element.on('click', function (event) {
            clicks++; 
            if(clicks === 1) {
              timer = setTimeout(function() {
                scope.$apply(function () {
                    fn(scope, { $event: event });
                }); 
                clicks = 0;      
              }, delay);
              } else {
                clearTimeout(timer);  
                clicks = 0;       
              }
          });
        }
    };
}]);