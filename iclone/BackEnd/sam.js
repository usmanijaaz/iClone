// const file = require("./sample");

// var f = file.result;

// f((res)=>{
//     //console.log(res);
//     print(res);
// })

// function print(tex){
//     console.log('printing from print function');
//     console.log(tex);
// }
const Joi = require('joi');
var schemaSignUp = Joi.object().keys( {
    fname: Joi.string().max(30).required(),
    lname: Joi.string().max(30).required(),
    email : Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    confirmpassword: Joi.string().required().valid(Joi.ref('password'))
})

function validateSignUp(data){
    const res = schemaSignUp.validate({
        fname: data.fname,
        lname: data.lname,
        email: data.email,
        password: data.password,
        confirmpassword: data.confirmpassword
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
}

validateSignUp({fname:'Usman',lname:'',email: 'uijaz@gmail.com',password:'12345678',confirmpassword:'12345678'});