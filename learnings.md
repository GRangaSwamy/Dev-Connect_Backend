created a repo
intall express
differencde between ^ and ~ in versions
version naming : 4.16.4  major_update.minor_update(backward_compactable).Patch(very small change,bug fix)
instance of express
diff b/w pac.lock.js and pac.json
created a server and listend to req
install nodemon for auto-restart the server when change occurs


Git intialised
Created a remote repo and and pushed code into remote git repo

Install Postman
create a workspace/collectcion > url to GET Call
Used user profile for GET and POST
Done testing with postman
Use of ? * + in routing 
Practiced dynamic routing using ' : '
Used req to log requests and params

 Multiple Routes with next in the file Routes_And_Handlers.js
 usage of next and playing with next.
 
 Used Middlewares and usage of middlewares
 Error Handling using Try and Catch
 Error Handling using err
 Learned (err,req,res,next)

 Created a cluster in a mangoDB atlas.
 Connected to the database using mongoose.
 First connect DB then listen to server.

 Created a user Schema using mongoose.Schema
 Exported it to Model using mongoose.model(Name,Schema);

 Created a /signup api
 Tested with postman


 Diff b/w json and js obj
 Add the express json middleware to app.
 Make signup api and use body of postman to send data dynamically
 Learned GET API, fetched the data using Model.find({condition}).
 fetched all data using Model.find({})
 Learned Model.findOne() with duplicate documents

 Learned Delete and Patch
 Successfully excuted using Postman
 And verified the changes in MongoDB.

 Added the validation to schema
 Data sanitization on patch request
 -> Restricted to change email once created
 -> Restricted to send minimum of 5 skills
 -> Practiced API level Validation
installed Validator library
Tested email,StrongPassword,mobile etc using validator

Validated data in signup API
Install bcrypt to hash the passwords
Used Helper function to validate input data (utils/validation.js)


Inatall cookie parser
Send a dummy cookie to user
craetea GET /profile API 
install jsonwebtoken
Login API, after email and pwd validation
created a json token and send it to user.

Used middlewar for authentication
This is middle is used for all authentication methods like /profile,/ sendConnection request etc
Also implemented a expiry of token using option expiresIn 

Used a schema methods to generate JWT and to Validate the password those are associated with user.
Now the code is modular, readable and maintanable.

Keeping all api in file is bad practice 
So we are using Express.Router 
Created a list of API and grouped them under each Router

Implemented APIs for login, logout, profil/view and profile/edit and tested with postman.

Created a connection Request schema for storing our request
Successfully send a connetion request 😀😀.