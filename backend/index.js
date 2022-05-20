require("dotenv").config();
const connectDb = require("./db/db");
const usersRouter = require("./routes/users");
const express = require("express");
const cors = require("cors");
const app = express();
const createError = require('http-errors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path')



connectDb();

app.use(cors());
app.use(express.json());
app.use(`/api/users`, usersRouter);
app.use(express.urlencoded({extended:false}));
app.use(morgan('start'));


app.use((req,res,next) => {
  next(createError.NotFound());
});
app.use((err,req,res,next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message:err.message,
  });
});

app.use("/uploads/images", express.static(path.join(`uploads`, `images`)));
app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message | "An unknown error occured!" });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
