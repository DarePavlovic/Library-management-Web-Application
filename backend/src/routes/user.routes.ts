import express from 'express'
import mongoose from 'mongoose';
import { UserController } from '../controllers/user.controller';


// const multer = require('multer');
// const storage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null, '../frontend/src/assets/');
//     },
//     filename: function(req, file, cb){
//         if(file){
//             let extension = "." + file.originalname.split(".")[1]
//             console.log(extension);
//             req.body.picture = "profile_" + req.body.id + extension;
//         }
//         cb(null,req.body.picture);
//     }
// });

// const fileFilter = (req, file, cb)=>{
//     //reject file
//     if(file.mimetype ==='image/jpeg'||file.mimetype ==='image/jpg'||file.mimetype ==='image/png'){
//         cb(null, true);
//     }
//     else{
//         cb(null, false);
//     }
    
//  }
// const upload = multer({storage: storage});


const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res)=> new UserController().login(req, res)
)

userRouter.route('/register').post(//upload.single('profilePicture'),
    (req,res)=> new UserController().register(req,res)
)

userRouter.route('/getUser').post(
    (req,res)=>new UserController().getUser(req,res)
)

userRouter.route('/search').post(

)

userRouter.route('/getEmail').post(
    (req,res)=>new UserController().getEmail(req,res)
)

userRouter.route('/getPassword').post(
    (req,res)=>new UserController().getPassword(req,res)
)
userRouter.route('/changePassword').post(
    (req,res)=>new UserController().changePassword(req,res)
)
userRouter.route('/deleteUser').post(
    (req,res)=>new UserController().delete(req,res)
)

userRouter.route('/getAllUsers').get(
    (req,res)=>new UserController().getAllUsers(req,res)
)




export default userRouter;