angular.module('categories.create', [
  'eggly.models.categories'
])
  .config(function ($stateProvider) {
    $stateProvider
      .state('eggly.categories.create', {
        url: '/categories/create',
        views: {
          '@eggly.categories': {
            templateUrl: 'app/categories/create/create.category.tmpl.html',
            controller: 'CreateCategoryCtrl'
          }
        }
      })
    ;
  })

  .controller('CreateCategoryCtrl', function ($scope, $stateParams, categories, $state) {
    $scope.isCreating = false;

    function toggleCreating() {
      $scope.isCreating = !$scope.isCreating;
    }

    function returnToCategories() {
      $state.go('eggly.categories', {
        category: $stateParams.category
      })
    }

    function cancelCreating() {
      $scope.isCreating = false;
      returnToCategories();
    }

    function createCategory() {
      categories.createCategory($scope.newCategory);
      returnToCategories();
    }

    function resetForm() {
      $scope.newCategory = {
        name: ''
      };
    }

    $scope.toggleCreating = toggleCreating;
    $scope.cancelCreating = cancelCreating;
    $scope.createCategory = createCategory;

    resetForm();
    toggleCreating();
  })
;
