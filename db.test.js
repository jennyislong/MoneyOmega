/*
test( "hello world", function (){
    //throw new Error("Hello World");
}); */

// import db module, load file in
var db = require("./db");
//right before we run our test, we want to wipe our database
beforeAll (async function()
{
    await db.wipe();
});

afterAll(async function(){
    await db.close();
});

test("registration and login", async function(){
    await db.register("testfirstname","testlastname","testemail","testuserlogin","testpass");
    await db.login("testuserlogin","testpass");
});
// JEST did not exit one sec after test run has completed , 
//this is because there is active code because there is still database connections -- this is why we add wipe() to beforeAll

// this test if someone try to login with an account that does not exist (wrong username)
test("User does not exist", async function(){
    await expect(db.login("fakeUser","testpass")).rejects.toThrow('User does not exist');
});


//this tests if wrong password is  given
//test passes since we already accounted for the error
test("password verification", async function(){
    await db.register("testfirstname","testlastname","testemail","baduser","pass");
    await expect(db.login("baduser","wrongpassword")).rejects.toThrow("Invalid Password");
});

//does not work need to edit
/* TEST IF USER ALREADY EXISTS WHEN REGISTERING
test("user already exists", async function(){
    await db.register("testfirstname","testlastname","testemail","baduser","pass");
   // await expect(db.register("fname","lname","temail","baduser","passwords")).rejects.toThrow("User already exists!");
    await db.register("fname","lname","temail","user","passwords");
});
*/ 

/* This is to test list functions from the lab
test('items',async function(){
    await db.register("firstname","lastname","email","itemuser","pass");
    await db.addListItems("itemuser","dummy1");
    await db.addListItems("itemuser","dummy2");
    await db.addListItems("itemuser","dummy3");
    await db.deleteListItems("itemuser","dummy2");
    var items = await db.getListItems("itemuser");
    var expected = ["dummy1","dummy3"];

    expect(items).toEqual(expect.arrayContaining(expected));
});
*/