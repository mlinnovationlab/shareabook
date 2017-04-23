'use strict';

angular.module('booksApp', [
    'ui.router',
    'ngNotify',
    'ngDialog',
    'satellizer',
    'autocomplete',
    'booksApp.nav',
    'booksApp.util',
    'booksApp.toast',
    'booksApp.dialog',
    'booksApp.about',
    'booksApp.home',
    'booksApp.auth',
    'booksApp.userProfile',
    'booksApp.books',
    'booksApp.booksService',
    'booksApp.myBooks',
    'booksApp.myBooksService',
    'booksApp.newBook',
    'booksApp.newBookService',
    'booksApp.bookDetail',
    'booksApp.bookEdit',
    'booksApp.bookDetailService',
    'booksApp.bookEditService',
    'booksApp.inBookRequests',
    'booksApp.outBookRequests',
    'booksApp.bookRequestsService',
    'booksApp.logout',
    'booksApp.users'
])
    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');
        $stateProvider.state('home', {
                url: '/',
                templateUrl: 'components/home/home.html',
                controller: 'HomeController'
            });
        $stateProvider.state('profile', {
            url: '/profile',
            templateUrl: 'components/userProfile/userProfile.html',
            controller: 'UserProfileController',
            auth:true
          });
        $stateProvider.state('books', {
            url: '/books',
            templateUrl: 'components/books/books.html',
            controller: 'BooksController',
            auth:true
            });
        $stateProvider.state('my-books', {
            url: '/my-books',
            templateUrl: 'components/myBooks/myBooks.html',
            controller: 'MyBooksController',
            auth:true
            });
        $stateProvider.state('new-book', {
            url: '/new-book',
            templateUrl: 'components/newBook/newBook.html',
            controller: 'NewBookController',
            auth:true
            });
        $stateProvider.state('book-detail', {
            url: '/book-detail/:bookId',
            templateUrl: 'components/bookDetails/bookDetail.html',
            controller: 'BookDetailController',
            auth:true
        });
        $stateProvider.state('book-edit', {
            url: '/book-edit/:bookId',
            templateUrl: 'components/bookEdit/bookEdit.html',
            controller: 'BookEditController',
            auth:true
        });
        $stateProvider.state('book-requests', {
            url: '/book-requests',
            templateUrl: 'components/bookRequests/bookRequests.html',
            auth:true
        });
        $stateProvider.state('book-requests.out', {
            url: '/out',
            templateUrl: 'components/bookRequests/out/outBookRequests.html',
            controller: 'OutBookRequestsController',
            auth:true
        });
        $stateProvider.state('book-requests.in', {
            url: '/in',
            templateUrl: 'components/bookRequests/in/inBookRequests.html',
            controller: 'InBookRequestsController',
            auth:true
        });
        $stateProvider.state('logout', {
            url: '/logout',
            templateUrl: 'components/logout/logout.html',
            controller: 'LogoutController'
            });

        $stateProvider.state('about', {
            url: '/about',
            templateUrl: 'components/about/about.html',
            controller: 'AboutController',
            auth:true
        });

    }).config(function($authProvider) {

        $authProvider.facebook({
            clientId: '489315697906537'
        });

        $authProvider.google({
            clientId: '142313512219-jg16demrul0e08nopmdagbgmsrc2qfqi.apps.googleusercontent.com'
        });

    }).run(function($rootScope, $state, authService) {

        $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {

            if(toState.auth){
                var token = authService.getToken();
                var user = authService.getCurrentUser();
                if(user && token){
                    return;
                }
                if(!token){
                    redirectToLogin()
                }
                else{
                    authService.validateToken(token).success(function(data){
                        authService.setCurrentUser(data);
                        console.log(data);
                        $state.go(toState, toParams);
                        return;
                    }).error(function(){
                        authService.setCurrentUser(null);
                        authService.setToken(null);
                        redirectToLogin();
                    })
                    e.preventDefault();
                }
           }
            else{
                return;
            }

            function redirectToLogin(){
                e.preventDefault();
                $state.go("home");
            }
        });

    }).run(function(ngNotify){
        ngNotify.config({
            theme: 'pure',
            position: 'top',
            duration: 3000,
            type: 'info',
            sticky: false,
            button: false,
            html: false
        });
    }).run(function(navService){
        navService.initNav(4);
    });
