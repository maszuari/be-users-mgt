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

    noUsers = 20
    if (req.body.noUsers) {
        noUsers = req.body.noUsers
    }

    if (role === null){
        res.status(500).send({ message: 'Unable to find registredUser role' });
    }else{
        var success = 0; 
        for(var i=1 ; i<=noUsers ; i++){
            var uname = 'user'+i; 
            User.create({
                username: uname,
                email: uname+'@example.com',
                password: bcrypt.hashSync('b'),
                firstname: 'John'+i,
                lastname: 'Doe'+i,
                role_id: role.id
            }).then(user=>{
                success++;
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });
        }
    
        if( success === noUsers) {
            res.status(200).send({
                message:"Successfully created all users"
            });
        }else{
            var failed = noUsers - success;
            res.status(400).send({
                message:"Successfully created "+success+" users. Failed to create "+failed+" users."
            });
        }
    }
}

exports.createUser = createUser;
exports.createFirstAdmin = createFirstAdmin;
exports.createMultipleUsers = createMultipleUsers;