const express = require('express') 
const jwt = require('jsonwebtoken');

const auth = (req,res,next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({message : "token not found"});
    }
    const token = authHeader.split(" ")[1];
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        return res.status(401).json({message: "token is invalid"});
    }
    
}

module.exports = auth;