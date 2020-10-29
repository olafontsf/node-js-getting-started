const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000


const redis = require("redis");
const client = redis.createClient({ 
  host : 'redis-19232.c239.us-east-1-2.ec2.cloud.redislabs.com',
  port : 19232,
  password : 'mopABt6Djh5nOs4GDTdgBYYUbNxZVG8n'
});



const app = express();

  app.use(express.static(path.join(__dirname, 'public')))
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'ejs')
  //app.get('/', (req, res) => res.render('pages/index'))
  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))


  app.get('/', (req, res) => {

    client.hgetall("product:87685", function(err, value) {
      if (err) throw err;
      console.log(value);

      return res.send(value);
    });

  });


  app.get('/products/:productId', (req, res) => {
    //console.log('->' + req.params.productId);
    client.hgetall(req.params.productId, function(err, value) {
      if (err) throw err;
      console.log(value);

      return res.send(value);
    });
  });


  client.on("error", function(error) {
    console.error('->' + error);
  });

 
  

  function foo(){

  }