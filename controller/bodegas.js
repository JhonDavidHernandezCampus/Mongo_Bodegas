import Express  from "express";
import { conx } from "../db/db.js";

const router = Express.Router();

router.get('/', (req,res)=>{
    console.log("Funciona");
});

