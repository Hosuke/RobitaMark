angular.module('categories', [
  'eggly.models.categories',
    "firebase"
])
  .config(function ($stateProvider) {
    $stateProvider
      .state('eggly.categories', {
        url: '/',
        views: {
          'categories@': {
            controller: 'CategoriesCtrl',
            templateUrl: 'app/categories/categories.tmpl.html'
          },
          'bookmarks@': {
            controller: 'BookmarksCtrl',
            templateUrl: 'app/categories/bookmarks/bookmarks.tmpl.html'
          }
        }
      });
  })

  .controller('CategoriesCtrl', function CategoriesCtrl($scope, $firebase, categories) {
    $scope.getCurrentCategoryName = categories.getCurrentCategoryName;

    categories.getCategories()
      .then(function (result) {
            // ignore the result
            var ref = new Firebase("https://amber-torch-1305.firebaseio.com/mark/Category");
            $scope.categories = $firebase(ref).$asArray();
      });

    $scope.isCurrentCategory = function (category) {
      return category.name === $scope.getCurrentCategoryName();
    }
  })
;