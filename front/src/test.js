var redis = require("redis"),
    client = redis.createClient();
const {promisify} = require('util');
const get_users = promisify(client.lrange).bind(client);

client.on("error", function (err) {
    console.log("Error " + err);
});
async function myFunc() {
    const res = await get_users("users", 0,-1);
    return res
}



var x = myFunc()
x.then(data => console.log(data))
client.hget("user:1", "name", (err, replies) => {
    console.log(replies)
})
client.quit();
