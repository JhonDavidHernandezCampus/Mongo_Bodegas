import 'reflect-metadata';
import { plainToClass, classToPlain } from 'class-transformer'
import { SignJWT, jwtVerify } from 'jose';
import { Bodegas } from './../controllerDTO/Bodegas.js';
import dotenv from 'dotenv';
import Express  from 'express';

dotenv.config();
const JWT = Express();
const JWVerify = Express();


const DTO = (collection)=>{
    const instances = {
        'Bodegas': Bodegas,
    }
    let clase = instances[collection];
    if(!clase) res.status(404).send({ status: 504, message: "El token que desea solicitar no es valido"});
    clase = plainToClass(clase,{},{ignoreDecorators:true});
    return clase;
}
JWT.use('/:collection',async (req,res)=>{
    try{
        let clase = DTO(req.params.collection);
        const encoder = new TextEncoder();
        const jwtconstructor = new SignJWT(Object.assign({},classToPlain(clase)));
        const jwt = await jwtconstructor
        .setProtectedHeader({alg:'HS256',typ:"JWT"})
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(encoder.encode(process.env.MEGAIRROMPLIBLE));
        res.status(200).send({status:200, token:jwt});

    } catch (error) {
        res.status(404).send({status:404, message: error});
    }
}) 


export {
    JWT, 
    JWVerify
};