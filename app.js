require("dotenv").config();
const express = require("express"),
    mongoose = require("mongoose"),
    app = express(),
    bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser"),
    cors = require("cors"),
    path = require("path");

// Routes

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

// DB Connections
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify : false
  })
  .then(() => {
    console.log("DB CONNECTED");
  }); 

  

 // Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors()); 


app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", postRoutes);



if(process.env.NODE_ENV === "production")
{
  app.use(express.static('client/build') );

  app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html' ))
  })
}

// Port
const port = process.env.PORT || 8000; 

// Listening the server
app.listen(port, ()=>{
    console.log(`Sanganan Prayog Blog listening at ${port}`);
})