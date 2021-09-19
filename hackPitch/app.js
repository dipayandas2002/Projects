const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const axios = require("axios")
let mess = []

axios.get('https://sheetdb.io/api/v1/d3veuvq5sboae')
  .then(function (response) {
      console.log(response.data);
      mess = response.data;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })




const mongoose = require('mongoose');
const { render } = require('ejs');
mongoose.connect("mongodb+srv://dipu:dipayandas2002@cluster0.74p0f.mongodb.net/originalDB", { useNewUrlParser: true, useUnifiedTopology: true });
const newSchema = new mongoose.Schema({
    id: Number,
    firstname: String,
    lastname:String ,
    email: String,
    countryCode: String,
    phone:String,
    jobtitle: String,
    password: String,
    passwordConfirmation: String

})
const Form = new mongoose.model('Form', newSchema);

const app = express();

app.listen(process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

app.get('/login', function (req, res) {
    res.render("login");


})

app.get('/register', function (req, res) {
    res.render("register",{issue : ""});


})

//my style of filter

app.post("/", function (req, res) {



    // newperson.save();

    //filter

    // Form.find({}, (err, data) => {
    //     // console.log(data); //fetching all the data
    //     if (req.body.filter === "on") {

    //         res.render("submit", { array : data , filter : "on" });
    //     }
    //     else res.send("no filter")
    // })

    //  console.log(req.body)

    // Form.findOne({name : "dipu"}, (err, data)=>{
    //     if (data.email === "dipayandas360@gmail.com") {
    //         res.send("verified")
    //     }
    //     else res.send(data.email)


    // })


    bcrypt.hash(req.body.name, saltRounds).then(function (hash) {
        //    console.log(hash); //hashed password
        let newperson = new Form({
            name: hash,
            email: req.body.email
        })

        newperson.save();
        render.redirect("/login")
    });


    //login route


    // Form.findOne({ name: req.body.name }, (err, data) => {
    //     if (data !== null) {
    //         bcrypt.compare(req.body.name, data.name).then(function(result) {
    //            if(result == true){
    //                res.send("password matched")
    //            }
    //         });

    //     }
    //     else res.send("ok")

    // })


})


// filter copied from net

app.use('/items', (req, res) => {
    const filters = req.query;
    const filteredUsers = data.filter(user => {
        let isValid = true;
        for (key in filters) {
            console.log(key, user[key], filters[key]);
            isValid = isValid && user[key] == filters[key];
        }
        return isValid;
    });
    res.send(filteredUsers);
});



app.post('/register',(req,res)=>{
    console.log(req.body);
    
    if (req.body.password === req.body.passwordConfirmation ) {
        
        bcrypt.hash(req.body.password, saltRounds).then(function (hash) {
            //    console.log(hash); //hashed password
            let newperson = new Form({
                firstname: req.body.firstname,
                lastname:req.body.lastname ,
                email: req.body.email,
                countryCode: req.body.countryCode,
                phone: req.body.phone,
                jobtitle: req.body.jobtitle,
                password: hash,
                passwordConfirmation: req.body.passwordConfirmation
              })
    
            newperson.save();
        });
        // res.send("akdm ok ache");
        res.render("login")
    }
    else {
        res.render("register", {issue : "passwords are not same"})
    }
})

app.post("/login",(req,res)=>{

    Form.findOne({ firstname: req.body.name }, (err, data) => {
        if (data !== null) {
            bcrypt.compare(req.body.password, data.password).then(function(result) {
               if(result === true){
                //    res.send(data) //rendering the data
                // console.log(mess);
                
                res.render("index",{mess : mess})
               }
            });

        }
        else res.send("no user exists")
        // console.log(data);
    })

})



app.post("/index",(req,res)=>{

    // console.log(req.body);
   let {gender,parking,food,occupancy} = req.body
   
   let newfilter = mess.filter((element,index)=>{
        let {Gender,Parking,Food,Occupancy} = element

        

       if (( food === "none" || food === Food ) &&  ( gender === "none" || gender === Gender ) && ( parking === "none" || parking === Parking )  && ( occupancy === "none" || occupancy === Occupancy )){
           return true;
       };
        

    });

    if (req.body.sort === "price") {
        newfilter.sort((a, b) => {
            return a.Price - b.Price;
        });
    }
    else if(req.body.sort === "rating"){
        newfilter.sort((a, b) => {
            return b.Rating - a.Rating;
        });
    }

    // res.send(req.body)
    res.render('index',{mess:newfilter})

})