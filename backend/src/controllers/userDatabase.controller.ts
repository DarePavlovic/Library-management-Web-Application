import express from 'express'
import UserDatabase from '../models/UserDatabase';



export class UserDatabaseController{

    login = (req:express.Request, res:express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;

        UserDatabase.findOne({'username':username, 'password':password}, (err,user)=>{
            if(err)console.log(err)
            else res.json(user);
        })
    }

    register = (req:express.Request, res:express.Response)=>{
        
        let user = new UserDatabase({
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
        UserDatabase.findOne({'username':username},(err, user)=>{
            if(err)console.log(err);
            else res.json(user);
        })
    }

    getEmail = (req:express.Request, res:express.Response)=>{
        
        let username = req.body.username;
        let email = req.body.email;

        UserDatabase.findOne({'username':username,'email':email},(err, user)=>{
            if(err)console.log(err);
            else res.json(user);
        })
    }

    getPassword = (req:express.Request, res:express.Response)=>{
        
        let username = req.body.username;
        let password = req.body.password;

        UserDatabase.findOne({'username':username,'password':password},(err, user)=>{
            if(err)console.log(err);
            else res.json(user);
        })
    }

    changePassword = (req:express.Request, res:express.Response)=>{
        
        let username = req.body.username;
        let password = req.body.password;

        UserDatabase.updateOne({'username':username}, {$set:{'password':password}}, (err, resp)=>{
            if(err) console.log(err);
            else{
                res.json({'message':'ok'})
            }
        })
    }
    updateProfile = (req:express.Request, res:express.Response)=>{
        
        let firstname=req.body.firstname;
        let lastname= req.body.lastname;
        let username= req.body.username;
        let address = req.body.address;
        let phone_number = req.body.phone_number;
        let email = req.body.email;
        let picture =  req.body.picture;
        let type=req.body.type;

        UserDatabase.updateOne({'username':username}, {$set:{'firstname':firstname, 'lastname':lastname, 'address':address,
    'phone_number':phone_number, 'email':email, 'picture':picture, 'type':type}}, (err, resp)=>{
            if(err) console.log(err);
            else{
                res.json({'message':'ok'})
            }
        })
    }

    delete = (req:express.Request, res:express.Response)=>{
        let username = req.body.username;
        
        UserDatabase.deleteOne({'username':username},(err,resp)=>{
            if(err)console.log(err);
            else res.json({'message':'ok'});
        })
    }

    getAllUsers = (req:express.Request, res:express.Response)=>{
        UserDatabase.find({},(err, users)=>{
            if(err)console.log(err);
            else res.json(users);
        })
        
        
    }

}