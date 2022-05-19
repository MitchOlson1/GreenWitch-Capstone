require("dotenv").config();
const connectDb = require("./db/db");
const usersRouter = require("./routes/users");
const express = require("express");
const cors = require("cors");
const app = express();
const createError = require('http-errors');
const morgan = require('morgan');



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

// app.use("/uploads/images", express.static(path.join(`uploads`, `images`)));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
