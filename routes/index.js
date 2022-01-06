var express = require('express');
var router = express.Router();
var db = require("../db");


router.post("/login",async function(req,res){
var {username,password} = req.body;
  await db.login(username,password);
req.session.username = username;
res.redirect('/homePage');
});


router.post("/insert",async function(req,res){
  var item = { //extract parameters (from forms input)
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  }
    await db.register(item.firstname,item.lastname,item.email,item.username, item.password);
  req.session.username = item.username;
  console.log('User Info Inserted');
  res.redirect('/login');
  });
  

function ensureLoggedIn(req,res,next){
  if(!req.session.username){
    res.redirect('/login');
  } else{
    next();
  }
}

// --------------------Routes---------------------

// bill + tip splitter
router.get('/BillTipSplitter', function(req,res){
  res.render('BillTipSplitter');
});

// tutorial
router.get('/Tutorial', function(req,res){
  res.render('Tutorial');
});

//budget page 
router.get('/budget', function(req,res){
  res.render('budget');
});

//expense-tracker
router.get('/expense-tracker', function(req,res){
  res.render('expense-tracker');
});

// payment-notification and load saved notifications
router.get('/payment-notif', async (req,res) =>{
  var {username} = req.session;
  console.log(username);
  var notif = await db.showNotifs(username);
  res.render('payment-notif', { title: 'Upcoming Payments',notif });
});

// registration
router.get('/registration', function(req,res){
  res.render('registration');
});

// recommendation
router.get('/recommendation', function(req,res){
  res.render('recommendation');
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Money Ωmega' });
});

router.get('/landingPage', function(req,res){
  res.render('landingPage');
});

router.get('/accountProfile', async function(req,res){
  var {username} = req.session;
  console.log(username);
  var info = await db.getUserInfo(username);
  console.log(info);
  res.render('accountProfile', {items:{info}});
});


router.post('/update', async function(req,res){
  var {username} = req.session;
  console.log({username});
  var item = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
  };
  console.log(item);
  await db.updateUserInfo(item.firstname,item.lastname,item.email,username);
  res.redirect('/accountProfile');
});

router.get('/homePage', function(req,res){
  res.render('homePage');
});

//-----------------------------------------------------------------------------------------
router.use(ensureLoggedIn); // have to be logged in to use code below



/* GET home page. */
router.get('/',async function(req, res, next) {
  var {username} = req.session;
  res.render('landingPage');
}); 

router.post('/logout',async function(req,res){
  req.session.username= '';
  res.redirect('/');
});

//router functions for payment-notification page:

// saving and/or deleting new notifications to current username
router.post("/payment-notif",async function(req,res){
  var {title,date,time,save,del} = req.body;
  var {username} = req.session;
  console.log(req.body);
  if(save){
    await db.addNotifs(username,title,date,time);
  }
  if(del){
    await db.deleteNotif(username,del);
  } 
  res.redirect('/payment-notif')
});

// showing saved notifs
router.post("/payment-notif", async function(req,res){
  var {username} = req.session;
  
  if(show){
    await db.showNotifs(username);
  }
});

// deleting existing notifications
router.post("/payment-notif",async function(req,res){
  var {username} = req.session;
  if(req.body.delete){
    await db.deleteListItems(username, req.body.delete);
  } 
  res.redirect('/payment-notif')
});


module.exports = router;
