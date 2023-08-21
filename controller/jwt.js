import 'reflect-metadata';
import { plainToClass, classToPlain } from 'class-transformer'
import { SignJWT, jwtVerify } from 'jose';
import { limit } from './../middleware/limit.js';
import { Bodegas } from './../controllerDTO/Bodegas.js';
import { Productos } from './../controllerDTO/Productos.js';
import { Inventario } from './../controllerDTO/inventario.js';
import dotenv from 'dotenv';
import Express  from 'express';

dotenv.config();
const JWT = Express();
const JWVerify = Express();


const DTO = (collection)=>{
    const instances = {
        'Bodegas': Bodegas,
        'Productos': Productos,
        'Inventarios':Inventario
    }
    let instancia = instances[collection];
    if(!instancia) throw { status: 504, message: "El token que desea solicitar no es valido"};
    let clase = plainToClass(instancia,{},{ignoreDecorators:true});
    return {clase:clase, instans:instancia };
}
JWT.use('/:collection', limit() ,async (req,res)=>{
    try{
        let clase = DTO(req.params.collection).clase;
        const encoder = new TextEncoder();
        const jwtconstructor = new SignJWT(Object.assign({},classToPlain(clase)));
        const jwt = await jwtconstructor
        .setProtectedHeader({alg:'HS256',typ:"JWT"})
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(encoder.encode(process.env.MEGAIRROMPLIBLE));
        //req.data = jwt;
        res.status(200).send({status:200, token:jwt});
    } catch (error) {
        res.status(404).send({status:404, message: error});
    }
}) 

JWVerify.use(async(req,res,next)=>{
    try {
        const { authorization } = req.headers;
        // * console.log(authorization);
        if(!authorization) return  res.status(400).send({status:404, message: "Token de autorizacion faltante"});
        try {
            const encoder = new TextEncoder();
            const jwtData = await jwtVerify(
                authorization,
                encoder.encode(process.env.MEGAIRROMPLIBLE)
            );
            req.data = jwtData;
            next();
        } catch (error) {
            res.status(498).send({status:498,Message:"Token caducado o contaminado"});
        }
    } catch (error) {
    }
});


export {
    JWT, 
    JWVerify,
    DTO
};