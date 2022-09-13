"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDatabaseController = void 0;
const UserDatabase_1 = __importDefault(require("../models/UserDatabase"));
class UserDatabaseController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            UserDatabase_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.register = (req, res) => {
            let user = new UserDatabase_1.default({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                password: req.body.password,
                address: req.body.address,
                phone_number: req.body.phone_number,
                email: req.body.email,
                picture: req.body.picture,
                //'picture' : typeof req.body.picture !== 'undefined' ? req.body.picture : 'profile_default.jpg',
                type: "reader"
            });
            user.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ 'message': 'error' });
                }
                else {
                    res.json({ "message": "ok" });
                }
            });
        };
        this.getUser = (req, res) => {
            let username = req.body.username;
            UserDatabase_1.default.findOne({ 'username': username }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.getEmail = (req, res) => {
            let username = req.body.username;
            let email = req.body.email;
            UserDatabase_1.default.findOne({ 'username': username, 'email': email }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.getPassword = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            UserDatabase_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.changePassword = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            UserDatabase_1.default.updateOne({ 'username': username }, { $set: { 'password': password } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.updateProfile = (req, res) => {
            let firstname = req.body.firstname;
            let lastname = req.body.lastname;
            let username = req.body.username;
            let address = req.body.address;
            let phone_number = req.body.phone_number;
            let email = req.body.email;
            let picture = req.body.picture;
            let type = req.body.type;
            UserDatabase_1.default.updateOne({ 'username': username }, { $set: { 'firstname': firstname, 'lastname': lastname, 'address': address,
                    'phone_number': phone_number, 'email': email, 'picture': picture, 'type': type } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.delete = (req, res) => {
            let username = req.body.username;
            UserDatabase_1.default.deleteOne({ 'username': username }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.getAllUsers = (req, res) => {
            UserDatabase_1.default.find({}, (err, users) => {
                if (err)
                    console.log(err);
                else
                    res.json(users);
            });
        };
    }
}
exports.UserDatabaseController = UserDatabaseController;
//# sourceMappingURL=userDatabase.controller.js.map