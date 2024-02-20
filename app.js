//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const low = require("lodash");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/blogDB");

// let posts = [];

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Thank you for reaching out to us! We're delighted to assist you in any way we can. Whether you have questions, suggestions, or feedback, we're here to listen.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model("Post",postSchema);


app.get("/",function(re,res){

  Post.find({}).then(function(posts){
    res.render("home",{homeContent : homeStartingContent, newPosts : posts});
  });
});

app.get("/about",function(req,res){
  res.render("about",{newAbout : aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{newContact : contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/compose",function(req,res){
  const post = new Post({
    title : low.capitalize(req.body.input1),
    content : req.body.textArea
  });
  post.save();
  res.redirect("/");
});

app.get("/posts/:postId",function(req,res){
  // posts.forEach(function(element){
  //   if (low.lowerCase(element.newTitle) === low.lowerCase(req.params.postName)){
  //     // console.log("Match Found!");
  //     res.render("post",{
  //       title : element.newTitle,
  //       content : element.newContent
  //     });
  //   }
  // });
  const requestedPostId = (req.params.postId);
  Post.findById(requestedPostId).then(function(post){
    res.render("post",{
      title: post.title,
      content: post.content
    });
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
