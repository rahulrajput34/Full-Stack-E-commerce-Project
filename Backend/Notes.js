/*
first we init npm then enter till and then we installed below packages
npm i cors -- allow fontend IP to access backend
dotenv  -- environment variables in project
express -- backend framework  (for creating APIs)
mongoose -- database    
bcrypt -- password hashing  (forencryp the password so that we can store into database )
jsonwebtoken -- token generation (enable the user authentication so that user can loged in our websiteS)
razorpay -- payment gateway (online paymenet integration)
stripe -- payment gateway (online paymenet integration)
cloudinary -- image hosting 
multer -- image upload  (store the images on cloudinary storage)
nodemon -- automatic restart (restart the backend whenever we make changes in the code)
validator -- input validation
*/

/*
Then we created all the folder which are neccessary for backend
Then we have added the  "server": "nodemon server.js" for running the backed when we run
And, We have "type": "module", in package.json file so that we can use import and export in js file
*/

/*
for creating our server,  we created the server.js file in Backend folder
Then we have added the below code in server.js file
then we added env file
*/

/*
To run the server, we have to run the below command
npm run server

We have added the Types folder adding express and cros
When we connecting the database that time we shoud Make sure we give our own created password over here
If our password contaains special character then we have to use URL encoder like %40 and all in place of characters
*/

/*
Then we have created the cloudinary API key and get name and all and put it into env
And Create the coudnity file for configration of cloudinary
Then we have created the product, from using this we can store the data in DataBace
*/
/*******************************      What we will generally doooooooooooooooooooo?     ***************
We have created the product model and user model
Then we have created the product controller and user controller just create the  fucntions we want
Then we have created the product route and user route after creating the controller function
then write the logic of the controllers
And then passed it to api endpoints in server
 */


// ********************************* What is relation among UserController, UserRoute, UserModel, ApiCheckpoint ****************

/* 
1.UserModel: This is like the blueprint for user data in your application. It defines how user information is structured and connects directly to your MongoDB database, making it easy to store and retrieve user data efficiently.
2.UserController: Think of this as the brain behind user-related actions. It takes the data defined in the UserModel and handles the core logic for things like creating new users, updating existing profiles, and retrieving user information based on requests.
3.UserRoute: This component serves as the traffic director for API requests. It sets up the routes that clients will use to interact with the application and maps those requests to the appropriate methods in the UserController. So when a user wants to perform an action, this is where the request goes first.
4.ApiCheckpoint: Imagine this as the security guard for your routes. It checks incoming requests to make sure users are authorized to access the information or perform the actions they’re requesting. Only after passing this checkpoint does the request move on to the UserController, ensuring that sensitive user data is kept secure.

*/

// ******************************    What is hashing of password    ***********************************
/*
1.Transforming Passwords: Hashing converts a plaintext password into a fixed-size string, ensuring it is not stored in its original form.
2.Irreversibility: Hashing is a one-way process, making it virtually impossible to retrieve the original password from the hashed value.
3.Salt: A random value added to the password before hashing to prevent attacks using precomputed hash tables, enhancing security.
4.Storing Passwords Securely: Hashed passwords are stored in the database instead of plaintext passwords, protecting user credentials even if the database is compromised.
*/


// *******************************     What is middle ware     ***************************************
/*
Middleware is like a helper that sits between two parts of a computer program to help them talk to each other. Imagine you're sending a message through a mail service. The mail carrier (middleware) picks up your message, checks if everything is okay, and delivers it to the right place. It also makes sure that any response you get back is handled properly.

In other words, Middleware is a software component that sits between a user's request and the server, helping to process and manage that request before it reaches the main application or database. It can perform various tasks, such as checking user permissions, logging activities, handling file uploads, and validating data. If the request meets the specified criteria, the middleware allows it to proceed to the next step in the process; if there are issues, it can stop the request and provide feedback. This ensures that the application runs smoothly and securely.
*/
/*
So, here multer is middleware which used in website for, when a user uploads data (like files), Multer acts as middleware that checks the data before it is sent to the server or stored in the database. If the uploaded data is valid and meets the specified criteria (like file type or size), Multer allows it to proceed to the next step (like saving it to the server or database). If there are issues, it can stop the process and provide feedback.
 */


// ********************************* Fucntionp param - req, res, next **************************
/*
req (Request): Represents the HTTP request made by the client, containing details like headers, body, and parameters. It's used to extract data like the JWT token for authentication.
res (Response): Represents the HTTP response sent back to the client. It's used to send data, status codes, or errors, like a 401 Unauthorized if the token is invalid.
next (Next Middleware): A function that passes control to the next middleware or route handler. It ensures the request continues if authentication is successful.
*/

/*
Token:
eyJhbGciOiJIUzI1NiJ9.YWRtaW5AcnJjbG90aGluZy5jb20xMjM0NTY3OA.AmSndvnkMoDgw9QTEqABZWKLMMGyYEESGPQcgMAeswI

*/


// *********************************************************************************************
// *************************** The Most important thing we have learnt is that *****************
//**********************************************************************************************
// How fontend and backend interact
/*
1.Frontend Login Form: User enters credentials (e.g., email and password) in the frontend form.
2.Send Request to Backend: The frontend sends the credentials to the backend using an Axios API call.
3.Backend Middleware: The backend processes the request, running it through authentication middlewares to verify the credentials.
4.Controller Logic: If the credentials are valid, the controller handles further logic (e.g., generating a token).
5.Response from Server: The backend responds with a token (if authentication is successful) or an error message (if it fails).
6.Token Validation: The frontend receives the response and checks whether the token is valid. If it is valid, the admin panel is displayed. Otherwise, an error is shown (e.g., "Invalid Token").
Repeat Process: If the login fails, the user tries again, and the process repeats.
*/

/*
First time we passed the id and pass then It will not stoed anywhere so we need to pass every time id and pass when we come back to the page or just reload the page
Here's where the concept of the local storage arrives as well
Local storage is helpful to come out from this situation
it will helps to store our data in our local storage so that if we do refresh then we do not need to pass our credentials again
*/