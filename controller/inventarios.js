import Express from "express";
import { conx } from "../db/db.js";
import { limit } from "../middleware/limit.js";
import { ClassVerify, DTOData } from "../middleware/verifyData.js";

const router = Express.Router();
let db = await conx();
const inventarios = db.collection("inventarios");



/* 
 * Ejemplo de data a enviar

    {
        "id_producto":1,
        "id_bodega":1,
        "cantidad":1
    }
*/
router.post('/insertar', limit(),ClassVerify, DTOData , async (req,res)=>{
    try {
        let query = await inventarios.find({
            $and:[
                {"id_producto": 1},
                {"id_bodega":1}
            ]
        }).toArray();

        if (query.length >= 1) {
            console.log("se aptualiza");
        }else{
            console.log("se crea ");
        }
        res.send(query);
    } catch (error) {
        res.status(404).send({ status: 404, message: "Error al insertar la data", error: error });
    }
});

export default router;
