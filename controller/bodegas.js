import Express from "express";
import { conx } from "../db/db.js";
import { limit } from "../middleware/limit.js";
import { ClassVerify, DTOData } from "../middleware/verifyData.js";

const router = Express.Router();
let db = await conx();
const bodegas = db.collection("bodegas");

// 4. Realizar un EndPolnt que permita listar 
// todas las bodegas ordenadasalfabéticamente.
router.get('/orden', limit(), ClassVerify, async (req, res) => {
    try {
        let ressult = await bodegas.find().sort({ nombre: 1 }).toArray();
        res.send(ressult);
    } catch (error) {
        res.status(404).send({ status: 404, message: "Error en la consulta de datos" });
    }
});

// 5. Realizar un EndPolnt que permita crear una bodegas.(agregar en los
// comentarios de la función los datos de entrada).
/* 
 * Ejemplo de data a enviar
{
    "id_bodega":1,
    "nombre":"Jhon",
    "id_responsable":1,
    "estado":1
}

*/
router.post('/insertar', limit(), DTOData, async (req, res) => {
    try {
        let result = await bodegas.insertOne(req.body);
        if (result.acknowledged) res.send({ status: 200, message: "La data se ha insertado correctamente", data: result });
    } catch (error) {
        res.status(404).send({ status: 404, message: "Error al insertar la data", error: error });
    }
});

export default router;