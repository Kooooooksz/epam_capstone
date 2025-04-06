## How to setup project

Open terminal
Navigate to "capstone-project-template", using "cd" command
You need to run "npm install"
Then you have to navigate to "src" folder
Wrute "npm run compile" to compile scss files to css
Run "json-server --watch data.json --port 3000" to start json server

Open another terminal
Navigate to "capstone-project-template/src", using "cd" command
Run "live-server" to start the application
In the browser, navigate to "templates/login/login.html" to start

I used json-server to
be able to register as a new user (there is a predefined admin, you can register as a user or a teacher)
add new courses, also update and delete them as admin (i used base64 for images, but i commented it, because it's way too slow)
while adding and updating course, you can assign a teacher to the course
enroll, and disenroll courses
see your profile datas
