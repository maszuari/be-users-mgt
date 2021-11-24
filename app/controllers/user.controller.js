var bcrypt = require("bcryptjs");
const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

var createFirstAdmin = async(req, res) => {

    const role = await Role.findOne({
        where: {
          name: 'admin'
        }
    });

    if (role === null){
        res.status(500).send({ message: 'Unable to find admin role' });
    }else{
        User.create({
            username: 'admin',
            email: 'admin@example.com',
            password: bcrypt.hashSync('apass'),
            firstname: 'John',
            lastname: 'Doe',
            role_id: role.id
        }).then(user =>{
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                role_id: role.id,
                password: 'apass'
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
    }

};

var createMultipleUsers = async(req, res)=>{
    const role = await Role.findOne({
        where: {
          name: 'registeredUser'
        }
    });

    if (role === null){
        res.status(500).send({ message: 'Unable to find registredUser role' });
    }else{
        for(var i=0 ; i<22 ; i++){
            var uname = 'user'+i; 
            User.create({
                username: uname,
                email: uname+'@example.com',
                password: bcrypt.hashSync('b'),
                firstname: 'John'+i,
                lastname: 'Doe'+i,
                role_id: role.id
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });
        }
    }
}

exports.createFirstAdmin = createFirstAdmin;
exports.createMultipleUsers = createMultipleUsers;