import Express  from "express";
import { JWT, JWVerify } from "./../controller/jwt.js";

const router = Express();

router.use('/bodegas',()=>{
    console.log("hola");
});
router.use('/token',JWT);

export default router; 