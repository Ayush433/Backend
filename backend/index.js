const express = require("express");
const app = express();

const postRoute = require("./Routes/postRoutes");
const userRoutes = require("./Routes/userRoutes");
const cors = require("cors");
const fileupload = require("express-fileupload");

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

mongoose.connect(
  "mongodb+srv://Ayush:PasswordAyush1`@cluster0.id4t1mv.mongodb.net/Blog?retryWrites=true&w=majority",
  (err) => {
    if (err) {
      console.log(err);
    }
    app.listen(3000);
  }
);
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, multipart/form-data"
  );
  next();
});
app.use(
  fileupload({
    createParentPath: true,
  })
);
app.use(userRoutes);
app.use(postRoute);
