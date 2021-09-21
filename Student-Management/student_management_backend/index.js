const path = require('path');
const express = require("express");
const bodyparser = require("body-parser");
const cors = require('cors');
const mysql = require('mysql2');
const multer  = require('multer');
const dotenv = require('dotenv');
dotenv.config({path: '.env'});

const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//static files
app.use(express.static(path.join(__dirname, 'public')));

//datbase connection
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT
});

//test the connection
db.connect(function (err) {
    if (err) throw err;
    return console.log("Connected to DB...");
});

//Get all data
app.get('/user',(req, res)=> {
    const { total } = req.query;
    let qr;
    if (total) {
        qr = 'SELECT * FROM student';
    } else {
        qr = 'SELECT * FROM student WHERE status = "Active"';
    }
    db.query(qr,(err,result)=> {
        if(err){
            console.log(err,"errors");
        }
        if(result.length>0) {
            res.send({
                message:'all user data',
                data:result
            });
        }
    });
});

//get single data
app.get('/user/:studentId',(req, res) => {
    let studentId = req.params.studentId;
    let qr = `SELECT * FROM student WHERE studentId = ${studentId}`;
    db.query(qr,(err,result)=> {
        if(err){
            console.log(err,"errors");
        }
        if(result.length>0) {
            res.send({
                message:'get single data',
                data:result
            });
        } else {
            res.send({
                message:'data not found'
            })
        }
    });
});

/*----- Image Upload using Multer -----*/
const Storage = multer.diskStorage ({
    destination:"./public/uploaded_img/",
    filename:(req, file, callBack) => {
        callBack(null, `${Date.now()}_${file.originalname}`);
    }
});

var upload = multer({
    storage:Storage
}).single('photo');

//insert data
app.post('/user',upload, (req, res) => {
    const file = req.file;
    console.log("filename ==> ", file.filename);
    let data = { photo: req.file.filename, firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, phone: req.body.phone, gender: req.body.gender, grade: req.body.grade,  dob: req.body.dob,  address: req.body.address};
    let sql = "INSERT INTO student SET ?";
    let qry = db.query(sql, data, (err, result) => {
        if (err) {console.log(err);};
        console.log(result,'result');
        res.send({
            message:'data inserted'
        })
    });
});

//update data
app.put('/user/:studentId',upload,(req, res) => {
    console.log(req.body,'update data');
    if (req.file) {
        let studentId = req.params.studentId;
        let photo = req.file.filename;
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let email = req.body.email;
        let phone = req.body.phone;
        let gender = req.body.gender;
        let grade = req.body.grade;
        let dob = req.body.dob;
        let address = req.body.address;
        let qry = `UPDATE student SET photo = '${photo}', firstName = '${firstName}', lastName = '${lastName}', email = '${email}', phone = '${phone}', gender = '${gender}', grade = '${grade}', dob = '${dob}', address = '${address}'
            WHERE studentId = '${studentId}'`;
        db.query(qry,(err,result) => {
            if (err) {console.log(err);}
            res.send({
                message:'data updated'
            });
        });
    } else {
        let studentId = req.params.studentId;
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let email = req.body.email;
        let phone = req.body.phone;
        let gender = req.body.gender;
        let grade = req.body.grade;
        let dob = req.body.dob;
        let address = req.body.address;
        let qry = `UPDATE student SET firstName = '${firstName}', lastName = '${lastName}', email = '${email}', phone = '${phone}', gender = '${gender}', grade = '${grade}', dob = '${dob}', address = '${address}'
            WHERE studentId = '${studentId}'`;
        db.query(qry,(err,result) => {
            if (err) {console.log(err);}
            res.send({
                message:'data updated'
            });
        });
    }
});

//deactivate
app.patch('/user/:studentId',(req, res) => {
    console.log(req.body,'update data');
    let studentId = req.params.studentId;
    let qry = `UPDATE student SET status = 'inActive' WHERE studentId = '${studentId}'`;
    db.query(qry,(err,result) => {
        if (err) {console.log(err);}
        res.send({
            message:'Deactivated'
        });
    });
});

//server running status
app.listen(3000,()=> {
    console.log('Server running.. port 3000');
});
