import 'reflect-metadata';
import { plainToClass, classToPlain } from "class-transformer";
import { validate } from 'class-validator';
import  { Bodegas } from './../controllerDTO/Bodegas.js';
import { DTO } from './../controller/jwt.js';
import  { Router }  from "express";

const ClassVerify = Router();
const DTOData = Router();

ClassVerify.use((req,res,next)=>{
    let clase = req.baseUrl.slice(1);
    let { iat,exp, ...newpayload } = req.data.payload;
    const payload = newpayload;
    let claseActual = JSON.stringify(classToPlain(plainToClass(DTO(clase).instans,{},{ignoreDecorators:true})));
    if(!(claseActual === JSON.stringify(payload))) res.status(400).send({status:400, message:"Sin permisos para hacer este tramite"}); else next()
});

DTOData.use(async (req,res,next)=>{
    try {
        let clase = req.baseUrl.slice(1);
        let data = plainToClass(DTO(clase).instans,req.body);
        await validate(data);
        req.body = classToPlain(data);
        req.data = undefined;
        next();
    } catch (error) {
        res.status(405).send({error:error, message: "La data enviada incorrectamente"});
    }
});

export {
    ClassVerify,
    DTOData
}

