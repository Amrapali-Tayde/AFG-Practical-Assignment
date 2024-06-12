const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userModel = require('./model/user.js');
const bcrypt = require('bcrypt');
//import * as bcrypt from 'bcrypt';
var jwt = require('jsonwebtoken');
// const privateKey = "hghgyt56556";
// const saltRounds = 10;


const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


const dburl = "mongodb+srv://amrapaliTayde:9DQQTiHWGOOJsa4V@cluster1.2egdeuv.mongodb.net/User_Authentication?retryWrites=true&w=majority&appName=Cluster1";    //103.219.165.137/32
mongoose.connect(dburl)
    .then(() => {
        console.log("connected successfully");
    })
    .catch((error) => {
        console.log(error);
    })

app.get("/getURL", (req, res) => {
    res.json({ "users": ["user1", "user2", "user3"] });
});


app.post("/api/login", async (req, res) => {
    const { email, password, recaptoken } = req.body;

    console.log(req.body);
    
    // if (!recaptoken) {
    //     return res.status(400).json({ success: false, message: 'No token provided' });
    //   }
    
    //   const secretKey = process.env.GOOGLE_RECAPTCHA_SITE_KEY;
    //   const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptoken}`;
    
    //   try {
    //     const response = await axios.post(verificationUrl);
    //     const data = response.data;
    
    //     if (data.success && data.score > 0.5) {
    //     //  return res.json({ success: true });
    //       console.log("recaptcha success:", true);
    //     } else {
    //       console.log({ success: false, message: 'reCAPTCHA verification failed', score: data.score });
          
    //     }
    //   } catch (error) {
    //    // return res.status(500).json({ success: false, message: 'Server error' });
    //    console.log(error);
    //   };

    const user = await userModel.findOne({ email: email });
    // console.log(user);

    const usermodel = user.toObject();
    delete usermodel.password;

    console.log("usermodel:", usermodel);


    if (!user) {
        res.json({ "status": 404, "message": "User does not exists" });
        return;
    }

    const isPwdMatch = await bcrypt.compare(password, user.password);

    console.log("isPwdMatch:", isPwdMatch);

    if (isPwdMatch === true) {

        var token = jwt.sign({ email }, privateKey);
        // res.json({ "status": 200, "message": "Logged In successfully!" });
        res.json({ success: true, message: "Logged In successfully!", responsecode: 200, data: { token } });
    }
    else {
        //res.json({ "status": 404, "message": "Invalid Password" });
        res.json({ success: false, message: "Invalid credentials!", responsecode: 401 });
    }
});

app.post("/api/signup", async (req, res) => {
    // console.log(req.body);
    // res.json({"message": "signup working" , "Posted_data": req.body});
    // validate inputs 

    const { firstName, lastName, email, dob, countryCode, mobile, password } = req.body;

    let errors = [];

    if (!firstName) {
        errors.push('Please enter First Name.');

    }

    if (!lastName) {
        errors.push('Please enter Last Name.');

    }

    if (!email) {
        errors.push('Please enter Email Id!');

    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.push('Please enter a valid email.');

    }

    if (!dob) {
        errors.push('Please enter Date of Birth.');

    }

    if (!countryCode) {
        errors.push('Please enter Country Code.');

    }

    if (!mobile) {
        errors.push('Please enter Mobile Number.');

    }

    if (!password) {
        errors.push('Please enter password.');

    }

    if (password.length < 6) {
        errors.push('Password must be atleast 6 characters.');

    }

    const errorString = errors.reduce((preVal, curVal) => (preVal != "" ? preVal + ', ' : '') + curVal, '');
    console.log(errorString);

    if (errors.length > 0) {
        res.json({ success: false, message: errorString, responsecode: 153 });
        return;
    }

    const hashedPwd = await bcrypt.hash(password, saltRounds);
    const user = { firstName, lastName, email, dob, countryCode, mobile, password: hashedPwd };

    const dbUser = await userModel.create(user);
    const userModel = dbUser.toObject();
    delete userModel.password;

    res.json({ success: true, message: '', responsecode: 0, data: userModel });
    //res.json(userModel); 
});


app.get("/api/profile", async (req, res) => {

    console.log("req.headers: ", req.headers);

    const token = req.headers["authorization"];
    console.log("token: ", token);

    try {
        var decoded = jwt.verify(token, privateKey);
        console.log("decoded: ", decoded);

        const user = await userModel.findOne({ email: decoded.email });
        // console.log(user);

        if (!user) {
            res.json({ success: false, message: "User does not exists!", responsecode: 401 });
            return;
        }
        const usermodel = user.toObject();
        delete usermodel.password;

        console.log("usermodel:", usermodel);
        res.json({ success: true, message: "Profile sent successfully!", responsecode: 200, data: { profile: usermodel } });

    } catch (err) {        
        res.json({ success: false, message: "Toekn Mismatched!", responsecode: 401 });
    }
});


app.listen("5000", () => {
    console.log('Server is running on port: 5000');
})   