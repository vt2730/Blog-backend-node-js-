const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/catgories");
const multer = require("multer");

dotenv.config();
app.use(express.json());

 mongoose.connect(process.env.MONGO_URL)
 .then(console.log("connected to mongoDB"))
 .catch(err => console.log(err));

 const fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "images");
        },
        filename: (req, file, cb) => {
            cb(null, req.body.name);
        }
    });
 
    const upload = multer({ storage: fileStorage });
    app.post("/api/upload", upload.single("images"),(req, res) => {
        res.status(200).json("uploaded");
    });

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

