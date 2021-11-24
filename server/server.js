const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const PORT = 3000;

//connect to mongoDB
mongoose.connect('mongodb+srv://shepherd:lambchop@cluster0.w9igo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import routers here 
const UserRouter = require("./routers/userRouter.ts");
const awsRouter = require("./routers/aws.ts");

//change later, just for test
if (true) {
    app.get("/", (req, res) => {
        return res.status(200).sendFile(path.join(__dirname, "../src/index.html"));
    });
    app.use("/build", express.static(path.join(__dirname, "../build")));
}

else {
    app.get("/", (req, res) => {
        return res.status(200).sendFile(path.join(__dirname, "../src/index.html"));
    });
    
}

// endpoints here
app.use("/login", UserRouter);
app.use("/aws", awsRouter);



// catch-all Error 404
app.use((req, res) => res.status(404).send("<h1> 404 Route Not Found </h1>"));

//Global Error handler
app.use((err, req, res, next) => {
    const defaultErr = {
      log: "Express error handler caught unknown middleware error",
      status: 500,
      message: { err: "An error occurred" },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}... at ${new Date}`);
});

module.exports = app;