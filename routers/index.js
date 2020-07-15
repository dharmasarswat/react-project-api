const router = require('express').Router();
const User = require('../model/user');

router.get('/getUserData' , (req,res)=>{
    User.find()
        .then(user=> { 
            console.log(user)
            return res.json(user) })
        .catch(err=> { return res.status(400).send(err) })
});

router.post('/addUser' , async (req,res)=>{
    const { firstName , lastName , email , password , status } = req.body
    const user = await new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        status: status
    })

    if(!firstName || !lastName || !email || !password || !status){
        return res.status(400).send('Please Enter All The Fields')
    }

    if(email){
        User.find({email: email}).then(user=>{
            if(user.length){
                return res.status(400).send('Email Already Exists')
            }
        }).catch(err=> { return res.status(500).send(err) })
    }

    await user
        .save()
        .then((user)=>{
            return res.status(200).send('User Added Successfully')
        })
        .catch(err=>{
            return res.status(500).send(err)
        })
})

module.exports = router