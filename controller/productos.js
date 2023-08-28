import express from 'express';
import { conx } from './../db/db.js'; 
import  { limit } from './../middleware/limit.js';
import { ClassVerify,DTOData } from './../middleware/verifyData.js';

const router = express.Router();
let db = await conx();
const productos = db.collection("productos");
const inventarios = db.collection("inventarios");

//6.  Realizar un EndPoint que permita listar todos los productos en orden
// descendente por el campo "Total".
// http://127.1.1.1:5312/Productos/cantidad

router.get('/cantidad',limit(), ClassVerify,async (req,res)=>{
    try {
        let result = await productos.aggregate([
            {
                $lookup: {
                    from: 'inventarios',
                    localField: 'id',
                    foreignField: 'id_producto',
                    as: 'FK_Inventarios'
                }
            },
            {
                $lookup: {
                    from: 'bodegas',
                    localField: 'FK_Inventarios.id_bodega',
                    foreignField: 'id',
                    as: "FK_Bodegas"
                }
            },
            {
                $unwind: "$FK_Inventarios"
            },
            {
                $unwind: "$FK_Bodegas"
            },
            {
                $group: {
                    _id: "$id",
                    producto: { $first: "$nombre" },
                    nombre_bodega:{ $first: "$FK_Bodegas.nombre" },
                    Total_Producto: { $sum: '$FK_Inventarios.cantidad' }
                }
            },
            {
                $sort: { Total_Producto: -1 }
            }
        ]).toArray();
        res.send(result)
    } catch (error) {
        res.status(404).send({status:404,message:"Error en la consuta de los datos", Error:error});
    }

});
//7. Realizar un EndPoint que permita insertar un productos y a su vez asigne
//una cantidad inicial del mismo en la tabla inventarios en una de las bodegas
//por default.
/* 
* Ejemplo de data a enviar
{
    "id":1,
    "nombre":"peperoni",
    "descripcion":"El mejor peperoni",
    "estado":1,
}
*/
// http://127.1.1.1:5312/Productos/insertar

router.post('/insertar', limit(), DTOData, async(req,res)=>{
    try {
        let idrandon = Math.floor(Math.random() * (1000 - 0 + 1)) + 0;
        // * console.log(idrandon);
        let result = await productos.insertOne(req.body);
        let asignar = await inventarios.insertOne({
                id: idrandon,
                id_bodega: 1,
                id_producto: req.body.id,
                cantidad: 10
        })
        console.log(result, asignar);
        if(result.acknowledged && asignar.acknowledged) res.send({ status: 200, message: "La data se ha insertado correctamente", data: result });
    } catch (error) {
        res.status(404).send({ status: 404, message: "Error al insertar la data", error: error });
        
    }
});

export default router;