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
POST /request/send/intrested/:userId
POST /request/send/ignored/:userId
POST /request/review/accepted/:requestId
POST /request/reqview/rejetced/:requestId

User Router
===============
GET /user/connections
GET /user/requests/received
GET /user/feed -  Gets you the profile of others on platform of DevConnect

STATUS : ignore , intrested, accepted, rejected