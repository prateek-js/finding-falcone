var app = angular.module('findfalcone', []);

app.controller('FindCtrl', ['$scope', '$http', function($scope, $http) {


    $http({
        url: "http://findfalcone.herokuapp.com/planets",
        headers: {
            "Accept": "application/json"
        },
        method: 'GET'
    }).then(function success(response) {
        $scope.planets = JSON.stringify(response.data)
    });


    $http({
        url: "http://findfalcone.herokuapp.com/vehicles",
        headers: {
            "Accept": "application/json"
        },
        method: 'GET'
    }).then(function success(response) {
        $scope.vehicles = JSON.stringify(response.data)
    })

    $scope.getTokenViaAngular = function() {
        $http({
            url: "http://findfalcone.herokuapp.com/token",
            headers: {
                "Accept": "application/json"
            },
            method: 'POST'
        }).then(function success(response) {
            $scope.token = response.data.token
        })
    }

    $scope.findFalcone = function() {
        $http({
            url: "http://findfalcone.herokuapp.com/find",
            data: $scope.data,
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            method: 'POST'

        }).then(function success(response) {
            alert(JSON.stringify(response.data));
        }).then(function error(response) {
            console.log("error " + response)
        });
    }
}]);