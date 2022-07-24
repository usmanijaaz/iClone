//mongodb+srv://iclone:<password>@cluster0.sofde.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const connection_String = "mongodb+srv://iclonee:iclonee@cluster0.knt8n.mongodb.net/iclone?retryWrites=true&w=majority";
const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 3001;
const cors = require("cors");
app.use(cors());
const  {PythonShell}= require('python-shell');
const file = require('fs');


//const NodeGmailGetter = require('./gmailnode');

const connecttoMongo = () => {
    mongoose.connect(
        connection_String,
        { useNewUrlParser : true, useUnifiedTopology: true},
        (err) =>  {
            if(err){
               console.log(err);
            //console.log('error aagya haha');

            }
            else{
            console.log("connection established succesfully");
            }
        }
    )

};


var schema = mongoose.Schema;

var UserSchema = new schema({
    FirstName: String,
    LastName: String,
    email: String,
    password : String
})
var EventSchema = new schema({
    From: String,
    Date: String,
    Imperative: String,
    Events : String
})

var userDetail = mongoose.model('userDetail',UserSchema);
var EventDetail = mongoose.model('eventDetail',EventSchema);


const addUser = async (user) =>{
    
    var usertoAdd = new userDetail({FirstName:user.fnam,LastName:user.lnam,email:user.em,password:user.pass});

    userDetail.insertMany([usertoAdd],(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log('user Signed up');
        }
    })

}

const addEvent = async (user) =>{
    console.log('adding eveent');
    
    var eventtoAdd = new EventDetail({From:user.From,Date:user.Date,Imperative:user.Imperative,Events:user.Events});

    EventDetail.insertMany([eventtoAdd],(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log('event added');
        }
    })

}


//////////////////////////SERVER CODE//////////////////////////////////////////////////////
const Joi = require('joi');
const req = require("express/lib/request");


app.listen(PORT, () => { 
    console.log("Successfully started server at: " + PORT);
    connecttoMongo();

});

app.get('/',(req,res)=>{
    console.log('hehehe');
    res.send([1,2,4]);
})


app.post('/login',async (req,res) => {
    console.log('hit login');
    console.log(req.body);
    var result = await userDetail.find({email:req.body.user,password:req.body.pass}).exec();
    console.log(result);
     if(result.length > 0)
         res.json({cred:'valid'});
     else
        res.json({cred:'invalid'});
     
})
const funstrtodict = async (strlist,dictlist) => {
strlist.forEach(async (element) => {
    let res1 = await JSON.parse(element);
    dictlist.push(res1)
});

}
const funct2 = (callback) => {
    PythonShell.run('Gmail.py', null, function (err,res) {
    if (err){ throw err;  }
    //console.log(res);
    return callback(res);
  });
}

const funct1 = (callback) => {
    PythonShell.run('getemailss.py', null, function (err,res) {
    if (err){ throw err;  }
    //console.log(res);
    return callback(res);
  });
}

app.get('/authorize', (req,resp) => {
    console.log('hit');
   file.readFile('token.json',async (err,res)=>{
       if(err){
        funct2((r)=>{
           resp.json({'status':'linked'});
           });
       }else{
        resp.json({'status':'linked'});
       }
   })
    
    
})  
app.get('/unauthorize', (req,resp) => {
    console.log('hit');
   file.readFile('token.json',async (err,res)=>{
       if(err){
        resp.json({'status':'unlinked'});
       }else{
           file.unlink('token.json',(err,res)=>{
               resp.json({'status':'unlinked'});
           })
       }
   })
    
    
})   

const getDataBase  = async () => {
    console.log("in");
    const all = await  EventDetail.find();
    //console.log(all);
    
    console.log("out");
    return all;
}

//getDataBase();

const checkExistence = async (item) =>{
    const r = await EventDetail.find({Imperative: item.Imperative});
    if(r.length > 0){
        return true;
    }
    return false;

}

app.get('/auth', (req,resp) => {
    console.log('hitt auth');
    funct1(async (res)=>{
        var dict = [];
        await funstrtodict(res,dict);
        console.log(res);
        var resultt = await checkExistence(dict[0]);
        if(resultt == false){
            await addEvent(dict[0]);
        }
        var database = await getDataBase();
        console.log(database);
        //console.log(dict);
        resp.send(database);

       });
    
});

app.post('/delPast', async (req,res)=>{
    var dt = await getDataBase();
    console.log("into deleting past");
    console.log(dt);
    const artosend = [];
    if(dt.length > 0){
        dt.forEach(async (item)=>{
            if(item.Events != 'null'){
                const obj = /([0-9]{4}, [0-9]{1,2}, [0-9]{1,2}, [0-9], [0-9])/.exec(item.Events);
                console.log(obj);
                if(obj != 'null'){
                    var ar = obj[0].split(',');
                    const d = new Date();
                    if(parseInt(ar[0]) < d.getFullYear() || parseInt(ar[1]) < d.getMonth()+1 || parseInt(ar[2]) < d.getDate()){
                        artosend.push(item);
                    }
                }
            }
        })
    }
    //console.log(artosend);
    res.send(artosend);

})

app.get('/pastevent',async (req,res)=>{
    var dt = await getDataBase();
    console.log("datttttttttta");
    console.log(dt);
    const artosend = [];
    if(dt.length > 0){
        dt.forEach((item)=>{
            if(item.Events != 'null'){
                const obj = /([0-9]{4}, [0-9]{1,2}, [0-9]{1,2}, [0-9], [0-9])/.exec(item.Events);
                console.log(obj);
                if(obj != 'null'){
                    var ar = obj[0].split(',');
                    const d = new Date();
                    if(parseInt(ar[0]) < d.getFullYear() || parseInt(ar[1]) < d.getMonth()+1 || parseInt(ar[2]) < d.getDate()){
                        artosend.push(item);
                    }
                }
            }
        })
    }
    //console.log(artosend);
    res.send(artosend);
})

var count = 0;
var arr = []
app.get('/test',(req,res)=>{
    arr.push(count);
    count++;
    res.send(arr);

})


var schemaSignUp = Joi.object().keys( {
    fname: Joi.string().max(30).required(),
    lname: Joi.string().max(30).required(),
    email : Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    confirmpassword: Joi.string().required().valid(Joi.ref('password'))
})

function validateSignUp(data){
    const res = schemaSignUp.validate({
        fname: data.fnam,
        lname: data.lnam,
        email: data.em,
        password: data.pass,
        confirmpassword: data.cpas
    });
  if(res.error){ 
    console.log(res.error.details[0]['message']);
    console.log(res.value);
}
  else 
  {
      console.log(res.value);
      console.log(res.error); 
}
return res;
}


app.post('/signup',async (req,res) => {
    console.log('hittt');
    var result = validateSignUp(req.body);
    if(result.error){
        d = {'resultgen': result.error.details[0]['message']};
        res.json(d);
    }
    else{
    var result = await userDetail.find({email:req.body.em}).exec();
    console.log(result);
     if(result.length > 0)
         res.json({'resultgen':'user already exist'});
     else{
         addUser(req.body);
        res.json({'resultgen':'SignedUp'});
     }
    }

})