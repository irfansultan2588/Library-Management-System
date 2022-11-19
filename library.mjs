import express, { request } from "express"
import cors from "cors"
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { stringToHash, varifyHash, } from "bcrypt-inzi"
import nodemailer from 'nodemailer';


let dbURI = process.env.MONGODBURI || 'mongodb+srv://abc:abc@cluster0.jqfzaar.mongodb.net/Library-management?retryWrites=true&w=majority';
const SECRET = process.env.SECRET || "topsecret";
const port = process.env.PORT || 5001;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: ['http://localhost:3000', ' https://amizing-events.netlify.app', '*'],
    withCredentials: true,
}));




















app.use(function (req, res, next) {
    console.log("req.cookies: ", req.cookies);

    if (!req.cookies.Token) {
        res.status(401).send({
            message: "include http-only credentials with every request"
        })
        return;
    }
    jwt.verify(req.cookies.Token, SECRET, function (err, decodedData) {
        if (!err) {

            console.log("decodedData: ", decodedData);

            const nowDate = new Date().getTime() / 1000;

            if (decodedData.exp < nowDate) {
                res.status(401).send("token expired")
            } else {
                console.log("token approved");
                req.body.token = decodedData
                next();
            }
        } else {
            res.status(401).send("invalid token")
        }
    });
}),

app.get("/profile", async (req, res) => {


    try {
        let user = await userModel.findOne({ _id: req.body.token_id }).exec();
        res.send(user);

    } catch (error) {
        res.status(500).send({ message: "error getting users" });
    }
})

app.use((req, res) => {
    res.status(404).send('404 not found')
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})




    // /////////////////////////////////////////////////////////////////////////////////////////////////
    mongoose.connect(dbURI);

////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////mongodb connected disconnected events///////////////////////////////////////////////  