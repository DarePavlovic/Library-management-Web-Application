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
            picture : req.body.picture
            
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
}