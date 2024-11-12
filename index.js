import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import _ from "lodash";
import methodOverride from "method-override";
const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 3000;

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

let posts = [];

app.get("/", (req,res) => {
    res.render(__dirname + "/views/index.ejs", {
        posts:posts, 
    });
});


app.get("/create", (req,res) => {
    res.render(__dirname + "/views/create.ejs");
});

app.post("/create", (req,res) => {
    const post = {
        title: req.body["title"],
        content: req.body["content"],
    };
    posts.push(post);
    res.redirect("/");
});

app.get("/posts/:postName", (req,res) => {
    const requestedTitle = _.lowerCase(req.params.postName);

    posts.forEach(function(post) {
        const storedTitle = _.lowerCase(post.title);

        if (requestedTitle === storedTitle) {
            res.render(__dirname + "/views/view.ejs", {
                title: post.title,
                content: post.content,
            });
        } 
    });
    });

app.delete("/posts/:postName", (req,res) => {
    const requestedTitle = _.lowerCase(req.params.postName);

    posts.forEach(function(post) {
        const storedTitle = _.lowerCase(post.title);

        if (requestedTitle === storedTitle) {
         posts.splice(storedTitle,1);
         res.redirect("/");   
        }
})})


app.get("/edit/:postName", (req,res) => {
    const requestedTitle = _.lowerCase(req.params.postName);

    posts.forEach(function(post) {
        const storedTitle = _.lowerCase(post.title);

        if (requestedTitle === storedTitle) {
            res.render(__dirname + "/views/edit.ejs", {
                title: post.title,
                content: post.content,
            })
            
}})});

app.put("/edit/:postName", (req,res) => {
    const requestedTitle = _.lowerCase(req.params.postName);

    posts.forEach(function(post) {
        const storedTitle = _.lowerCase(post.title);

        if (requestedTitle === storedTitle) {

    post.title = req.body.title;
    post.content = req.body.content;

    res.redirect(`/posts/${post.title}`)
    } else { 
        return res.status(404).send('Post not found');}
})})



        

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
