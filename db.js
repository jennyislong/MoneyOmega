var { MongoClient, ConnectionClosedEvent} = require('mongodb');
// want to import mongoclient field from mongo db namespace
var bcrypt = require('bcrypt');
var assert = require('assert');
const { info } = require('console');

var url = 'mongodb+srv://dbUser:zruN2JJmDfrb4mEs@cluster0.ibdil.mongodb.net/cps731?retryWrites=true&w=majority'
var dbName = 'cps731';
var dbNameTest = 'cps731-test';
var testUrl ="mongodb+srv://dbUser:zruN2JJmDfrb4mEs@cluster0.ibdil.mongodb.net/cps731-test?retryWrites=true&w=majority"

// detects if we are in test mode or production mode, 
//if in test mode : we overwrite url to testUrl
if  (process.env.TEST){
   dbName = dbNameTest;
}

var db = null; 
var client = null;
async function connect(){
    if (db == null){
    var options = {
        useUnifiedTopology: true,
    }
    client = await MongoClient.connect(url,options);
    db = await client.db(dbName);
    }
    // in JS async - call method like this, not immediately return
    // this will start connecting, but dont assume it will finish connecting  
    return db;
}
//tells JS to wait for it to connect, and once connected we will be able to use this variable


    async function register(firstname,lastname,email,username,password){
    var conn = await connect();

    var existingUser = await conn.collection('users').findOne({username});
    if (existingUser != null){
        throw new Error('User already exists!');
    }
    var SALT_ROUNDS = 10;
    var passwordHash = await bcrypt.hash(password,SALT_ROUNDS);
    await conn.collection('users').insertOne({username,passwordHash});
    await conn.collection('users').updateOne(
        {username},
        {
            $push: {
                info:{firstname,lastname,email},
            },
        },
        )}    
        
// async function register(firstname,lastname,email,username,password){
//     var conn = await connect();

//     var existingUser = await conn.collection('users').findOne({username});
//     if (existingUser != null){
//         throw new Error('User already exists!');
//     }
//     var SALT_ROUNDS = 10;
//     var passwordHash = await bcrypt.hash(password,SALT_ROUNDS);
//     await conn.collection('users').insertOne(
//         {username,passwordHash,firstname,lastname,email}
//         )}


    //conn.collection('users').insertOne({username,password});
    // insecure way to access password
    //hashing taking the fingerprint of password, using library bcrypt
//register('Jenny','test123')

async function getUserInfo(username){
    var conn = await connect();
    var user = await conn.collection('users').findOne({username});
    return user.info;
}

//----------------------------------------------------------

async function updateUserInfo (firstname,lastname,email,username){
    var conn = await connect();
    await conn.collection('users').updateOne(
        {"username":username},
        {$set: {info:{"firstname":firstname,"lastname":lastname,"email":email},},})
} 

// ------------------------------------------------------------
async function login(username,password){
    var conn = await connect();
    var user = await conn.collection('users').findOne({username});

    if (user == null){
        throw new Error('User does not exist');
    }
    var valid = await bcrypt.compare(password,user.passwordHash);
    //pass in supplied and existing password hash
    //user.passwordHash retrieves the passwordHash from Register function
    //valid is boolean indicating if it matches

    if (!valid){
        throw new Error('Invalid Password');  
    //if (user.password != password){
        //throw new Error('Invalid Password');
        // can no longer use this comparison as we are using bcrypt now
    }
}


// add new payment reminder notifications to database 
async function addNotifs(username,title,date,time){
    var conn = await connect();

    if (title ==null || title ==""){
        throw new Error('Please enter title');
    }
    if (date==null || date == ""){
        throw new Error('Please enter date');
    }
    if (time==null || time == ""){
        throw new Error('Please enter time');
    }
    await conn.collection('users').updateOne(
    {username},
    {
        $push: {
            notifications:{title,date,time},
        },
    },
    )}

//delete saved notifications
async function deleteNotif(username, title,date,time){
    var conn = await connect();
    console.log(title)
    await conn.collection('users').updateOne({username},{ $pull: {notifications:{title},},},) 

}

// show saved notifications from db
async function showNotifs(username){
    var conn = await connect();
    var user = await conn.collection('users').findOne({username});
    console.log(user);
    console.log(username);
    return user.notifications;
}

module.exports = {
    login,
    register,
    getUserInfo,
    updateUserInfo,
    url,
    close,
    addNotifs,
    showNotifs,
    deleteNotif,

}
// makes function accesible from outside the file

async function close(){
    await client.close();
}

// this wipes all the data
async function wipe(){
    var conn = await connect();
    await conn.collection("users").drop();
} // you can also do this for every collections

// this will occur only in the test mode (hence we dont put in module.exports above)
if (process.env.TEST){
    module.exports.wipe = wipe;
}
