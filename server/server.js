const path = require("path");
const express = require("express");
const app = express();
const apiRouter = require('./apiRouter');


const PORT = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, "..src/pictures")))
//app.use("/about", (req, res) => res.status(200).send('ok'));
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

app.use('/api', apiRouter);

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
    console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;