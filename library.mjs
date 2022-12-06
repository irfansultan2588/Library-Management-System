import express, { request } from "express";
import cors from "cors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { stringToHash, varifyHash } from "bcrypt-inzi";
import nodemailer from "nodemailer";

let dbURI =
  process.env.MONGODBURI ||
  "mongodb+srv://abc:abc@cluster0.jqfzaar.mongodb.net/Library-management?retryWrites=true&w=majority";
const SECRET = process.env.SECRET || "topsecret";
const port = process.env.PORT || 5001;

const app = express();
app.use(express.json());
app.use(cookieParser());

// app.use(
//   cors({
//     origin: ["http://localhost:3000"],
//   })
// );

app.use(cors({ origin: true, credentials: true }));
///////////user Schema////////////////
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  contactNo: { type: Number, required: true },
  verify: { type: Boolean, default: false },
  otp: { type: String },
  createdOn: { type: Date, default: Date.now },
});

const userModel = mongoose.model("user", userSchema);
///////////user Signup////////////////
app.post("/signup", async (req, res) => {
  let body = req.body;

  if (
    !body.fullName ||
    !body.email ||
    !body.password ||
    !body.address ||
    !body.contactNo
  ) {
    res.status(400).send(
      `required fields missing, request example:
                {
                    "fullName": "John Doe",
                    "email": "abc@abc.com",
                    "password": "12345"
                     "address": "korangi no 1"
                     "contactNo": "0315,2345678"
                }`
    );
    return;
  }

  userModel.findOne({ email: body.email }, (err, user) => {
    if (!err) {
      if (user) {
        // user already exist
        console.log("user already exist: ", user);
        res.status(400).send({
          message: "user already exist, please try a different email",
        });
        return;
      } else {
        // user not already exist
        stringToHash(body.password).then((hashString) => {
          ///////////////////////////////////////////////////////////////////////////////////////////////////////
          const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

          let transporter = nodemailer.createTransport({
            service: "gmail",

            auth: {
              user: "irfansultan201@gmail.com",
              pass: "pokfdsamiscxtwjo",
            },
          });

          let mailOptions = {
            from: body.email,
            to: body.email,
            subject: "Sending Email Using Node.js",
            html: `<p>Enter <b>${otp} </b> in the app to verifiy your email address and complete</p>`,
          };

          transporter.sendMail(mailOptions, async function (error, info) {
            if (error) {
              console.log(error);
            } else {
              await userModel
                .create({
                  fullName: body.fullName,
                  email: body.email.toLowerCase(),
                  password: hashString,
                  address: body.address,
                  contactNo: body.contactNo,
                  otp,
                })
                .then((resss) => {
                  res.status(200).send({ message: "user is created" });
                })
                .catch((err) => {
                  console.log(err, "err");
                  res.status(500).send({ message: "internal server error" });
                });
            }
          });
        });
      }
    } else {
      console.log("db error: ", err);
      res.status(500).send({ message: "db error in query" });
    }
  });
});
///////////user login////////////////

app.post("/login", (req, res) => {
  let body = req.body;
  if (!body.email || !body.password) {
    res.status(400).send(
      `required fields missing, request example:
            {
                "email": "abc@abc.com",
                "password": "12345"
            }`
    );
    return;
  }

  userModel.findOne(
    { email: body.email },
    "fullName email password address contactNo verify",
    (err, user) => {
      if (!err) {
        if (user) {
          // user found

          varifyHash(body.password, user.password).then((isMatched) => {
            if (isMatched && user.verify) {
              var token = jwt.sign(
                {
                  _id: user._id,
                  email: user.email,
                  iat: Math.floor(Date.now() / 1000) - 30,
                  exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
                },
                SECRET
              );

              res.cookie("Token", token, {
                maxAge: 86_400_000,
                httpOnly: true,
              });

              res.send({
                message: "Login successful",
                profile: {
                  _id: user._id,
                  fullName: user.fullName,
                  email: user.email,
                  password: user.password,
                },
              });

              return;
            } else {
              console.log("users not found: ");
              res.status(401).send({ message: "Incorrect email.or password," });
              return;
            }
          });
        } else {
          // user not found

          console.log("Incorrect email or password: ");
          res.status(401).send({ message: "Incorrect email.or password," });
          return;
        }
      } else {
        console.log("db error: ", err);
        res.status(500).send({ message: "Login failed please try later" });
      }
    }
  );
});

///////////user OTP////////////////
app.post("/verifyotp", async (req, res) => {
  try {
    let { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).send("empty otp details are not allowed");
    } else {
      const user = await userModel.findOne({ email });
      if (otp === user.otp) {
        await userModel.updateOne({ email }, { verify: true, otp: null });
        return res.status(200).send({ message: "correct otp" });
      } else {
        return res.status(403).send({ message: "incorrect otp" });
      }
    }
  } catch (error) {
    console.log(error, "error");
    res.json({
      status: "failed",
      message: "error.message",
    });
  }
});

////////////Update profile/////////////
app.put("/profile/:id", async (req, res) => {
  console.log("profile to be edited: ", req.body);

  const update = {};
  if (req.body.email) update.email = req.body.email;
  if (req.body.password) update.password = req.body.password;

  try {
    const updated = await userModel
      .findOneAndUpdate({ _id: req.params.id }, update, { new: true })
      .exec();
    console.log("updated profile: ", updated);

    res.send({
      message: "profile updated successfuly",
      data: updated,
    });
  } catch (error) {
    res.status(500).send({
      message: "faild to upadate profile",
    });
  }
});

app.use(function (req, res, next) {
  console.log("req.cookies: ", req.cookies);

  if (!req.cookies.Token) {
    res.status(401).send({
      message: "include http-only credentials with every request",
    });
    return;
  }
  jwt.verify(req.cookies.Token, SECRET, function (err, decodedData) {
    if (!err) {
      console.log("decodedData: ", decodedData);

      const nowDate = new Date().getTime() / 1000;

      if (decodedData.exp < nowDate) {
        res.status(401).send("token expired");
      } else {
        console.log("token approved");
        req.body.token = decodedData;
        next();
      }
    } else {
      res.status(401).send("invalid token");
    }
  });
});

///////////user profile////////////////
app.get("/profile", async (req, res) => {
  try {
    let user = await userModel.findOne({ _id: req?.body?.token?._id }).exec();
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: "error getting users" });
  }
});
///////////user logout////////////////
app.post("/logout", (req, res) => {
  res.cookie("Token", "", {
    maxAge: 0,
    httpOnly: true,
  });

  res.send({ message: "Logout successful" });
});

app.use((req, res) => {
  res.status(404).send("404 not found");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// /////////////////////////////////////////////////////////////////////////////////////////////////
mongoose.connect(dbURI);

////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on("connected", function () {
  //connected
  console.log("Mongoose is connected");
});

mongoose.connection.on("disconnected", function () {
  //disconnected
  console.log("Mongoose is disconnected");
  process.exit(1);
});

mongoose.connection.on("error", function (err) {
  //any error
  console.log("Mongoose connection error: ", err);
  process.exit(1);
});

process.on("SIGINT", function () {
  /////this function will run jst before app is closing
  console.log("app is terminating");
  mongoose.connection.close(function () {
    console.log("Mongoose default connection closed");
    process.exit(0);
  });
});
////mongodb connected disconnected events///////////////////////////////////////////////
