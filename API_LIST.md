AuthRouter
==============
POST /signup
POST /login
POST /logout

Profile Router
===================
GET /Profile/view
PATCH /profile/edit
PATCH /profile/password

ConnectionRequestRouter
==============================
POST /request/send/:status/:userId
POST /request/review/:status/:requestId

User Router
===============
GET /user/connections
GET /user/requests/received
GET /user/feed -  Gets you the profile of others on platform of DevConnect

STATUS : ignore , intrested, accepted, rejected

/feed/page=1&limit=10 1-->10
/feed/page=2&limit=10 11-->20
/feed/page=3&limit=10 21-->30