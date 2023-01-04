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
  roll: { type: String },
  verify: { type: Boolean, default: false },
  status: { type: Boolean, default: true },
  otp: { type: String },
  createdOn: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});
const userModel = mongoose.model("user", userSchema);

const librarySchema = new mongoose.Schema({
  libraryName: { type: String, required: true },
  address: { type: String, required: true },
  contactNo: { type: Number, required: true },
  emailaddress: { type: String, required: true },
  uid: { type: String },
  bookReturnDayLimit: { type: Number, required: true },
  bookLateReturnOneDayFine: { type: Number, required: true },
  perUserBookIssueLimit: { type: Number, required: true },
  currency: { type: String, required: true },
  timezone: { type: String, required: true },
  createdOn: { type: Date, default: Date.now },
});
const libraryModel = mongoose.model("library", librarySchema);

///////////////category schema//////////

const categorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
  status: { type: Boolean, default: true },
  uid: { type: String },
  createdOn: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});
const categoryModel = mongoose.model("category", categorySchema);

///////////////author schema//////////
const authorSchema = new mongoose.Schema({
  authorName: { type: String, required: true },
  status: { type: Boolean, default: true },
  uid: { type: String },
  createdOn: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});
const authorModel = mongoose.model("author", authorSchema);
///////////////Location Rack schema//////////
const locationRackSchema = new mongoose.Schema({
  locationRackName: { type: String, required: true },
  status: { type: Boolean, default: true },
  uid: { type: String },
  createdOn: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});
const locationRackModel = mongoose.model("locationrack", locationRackSchema);
///////////////books schema//////////
const bookSchema = new mongoose.Schema({
  bookName: { type: String, required: true },

  author: {
    authorName: { type: String },
    _id: { type: String },
  },
  category: {
    categoryName: { type: String },
    _id: { type: String },
  },
  locationRack: {
    locationRackName: { type: String },
    _id: { type: String },
  },
  bookIsbnNumber: { type: Number, required: true },
  bookCopy: { type: Number, required: true },
  status: { type: Boolean, default: true },
  uid: { type: String },
  createdOn: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});
const bookModel = mongoose.model("book", bookSchema);

///////////////issue book schema//////////
const issueBookSchema = new mongoose.Schema({
  bookIsbnNumber: { type: Number, required: true },
  uniqueID: { type: String, required: true },
  status: { type: Boolean, default: true },
  uid: { type: String },
  issueDate: { type: Date, default: Date.now },
  returnDate: { type: Date },
});
const issueBookModel = mongoose.model("issuebook", issueBookSchema);

////////////////issue details///////////////
app.get("/userdata/:uniqueID/:isbnNumber", async (req, res) => {
  try {
    let data = await userModel.findOne({ _id: req.params.uniqueID }).exec();
    let isbn = await bookModel
      .findOne({ bookIsbnNumber: req.params.isbnNumber })
      .exec();
    res.send({
      data: data,
      isbn: isbn,
    });
  } catch (error) {
    res.status(500).send({ message: "error getting data" });
  }
});

///////////userstatusupdated//////////////
app.put("/userstatus/:id", async (req, res) => {
  const update = {};

  update.status = req.body.status;

  update.updatedAt = Date.now();

  try {
    const updated = await userModel
      .findOneAndUpdate({ _id: req.params.id }, update, {
        new: true,
        status: false,
      })
      .exec();

    res.send({
      message: "status updated successfuly",
      status: updated,
    });
  } catch (error) {
    res.status(500).send({
      message: "faild to upadate status",
    });
  }
});
///////////authorstatusupdate//////////////
app.put("/authorstatus/:id", async (req, res) => {
  const update = {};

  update.status = req.body.status;

  try {
    const updated = await authorModel
      .findOneAndUpdate({ _id: req.params.id }, update, {
        new: true,
        status: false,
      })
      .exec();

    res.send({
      message: "status updated successfuly",
      status: updated,
    });
  } catch (error) {
    res.status(500).send({
      message: "faild to upadate status",
    });
  }
});

///////////categoryupdate//////////////
app.put("/catstatus/:id", async (req, res) => {
  const update = {};

  update.status = req.body.status;

  try {
    const updated = await categoryModel
      .findOneAndUpdate({ _id: req.params.id }, update, {
        new: true,
        status: false,
      })
      .exec();

    res.send({
      message: "status updated successfuly",
      status: updated,
    });
  } catch (error) {
    res.status(500).send({
      message: "faild to upadate status",
    });
  }
});
///////////Rackstatus//////////////
app.put("/Rackstatus/:id", async (req, res) => {
  const update = {};

  update.status = req.body.status;

  try {
    const updated = await locationRackModel
      .findOneAndUpdate({ _id: req.params.id }, update, {
        new: true,
        status: false,
      })
      .exec();

    res.send({
      message: "status updated successfuly",
      status: updated,
    });
  } catch (error) {
    res.status(500).send({
      message: "faild to upadate status",
    });
  }
});
///////////bookstatus//////////////
app.put("/bookstatus/:id", async (req, res) => {
  const update = {};

  update.status = req.body.status;

  try {
    const updated = await bookModel
      .findOneAndUpdate({ _id: req.params.id }, update, {
        new: true,
        status: false,
      })
      .exec();

    res.send({
      message: "status updated successfuly",
      status: updated,
    });
  } catch (error) {
    res.status(500).send({
      message: "faild to upadate status",
    });
  }
});
///////////bookstatus//////////////
app.put("/issuestatus/:id", async (req, res) => {
  const update = {};

  update.status = req.body.status;
  update.returnDate = Date.now();

  try {
    const updated = await issueBookModel
      .findOneAndUpdate({ _id: req.params.id }, update, {
        new: true,
        status: false,
      })
      .exec();
    console.log("🚀 ~ updated", updated);

    res.send({
      message: "status updated successfuly",
      status: updated,
    });
  } catch (error) {
    res.status(500).send({
      message: "faild to upadate status",
    });
  }
});

////////////Issue book post////////////////
app.post("/issuebook", (req, res) => {
  let body = req.body;

  issueBookModel.findOne({ email: body.email }, (err, book) => {
    if (!err) {
      issueBookModel
        .create({
          bookIsbnNumber: body.bookIsbnNumber,
          uniqueID: body.uniqueID,
          uid: body.uid,
        })
        .then((resss) => {
          res.status(200).send({ message: "Issued Book" });
        })
        .catch((err) => {
          console.log(err, "err");
          res.status(500).send({ message: "internal server error" });
        });
    }
  });
});
////////////Issue book get data////////////////
app.get("/issuebook/:uid", async (req, res) => {
  try {
    let data = await issueBookModel.find({ uid: req.params.uid }).exec();
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: "error getting data" });
  }
});
////////////book post////////////////
app.post("/createbook", (req, res) => {
  let body = req.body;

  bookModel.findOne({ email: body.email }, (err, book) => {
    if (!err) {
      bookModel
        .create({
          bookName: body.bookName,
          author: body.author,
          category: body.category,
          locationRack: body.locationRack,
          bookIsbnNumber: body.bookIsbnNumber,
          bookCopy: body.bookCopy,
          uid: body.uid,
        })
        .then((resss) => {
          res.status(200).send({ message: "Book is created" });
        })
        .catch((err) => {
          console.log(err, "err");
          res.status(500).send({ message: "internal server error" });
        });
    }
  });
});
////////////Books get data////////////////
app.get("/books/:uid", async (req, res) => {
  try {
    let data = await bookModel.find({ uid: req.params.uid }).exec();
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: "error getting data" });
  }
});
///////////book update//////////////
app.put("/book/:cid", async (req, res) => {
  const update = {};

  if (req.body.bookName) update.bookName = req.body.bookName;
  if (req.body.author) update.author = req.body.author;
  if (req.body.category) update.category = req.body.category;
  if (req.body.locationRack) update.locationRack = req.body.locationRack;
  if (req.body.bookIsbnNumber) update.bookIsbnNumber = req.body.bookIsbnNumber;
  if (req.body.bookCopy) update.bookCopy = req.body.bookCopy;
  update.updatedAt = Date.now();

  try {
    const updated = await bookModel
      .findOneAndUpdate({ _id: req.params.cid }, update, { new: true })
      .exec();

    res.send({
      message: "book updated successfuly",
      book: updated,
    });
  } catch (error) {
    res.status(500).send({
      message: "faild to upadated",
    });
  }
});
////////////location post////////////////
app.post("/locationRack", (req, res) => {
  let body = req.body;

  locationRackModel.findOne({ email: body.email }, (err, author) => {
    if (!err) {
      locationRackModel
        .create({
          locationRackName: body.locationRackName,
          uid: body.uid,
        })
        .then((resss) => {
          res.status(200).send({ message: "location Rack is created" });
        })
        .catch((err) => {
          console.log(err, "err");
          res.status(500).send({ message: "internal server error" });
        });
    }
  });
});
////////////location getdata////////////////
app.get("/locationRacks/:uid", async (req, res) => {
  try {
    let data = await locationRackModel.find({ uid: req.params.uid }).exec();
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: "error getting data" });
  }
});
///////////location update//////////////
app.put("/locationRack/:cid", async (req, res) => {
  const update = {};

  if (req.body.locationRackName)
    update.locationRackName = req.body.locationRackName;
  update.updatedAt = Date.now();

  try {
    const updated = await locationRackModel
      .findOneAndUpdate({ _id: req.params.cid }, update, { new: true })
      .exec();

    res.send({
      message: "Location Rack updated successfuly",
      author: updated,
    });
  } catch (error) {
    res.status(500).send({
      message: "faild to upadated",
    });
  }
});
////////////author post////////////////
app.post("/author", (req, res) => {
  let body = req.body;

  authorModel.findOne({ email: body.email }, (err, author) => {
    if (!err) {
      authorModel
        .create({
          authorName: body.authorName,
          uid: body.uid,
        })
        .then((resss) => {
          res.status(200).send({ message: "Author is created" });
        })
        .catch((err) => {
          console.log(err, "err");
          res.status(500).send({ message: "internal server error" });
        });
    }
  });
});
////////////category getdata////////////////
app.get("/authors/:uid", async (req, res) => {
  try {
    let data = await authorModel.find({ uid: req.params.uid }).exec();
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: "error getting data" });
  }
});
///////////categoryupdate//////////////
app.put("/author/:cid", async (req, res) => {
  const update = {};

  if (req.body.authorName) update.authorName = req.body.authorName;
  update.updatedAt = Date.now();

  try {
    const updated = await authorModel
      .findOneAndUpdate({ _id: req.params.cid }, update, { new: true })
      .exec();

    res.send({
      message: "author updated successfuly",
      author: updated,
    });
  } catch (error) {
    res.status(500).send({
      message: "faild to upadate author",
    });
  }
});
////////////category////////////////
app.post("/category", (req, res) => {
  let body = req.body;

  categoryModel.findOne({ email: body.email }, (err, library) => {
    if (!err) {
      categoryModel
        .create({
          categoryName: body.categoryName,
          uid: body.uid,
        })
        .then((resss) => {
          res.status(200).send({ message: "category is created" });
        })
        .catch((err) => {
          console.log(err, "err");
          res.status(500).send({ message: "internal server error" });
        });
    }
  });
});
////////////category getdata////////////////
app.get("/categorys/:uid", async (req, res) => {
  try {
    let data = await categoryModel.find({ uid: req.params.uid }).exec();
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: "error getting categorydata" });
  }
});
///////////categoryupdate//////////////
app.put("/category/:cid", async (req, res) => {
  const update = {};

  if (req.body.categoryName) update.categoryName = req.body.categoryName;
  update.updatedAt = Date.now();

  try {
    const updated = await categoryModel
      .findOneAndUpdate({ _id: req.params.cid }, update, { new: true })
      .exec();

    res.send({
      message: "category updated successfuly",
      category: updated,
    });
  } catch (error) {
    res.status(500).send({
      message: "faild to upadate category",
    });
  }
});

///////////library setting/////////////
app.post("/setting", (req, res) => {
  let body = req.body;

  libraryModel.findOne({ email: body.email }, (err, library) => {
    if (!err) {
      libraryModel
        .create({
          libraryName: body.libraryName,
          address: body.address,
          contactNo: body.contactNo,
          emailaddress: body.emailaddress.toLowerCase(),
          bookReturnDayLimit: body.bookReturnDayLimit,
          bookLateReturnOneDayFine: body.bookLateReturnOneDayFine,
          perUserBookIssueLimit: body.perUserBookIssueLimit,
          currency: body.currency,
          timezone: body.timezone,
          uid: body.uid,
        })
        .then((resss) => {
          res.status(200).send({ message: "library is created" });
        })
        .catch((err) => {
          console.log(err, "err");
          res.status(500).send({ message: "internal server error" });
        });
    }
  });
});
///////////library get setting/////////////
app.get("/settings/:uid", async (req, res) => {
  try {
    let data = await libraryModel.findOne({ u_id: req.params.id }).exec();
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: "error getting librarydata" });
  }
});

///////////library update/////////////
app.put("/settings/:uid", async (req, res) => {
  const update = {};
  if (req.body.libraryName) update.libraryName = req.body.libraryName;
  if (req.body.address) update.address = req.body.address;
  if (req.body.contactNo) update.contactNo = req.body.contactNo;
  if (req.body.emailaddress) update.emailaddress = req.body.emailaddress;
  if (req.body.currency) update.currency = req.body.currency;
  if (req.body.timezone) update.timezone = req.body.timezone;
  if (req.body.bookReturnDayLimit)
    update.bookReturnDayLimit = req.body.bookReturnDayLimit;
  if (req.body.bookLateReturnOneDayFine)
    update.bookLateReturnOneDayFine = req.body.bookLateReturnOneDayFine;
  if (req.body.perUserBookIssueLimit)
    update.perUserBookIssueLimit = req.body.perUserBookIssueLimit;

  try {
    const updated = await libraryModel
      .findOneAndUpdate({ u_id: req.params.id }, update, { new: true })
      .exec();

    res.send({
      message: "library updated successfuly",
      library: updated,
    });
  } catch (error) {
    res.status(500).send({
      message: "faild to upadate library",
    });
  }
});
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
  update.updatedAt = Date.now();

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

///////////user profile////////////////
app.get("/userdata:uid", async (req, res) => {
  try {
    let user = await userModel.find({ uid: req?.params?.uid }).exec();
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
