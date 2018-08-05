# Project Title

303 Software Code Assessment

## Directions
* Make sure mongodb is installed in your computer
* On Mac open a  terminal type ```mongod```
* Open a separate terminal (make sure your are on your root nodejs app) 
* ```npm install```
* ```npm run seed```
* ```npm run lint```
* ```npm start```

## Postman Instructions


* Get Request All Books URL:  http://localhost:3000/ or http://localhost:3000/books
* Get Request  Read One Book URL http://localhost:3000/books/5b65fa4143a26de54b2c971f
* Put Request or update Use Postman http://localhost:3000/books/5b65fa4143a26de54b2c971f 
    Body: ```{"title":"new updated title", "author":"new updated author", "content":"new updated content"}```
    Application: JSON
* Post Request (Create) -  http://localhost:3000/books
    Body: ```{ "title" : "New Book", "author": "New Author" "content": "New Content" }```
    Application: JSON
* Delete request http://localhost:3000/books/5b65fa4143a26de54b2c971f  


