// const  {PythonShell}= require('python-shell');

//  const funct = (callback) => {
//      PythonShell.run('Gmail.py', null, function (err,res) {
//      if (err){ throw err;  }
//      return callback(res);
//    });
//  }

// //  funct((r)=>{
// //      console.log(r);
// //    // JSON.parse(r[0]);
// //     // console.log(result);
// //  })

// console.log(JSON.parse('[{"id":1},{"id":2}]'));
// module.exports.result = funct;

// const fs = require('fs');

// fs.readFile('sampleEmails.json',(err,res) => {
//   if(err){
//     console.log('error');
//   }else{
//     console.log(JSON.parse(res));
//   }
// })

var s = "'coming on monday' ('on monday', datetime.datetime(2022, 11, 27, 0, 0))";

const pattern = "([0-9]{4}, [0-9]{1,2}, [0-9]{1,2}, [0-9], [0-9])";

const obj = /([0-9]{4}, [0-9]{1,2}, [0-9]{1,2}, [0-9], [0-9])/.exec(s);

var ar = obj[0].split(',');

console.log(ar);

const d = new Date();

console.log(d.getDate());
console.log(d.getMonth()+1);
console.log(d.getFullYear());