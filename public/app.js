var ges = angular.module('ges', ['ui.router']);

ges.config(['$stateProvider', '$urlRouterProvider',
    function config($stateProvider, $urlRouterProvider) {
        //$locationProvider.hashPrefix('!');

        $stateProvider
	        .state('groceries', {
	            url: '/groceries',
	            templateUrl : './partials/groceries.html',
	            controller  : 'GroceriesController'
	        })
	        .state('categories', {
	            url: '/categories',
	            templateUrl : './partials/categories.html',
	            controller  : 'CategoriesController'
	        })
	        .state('products', {
	            url: '/products',
	            templateUrl : './partials/products.html',
	            controller  : 'ProductsController'
	        });
        
        $urlRouterProvider.otherwise('/groceries');
    }
]);


ges.controller('MainController', function($rootScope) {

    $rootScope.isLoading = false;
});

ges.controller('GroceriesController', function($scope) {

    $scope.message = 'HOME';

});

ges.controller('CategoriesController', function($rootScope, $scope, $http) {

    $rootScope.isLoading = true;

    $http.get('/categories')
        .then(function(response) {
            $scope.categories = response.data;
            $rootScope.isLoading = false;
        })
        .catch(function(response) {
            $scope.categories = {};
            $rootScope.isLoading = false;
        });

    $scope.addCategory = function() {
    	// Show dialog with input field
    };
});

ges.controller('ProductsController', function($scope) {

    $scope.message = 'PRODUCTEN';
});

