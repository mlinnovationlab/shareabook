module.exports = [
    {
        controller: "bootstrap",
        route: {
            post: {path: "/api/bootstrap", isLoginRequired: false}
        }
    },
    {
        controller: "facebookLogin",
        route: {
            post: {path: "/auth/facebook", isLoginRequired: false}
        }
    },
    {
        controller: "googleLogin",
        route: {
            post: {path: "/auth/google", isLoginRequired: false}
        }
    },
    {
        controller: "users",
        route: {
            put: {path: "/api/users/:userId", isLoginRequired: true}
        }
    },
    {
        controller: "token",
        route: {
            post: {path: "/api/validateToken", isLoginRequired: false}
        }
    },
    {
        controller: "userBooks",
        route: {
            get: {path: "/api/users/:userId/books", isLoginRequired: true},
            post: {path: "/api/users/:userId/books", isLoginRequired: true}
        }
    },
    {
        controller: "books",
        route: {
            get: {path: "/api/books", isLoginRequired: true}
        }
    },
    {
        controller: "bookDetail",
        route: {
            get: {path: "/api/books/:bookId", isLoginRequired: true},
            put: {path: "/api/books/:bookId", isLoginRequired: true},
            delete: {path: "/api/books/:bookId", isLoginRequired: true}
        }
    },
    {
        controller: "searchBooks",
        route: {
            get: {path: "/api/searchBooks/:key/:value", isLoginRequired: true}
        }
    },
    {
        controller: "group",
        route: {
            get: {path: "/api/groups", isLoginRequired: false},
            post: {path: "/api/groups", isLoginRequired: false}
        }
    },
    {
        controller: "bookRequest",
        route: {
            put: {path: "/api/bookRequest", isLoginRequired: true}
        }
    },
    {
        controller: "inRequests",
        route: {
            get: {path: "/api/users/:userId/InRequests", isLoginRequired: true}
        }
    },
    {
        controller: "outRequests",
        route: {
            get: {path: "/api/users/:userId/OutRequests", isLoginRequired: true}
        }
    },
    {
        controller: "requestCancel",
        route: {
            put: {path: "/api/cancelRequest/:requestId", isLoginRequired: true}
        }
    },
    {
        controller: "requestApprove",
        route: {
            put: {path: "/api/approveRequest/:requestId", isLoginRequired: true}
        }
    },
    {
        controller: "updateRequestToBorrowed",
        route: {
            put: {path: "/api/updateRequestToBorrowed/:requestId", isLoginRequired: true}
        }
    },
    {
        controller: "updateRequestToReturned",
        route: {
            put: {path: "/api/updateRequestToReturned/:requestId", isLoginRequired: true}
        }
    },
];