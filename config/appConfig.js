module.exports = {
    server:{
        port:process.env.PORT || 3000,
        secureEndPoints:true,
        requestLimit:4000000
    },
    database:{
        host:"localhost",
        port:27017,
        db:"bookShareDB"
    },
    tokenKey:"14d4dc45-a61d-4e4f-90bf-864ff42e663c",
    googleBooksAPIKey:"AIzaSyAY9np-oGcqmfnBKdtqh_mPlifGJIkyxCA",
    auth:{
        facebook:{
            client_secret:'954beef22554ab34af3ef6bc21e9c683'
        },
        google:{
            client_secret: 'Fup-UrVyxW0zoOYfEsHdlwRv',
            grant_type: 'authorization_code'
        }
    },
    notifications:{
      email:{
          enable:true,
          transportConfig:"smtps://book.sharing.app@gmail.com:123india@smtp.gmail.com",
          templateName:"NewBookRequest.html",
          defaultOptions : {
              from: '"book.sharing.app@gmail.com',
              subject: 'New Book Request',
          }
      }
    },
    bookStatus:{
        free:"FREE",
        requested:"REQUESTED",
        requestApproved:"REQUEST_APPROVED",
        borrowed:"BORROWED"
    },
    bookRequestStatus:{
        requested:"REQUESTED",
        requestApproved:"REQUEST_APPROVED",
        borrowed:"BORROWED",
        cancelled:"CANCELLED",
        returned:"RETURNED"
    },
    bookSearch:{
        externalAPIUrl:"https://www.googleapis.com/books/v1/volumes"
    },
    newAddedBookCount:4
}