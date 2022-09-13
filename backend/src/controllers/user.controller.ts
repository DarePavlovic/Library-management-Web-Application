import express from 'express'
import UserModel from '../models/User'



export class UserController{
    login = (req:express.Request, res:express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;

        UserModel.findOne({'username':username, 'password':password}, (err,user)=>{
            if(err)console.log(err)
            else res.json(user);
        })
    }

    register = (req:express.Request, res:express.Response)=>{
        
        let user = new UserModel({
            firstname:req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: req.body.password,
            address : req.body.address,
            phone_number : req.body.phone_number,
            email : req.body.email,
            picture: req.body.picture,
            //'picture' : typeof req.body.picture !== 'undefined' ? req.body.picture : 'profile_default.jpg',
            type:"reader"
            
        })

        user.save((err,resp)=>{
            
            if(err){
                console.log(err);
                res.status(400).json({'message':'error'});
            }
            else{ res.json({"message":"ok"})}
        })

    }


    getUser = (req:express.Request, res:express.Response)=>{
        let username = req.body.username;
        UserModel.findOne({'username':username},(err, user)=>{
            if(err)console.log(err);
            else res.json(user);
        })
    }

    getEmail = (req:express.Request, res:express.Response)=>{
        
        let username = req.body.username;
        let email = req.body.email;

        UserModel.findOne({'username':username,'email':email},(err, user)=>{
            if(err)console.log(err);
            else res.json(user);
        })
    }

    getPassword = (req:express.Request, res:express.Response)=>{
        
        let username = req.body.username;
        let password = req.body.password;

        UserModel.findOne({'username':username,'password':password},(err, user)=>{
            if(err)console.log(err);
            else res.json(user);
        })
    }

    changePassword = (req:express.Request, res:express.Response)=>{
        
        let username = req.body.username;
        let password = req.body.password;

        UserModel.updateOne({'username':username}, {$set:{'password':password}}, (err, resp)=>{
            if(err) console.log(err);
            else{
                res.json({'message':'ok'})
            }
        })
    }

    delete = (req:express.Request, res:express.Response)=>{
        let username = req.body.username;
        
        UserModel.deleteOne({'username':username},(err,resp)=>{
            if(err)console.log(err);
            else res.json({'message':'ok'});
        })
    }

    getAllUsers = (req:express.Request, res:express.Response)=>{
        UserModel.find({},(err, users)=>{
            if(err)console.log(err);
            else res.json(users);
        })
    }
}