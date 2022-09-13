import express from 'express'
import mongoose from 'mongoose';
import { UserDatabaseController } from '../controllers/userDatabase.controller';

const userDatabaseRouter = express.Router();

userDatabaseRouter.route('/login').post(
    (req, res)=> new UserDatabaseController().login(req, res)
)

userDatabaseRouter.route('/register').post(//upload.single('profilePicture'),
    (req,res)=> new UserDatabaseController().register(req,res)
)

userDatabaseRouter.route('/getUser').post(
    (req,res)=>new UserDatabaseController().getUser(req,res)
)

userDatabaseRouter.route('/getEmail').post(
    (req,res)=>new UserDatabaseController().getEmail(req,res)
)

userDatabaseRouter.route('/getPassword').post(
    (req,res)=>new UserDatabaseController().getPassword(req,res)
)
userDatabaseRouter.route('/changePassword').post(
    (req,res)=>new UserDatabaseController().changePassword(req,res)
)

userDatabaseRouter.route('/deleteUser').post(
    (req,res)=>new UserDatabaseController().delete(req,res)
)

userDatabaseRouter.route('/getAllUsers').get(
    (req,res)=>new UserDatabaseController().getAllUsers(req,res)
)


userDatabaseRouter.route('/updateProfile').post(
    (req,res)=>new UserDatabaseController().updateProfile(req,res)
)


export default userDatabaseRouter;