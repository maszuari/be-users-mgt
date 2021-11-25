var bcrypt = require("bcryptjs");
const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

var createUser = async(req, res) =>{
    
    try {
        var user = await User.create({
            firstname: req.body.username,
            lastname: req.body.lastname,
            email: req.body.email,
            username: req.body.username,
            password:  bcrypt.hashSync(req.body.password),
            role_id: req.body.role_id
        });
        if(user !== null){
            res.status(500).send({
                message:"Successfully create user"
            });
           
        }else{
            res.status(500).send({
                error_msg: "Unable to create user"
            });
        }
    }catch(e){
        res.status(500).send({
            error_msg: e.parent.detail
        });
    }
}

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

exports.createUser = createUser;
exports.createFirstAdmin = createFirstAdmin;
exports.createMultipleUsers = createMultipleUsers;