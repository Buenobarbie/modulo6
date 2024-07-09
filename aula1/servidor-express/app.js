// Importing express module
const express = require('express')
  
// Importing NodeCache and creating a 
// new object called myCache
const NodeCache = require('node-cache')
const myCache = new NodeCache()
    
// Creating an express object
const app = express()
    
// Starting server using listen
// function on port 8000
app.listen(8000, err => { 
   if(err) 
        console.log("Error while starting server")
   else
        console.log(
        "Server has been started at port 8000")
})
  
app.get('/', (req, res)=>{
  
    res.send('Home page !')
})
  
// Function to demonstrate heavy computation
// like API requests, database queries, etc.
function heavyComputation(){
     let temp = 0;
     for(let i=0; i<100000000; i++)
          temp = (Math.random()*5342)%i;
     return 123;
}

  
app.get('/api', (req, res)=>{
      
     // If cache has key, retrieve value
     // from cache itself
     if(myCache.has('ResultadoOp')){
          console.log('Retrieved value from cache !!')
            
          // Serve response from cache using
          // myCache.get(key)
          res.send("Result: " + myCache.get('ResultadoOp'))
     }else{
  
          // Perform operation, since cache 
          // doesn't have key
          let result =  heavyComputation()
          
          // Set value for same key, in order to 
          // serve future requests efficiently
          myCache.set('ResultadoOp', result)
            
          console.log('Value not present in cache,'
                + ' performing computation')
          res.send("Result: " + result)
     }
})
// const express = require("express")
// const NodeCache = require( "node-cache" );
// const myCache = new NodeCache();

// const app = express();
// app.use(express.json());
// const port = 3000;

// const users = ["Bárbara", "Giovanna", "Guilherme"]

// obj = { my: "Special", variable: 42 };
 
// success = myCache.set( "myKey", obj, 10000 );

// //Rotas
// app.get("/", (req, res) => {
//     console.log("Servidor foi chamado");
//     res.send("hello world")
// })

// app.get("/users", (req, res) => {
//     console.log("Servidor foi chamado em user");
//     res.json(req.body);
// })

// app.post('/users', (req, res) => {
   
//     if (!req.body || !Object.keys(req.body).length) {
//       return res.status(404).json({ errormessage: "Aluna não enviada no corpo da requisição." });
//     }
  
//     const novaAluna = req.body;
  
//     if (!novaAluna.idade || !novaAluna.username) {
//       return res.status(400).json({ errormessage: "Alguns campos obrigatórios não foram enviados." })
//     }
  
//     alunos.push(novaAluna);
//     res.json(novaAluna)
//   });

// //Servidor ouvindo
// app.listen(port, () => {
//     console.log("app running");
// })
