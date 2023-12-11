NOTE: Before using this application you have to run a command in root foolder of my project
      to start a React JSON Server for my backend functionalities because I did'nt use any other technology for my backend ..
#      Command : json-server --watch db.json --port 3031
THis starts my server and don't close the terminal otherwise it won't
works

Open another terminal and execute the command:
#      npm i react
to reinstall my dependencies.

 And If you want to execute my frontend use: 
#      npm start  


Technologies Used : -
       My web application is made on :  
                   React.js  and Material UI styled components.
        I make sure that my UI is some how responsive on various screens.
        I used Material UI for using icons only.
        I made React Functional components to manage state properly.

Setup Instructions: -

     Before using this application you have to run a command in root foolder of my project
      to start a React JSON Server for my backend functionalities because I did'nt use any other technology for my backend ..
#      Command : json-server --watch db.json --port 3031
THis starts my server and don't close the terminal otherwise it won't
works

 And If you want to execute my frontend use: 
#      npm start  


Usage Of My App :-

        Login Signup Feature :
               Firstly When user open my web , He was automatically directed to a login signup page because He could'nt able to open any other page before logging in. First He/She made a 
               account successfully and then Login in because I made my Login Signup using strong error
               handling, validations  and authentication.
        
        Authentication :
             I made authentication for the user using a unique ID or key as a token .
             When the user log in to his account that token was given to him and the token , 
             Username and his/her role will be stored in the local storage. 
        
        Userpage:
          userpage has a navbar and a Task adding where with complete validation and strong 
          error handling where user will be able to add tasks easily with title description and
          status and deadline of the task.
        
        Tasks page:
           On the task page user will be able to see all the tasks he added and should be able to edit
           them easily but if user is an admin , He will be able to delete the tasks also.

        Users page:
           Users page can only seen by the  Admins where they should able to see all the users
           and there roles.
        
        Logout Button:-
            User should be able to logout from his account. when he clicks on logout button He will be redirected to the login page.

        Data base:-
          I did'nt use any proper database for my project . I made a db.json file in my root folder  
          where all my data is stored and used a local json server to handle my data base and perform CRUD opperations.
