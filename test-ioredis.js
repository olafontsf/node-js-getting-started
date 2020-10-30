const Redis = require("ioredis");


// const redis = new Redis({
//     port: 19232, // Redis port
//     host: "redis-19232.c239.us-east-1-2.ec2.cloud.redislabs.com", // Redis host
//     password: "mopABt6Djh5nOs4GDTdgBYYUbNxZVG8n"
//   });


  const redis = new Redis({
    port: 6379,
    host: "localhost"
  });
 
// ioredis supports the node.js callback style


// for(var i=0; i<2; i++){

//     redis.hgetall("owen", function (err, result) {
//         if (err) {
//         console.error(err);
//         } else {
//         console.log(result); // Promise resolves to "bar"
//         }
//     });

// }

// create a list

//redis.hset("myhash2", "field1", "Hello", "field2", "Hello2", "field3", "Hello3");

var setVal = []
for(var i=0; i<10; i++){
    setVal.push(i)
    setVal.push('attr:' + i)
    
}

console.log(setVal)

//redis.zadd("set3", setVal);

//redis.zadd("sortedSet", 1, "one", 2, "dos", 4, "quatro", 3, "three");
//redis.zadd("sortedSet", setVal);

var  vals = []
for(var i=0; i<1000; i++){
    //vals.push('attr:' + i)
    //redis.set("key-"+i, [10]);
    redis.del("key-"+i);
}


