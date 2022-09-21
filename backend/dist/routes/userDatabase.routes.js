"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userDatabase_controller_1 = require("../controllers/userDatabase.controller");
const userDatabaseRouter = express_1.default.Router();
userDatabaseRouter.route('/login').post((req, res) => new userDatabase_controller_1.UserDatabaseController().login(req, res));
userDatabaseRouter.route('/register').post(//upload.single('profilePicture'),
(req, res) => new userDatabase_controller_1.UserDatabaseController().register(req, res));
userDatabaseRouter.route('/getUser').post((req, res) => new userDatabase_controller_1.UserDatabaseController().getUser(req, res));
userDatabaseRouter.route('/setBlocked').post((req, res) => new userDatabase_controller_1.UserDatabaseController().setBlocked(req, res));
userDatabaseRouter.route('/setUnBlocked').post((req, res) => new userDatabase_controller_1.UserDatabaseController().setUnBlocked(req, res));
userDatabaseRouter.route('/getBlocked').post((req, res) => new userDatabase_controller_1.UserDatabaseController().getBlocked(req, res));
userDatabaseRouter.route('/getEmail').post((req, res) => new userDatabase_controller_1.UserDatabaseController().getEmail(req, res));
userDatabaseRouter.route('/getPassword').post((req, res) => new userDatabase_controller_1.UserDatabaseController().getPassword(req, res));
userDatabaseRouter.route('/changePassword').post((req, res) => new userDatabase_controller_1.UserDatabaseController().changePassword(req, res));
userDatabaseRouter.route('/delete').post((req, res) => new userDatabase_controller_1.UserDatabaseController().delete(req, res));
userDatabaseRouter.route('/getAllUsers').get((req, res) => new userDatabase_controller_1.UserDatabaseController().getAllUsers(req, res));
userDatabaseRouter.route('/updateProfile').post((req, res) => new userDatabase_controller_1.UserDatabaseController().updateProfile(req, res));
userDatabaseRouter.route('/updateDays').post((req, res) => new userDatabase_controller_1.UserDatabaseController().updateDays(req, res));
exports.default = userDatabaseRouter;
//# sourceMappingURL=userDatabase.routes.js.map