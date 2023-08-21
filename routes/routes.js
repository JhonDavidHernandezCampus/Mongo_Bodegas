import Express  from "express";
import { JWT, JWVerify } from "./../controller/jwt.js";
import Bodegas from './../controller/bodegas.js';
import  Productos  from "../controller/productos.js";

const router = Express();

router.use('/Bodegas',JWVerify,Bodegas);
router.use('/Productos', JWVerify, Productos );
router.use('/token',JWT);

export default router; 