"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
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
const userRouter = express_1.default.Router();
userRouter.route('/login').post((req, res) => new user_controller_1.UserController().login(req, res));
userRouter.route('/register').post(//upload.single('profilePicture'),
(req, res) => new user_controller_1.UserController().register(req, res));
userRouter.route('/getUser').post((req, res) => new user_controller_1.UserController().getUser(req, res));
userRouter.route('/search').post();
userRouter.route('/getEmail').post((req, res) => new user_controller_1.UserController().getEmail(req, res));
userRouter.route('/getPassword').post((req, res) => new user_controller_1.UserController().getPassword(req, res));
userRouter.route('/changePassword').post((req, res) => new user_controller_1.UserController().changePassword(req, res));
userRouter.route('/deleteUser').post((req, res) => new user_controller_1.UserController().delete(req, res));
userRouter.route('/getAllUsers').get((req, res) => new user_controller_1.UserController().getAllUsers(req, res));
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map