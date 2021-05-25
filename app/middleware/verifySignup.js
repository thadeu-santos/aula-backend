const db = require(".../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    //checando username
    User.findOne(
        {
            where: {
                username: req.body.username,
            },
        }).then(user => {
            if(user){
                res.status(400).send({
                    message:"Errou! Username já tá em uso"
                })
            }
        })
};