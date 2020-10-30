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
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
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
    //console.log('-->' + req.params.productId);

    var date = new Date();

    client.hset(req.params.productId, 'touch', date, function(err, value) {
      if (err) throw err;
      console.log(value);
    });

    client.hgetall(req.params.productId, function(err, value) {
      if (err) throw err;
      console.log(value);

      return res.send(value);
    });


  });

  
  app.post('/products/:productId', (req, res) => {

    var newKey = req.params.productId;
    console.log('newKey: ' + newKey);
    var date = new Date();

    const payload = req.body;

    console.log('payload: ' + payload);
    console.log(payload);

    const params = ['json', date];
    
    for (var item in payload){
      console.log(item + ": " + payload[item])
      params.push(item,payload[item]);
    }

    client.hset(newKey, params, function(err, value) {
      if (err) throw err;
      console.log(value);
    });


    return res.send('POST HTTP method on products resource');
  });



  client.on("error", function(error) {
    console.error('->' + error);
  });

 
  
