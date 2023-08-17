import 'reflect-metadata';
import { plainToClass, classToPlain } from 'class-transformer'
import { SignJWT, jwtVerify } from 'jose';
import { Bodegas } from './../controllerDTO/Bodegas.js';
import dotenv from 'dotenv';
import Express  from 'express';




const JWT = Express();
const JWVerify = Express();

JWT.use('/:collection',(req,res)=>{
    let bodegas = plainToClass(Bodegas,{},{ignoreDecorators:true});
    console.log(Bodegas);
    console.log(bodegas);
    console.log(req.params.collection);
    try {
        
    } catch (error) {
        
    }
})


export {
    JWT,
    JWVerify
};