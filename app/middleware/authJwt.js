const jwt = require("jsonwebtoken");
const { noExtendLeft } = require("sequelize/types/lib/operators");
const config = require("../config/auth.config");
const db = require("../models");

const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if(!token) {
        return res.status(403).send({
            message: "Token não informado"
        });
    }
    jwt.verify(token, config.secret, (err, decode) => {
        if(err){
            return res.status(401).json({
                message: "não autorizado"
            });
        }
        req.userId = decoded.userId
        next()
    });
};

isAdmin = (req, res,next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i =0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require Admin Roles!"
            });
            return;
        });
    });
};

isModerator = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }
            }
        res.status(403).send({
            message: "Require Morderator Roles!"
        });
        });
    });
};

isModeratorOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require Moderator or Admin Role"
            });
        });
    })
}

const authJwt =  {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin
};

module.exports = authJwt;

