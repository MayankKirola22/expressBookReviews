const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username)=>{
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}

public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  const get_books = new Promise((resolve, reject) => {
      resolve(res.send(JSON.stringify(books, null, 4)));
    });
    get_books.then(() => console.log("Promise for Task 10 resolved"));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const get_books_by_ISBN = new Promise((resolve, reject) => {
    resolve(res.status(200).send(JSON.stringify(books[req.params.isbn],null,4)));
  });
  get_books_by_ISBN.then(() => console.log("Promise for Task 11 resolved"));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const get_books_by_author = new Promise((resolve, reject) => {
    let filteredbooks={};
    for (let [key, value] of Object.entries(books)) {
      if(value.author===req.params.author)
          filteredbooks[key]=value
    }
    resolve(res.status(200).send(JSON.stringify(filteredbooks,null,4)));
  });
  get_books_by_author.then(() => console.log("Promise for Task 12 resolved"));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const get_books_by_title = new Promise((resolve, reject) => {
    let filteredbooks={};
    for (let [key, value] of Object.entries(books)) {
        if(value.title===req.params.title)
            filteredbooks[key]=value
    }
    resolve(res.status(200).send(JSON.stringify(filteredbooks,null,4)), null, 4)})
  get_books_by_title.then(() => console.log("Promise for Task 13 resolved"));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  return res.status(200).send(JSON.stringify(books[req.params.isbn].reviews,null,4));
});

module.exports.general = public_users;

