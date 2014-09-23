angular.module('bookmarks', [
  'categories.bookmarks.edit',
  'categories.bookmarks.create',
  'eggly.models.categories',
  'eggly.models.bookmarks',
    "firebase"
])
  .config(function ($stateProvider) {
    $stateProvider
      .state('eggly.categories.bookmarks', {
        url: 'categories/:category',
        views: {
          'bookmarks@': {
            controller: 'BookmarksCtrl',
            templateUrl: 'app/categories/bookmarks/bookmarks.tmpl.html'
          }
        }
      })
    ;
  })
  .controller('BookmarksCtrl', function BookmarksCtrl($scope, $stateParams, $firebase, bookmarks, categories) {
    categories.setCurrentCategory();

    if ($stateParams.category) {
      categories.getCategoryByName($stateParams.category).then(function (category) {
        categories.setCurrentCategory(category);
      })
    }

    bookmarks.getBookmarks()
      .then(function (result) {
            // ignore the result
            var ref = new Firebase("https://amber-torch-1305.firebaseio.com/mark/Bookmark");
            $scope.bookmarks = $firebase(ref).$asArray();
      });

    $scope.isSelectedBookmark = function (bookmarkId) {
      return $stateParams.bookmarkId == bookmarkId;
    };

    $scope.getCurrentCategory = categories.getCurrentCategory;
    $scope.getCurrentCategoryName = categories.getCurrentCategoryName;
    $scope.deleteBookmark = bookmarks.deleteBookmark;

  })
;

