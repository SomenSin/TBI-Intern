const express = require('express');
const users = require('./MOCK_DATA.json');
const fs = require('fs')
const app = express();
const PORT = 5000;

//middle ware - plugin
app.use(express.urlencoded({extended: false}));

//ROUTES
app.route('/api/users')
.get((req,res) => {         //get users
    return res.json(users);
})
.post((req,res) => {            //create user
    const body = req.body;
    users.push({ ...body, id: users.length + 1 })
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),()=>{
        return res.json({status: `Successfully create user with id : ${users.length}`});
    } );
})
    

app.route('/api/users/:id')
.get((req,res) => {                 //get specific id
    const id = Number(req.params.id);
    const user = users.find((user)=> user.id === id);
    return res.json(user);
})
.patch((req,res) => {                   // update data
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    const updatedUser = { ...users[userIndex], ...req.body };
    users[userIndex] = updatedUser;

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), () => {
        return res.json({ status: `Successfully updated user with id: ${id}` });
    });
})
.delete((req,res) => {              //delect specific user
    const id = Number(req.params.id);   
    const userIndex = users.findIndex((user) => user.id === id);    

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    users.splice(userIndex, 1);

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), () => {
        return res.json({ status: `Successfully deleted user with id: ${id}` });
    });
})


app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})