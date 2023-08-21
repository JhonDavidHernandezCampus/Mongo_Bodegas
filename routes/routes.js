import Express  from "express";
import { JWT, JWVerify } from "./../controller/jwt.js";
import Bodegas from './../controller/bodegas.js';

const router = Express();

router.use('/Bodegas',JWVerify,Bodegas);
router.use('/token',JWT);

export default router; 