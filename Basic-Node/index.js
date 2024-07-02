const fs = require('fs') // This is CJS(Common JS) way to import

// import fs from 'fs'; - This is EMS(ECMAScript) way to import

// To create the file and put data into it. 
// let data = "Hello Node World!!"
// fs.writeFile('message.txt', data, (err) => {
//   if (err) throw err;
//   console.log('The file has been saved!');
// });

// To read the file
fs.readFile('./message.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
  }); 

  /* Native Node Modules:
  This is example of Native Node Modules. 
  "fs" is one type of node modules.
  */