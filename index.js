const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000


const redis = require("redis");
const client = redis.createClient({ 
  host : 'redis-19232.c239.us-east-1-2.ec2.cloud.redislabs.com',
  port : 19232,
  password : 'mopABt6Djh5nOs4GDTdgBYYUbNxZVG8n'
});



express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


  client.on("error", function(error) {
    console.error(error);
  });

 
  client.hgetall("product:87685", function(err, value) {
    if (err) throw err;
    console.log(value);
  });

  function foo(){
    
  }