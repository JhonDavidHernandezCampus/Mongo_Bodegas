import Express from "express";
import { conx } from "../db/db.js";
import { limit } from "../middleware/limit.js";
import { ClassVerify, DTOData } from "../middleware/verifyData.js";

const router = Express.Router();
let db = await conx();
const inventarios = db.collection("inventarios");
const bodegas = db.collection("bodegas");

// *
// 8. Realizar un EndPoint que permita insertar registros en la tabla de
// inventarios, los parámetros de entrada deben ser
// (id_producto,id_bodega,cantidad).
/* 
 * Ejemplo de data a enviar

    {
        "id_producto":1,
        "id_bodega":1,
        "cantidad":1
    }
*/
// http://127.1.1.1:5312/Inventarios/insertar
router.post('/insertar', limit(),ClassVerify, DTOData , async (req,res)=>{
    let query = null;
    let idrandon = Math.floor(Math.random() * (1000 - 0 + 1 ));
    try {
        query = await inventarios.find({
            $and:[
                {"id_producto": req.body.id_producto},
                {"id_bodega":req.body.id_bodega}
            ]
        }).toArray();
    } catch (error) {
        res.status(404).send({ status: 404, message: "Error al insertar la data", error: error });
    }

    if (query.length >= 1) {
        try {
            let canlocal = query[0].cantidad;
            let update = await inventarios.updateOne(
                {
                    id_producto: req.body.id_producto,
                    id_bodega:req.body.id_bodega
                },
                {
                    $set: { cantidad: canlocal + req.body.cantidad }
                }
            )
            console.log(update);
            res.send({status:200, message:"El producto ya existia en esta bodega se suma"});
        } catch (error) {
            res.status(404).send({ status: 404, message: "Error al aptualizar la data", error: error });
        }
    }else{
        try {
            let insert = await inventarios.insertOne({
                id:idrandon,
                id_producto:req.body.id_producto,
                id_bodega:req.body.id_bodega,
                cantidad:req.body.cantidad
            });
            res.send({status:200, message:"Producto no existente en esta bodega, se crea uno"});
        } catch (error) {
            res.status(404).send({ status: 404, message: "Error al insertar la data", error: error });
        }
    }
    //res.send(query);
    
});


// Realizar un EndPolnt que permita Trasladar un producto de una bodega a otra
/* 
 * Ejemplo de data a enviar
{
    "id_bodega_origen":1,
    "id_bodega_destino":1,
    "id_producto":1,
    "cantidad":1
}
*/

router.put('/transladar', limit(), ClassVerify, async (req,res)=>{
    let datos = req.body;
    let idrandon = Math.floor(Math.random() * (1000 - 0 + 1)) + 0;

    try {
        let vbOrigen = await bodegas.find({"id":{$eq :datos.id_bodega_origen}}).toArray();
        let vbDestino = await bodegas.find({"id":{$eq :datos.id_bodega_destino}}).toArray();

        if(!(vbOrigen.length >= 1 && vbDestino.length >= 1))throw {status:400, message:"Error bodegas no existentes"};

        let invOrig = await inventarios.find({
            $and:[
                {"id_bodega": datos.id_bodega_origen},
                {"id_producto":datos.id_producto}
            ]
        }).toArray();

        let invDest = await inventarios.find({
            $and:[
                {"id_bodega": datos.id_bodega_destino},
                {"id_producto":datos.id_producto}
            ]
        }).toArray();

        if(invOrig[0].cantidad < datos.cantidad) throw {message:"Producto insuficiente en bodega Origen"}

        if (invDest.length >= 1) {
            try {
                let updateDes = await inventarios.updateOne(
                    {
                        id_bodega: datos.id_bodega_destino,
                        id_producto: datos.id_producto
                    },
                    {
                        $set:{ cantidad: datos.cantidad + invDest[0].cantidad }
                    }
                );
                let updateOri = await inventarios.updateOne(
                    {
                        id_bodega: datos.id_bodega_origen,
                        id_producto: datos.id_producto
                    },
                    {
                        $set:{ cantidad:  invOrig[0].cantidad  - datos.cantidad }
                    }
                );
                res.send({message:"La transferencia se ha hecho correctamente", infodestino:updateDes, infoOrigen:updateOri});
            } catch (error) {
                res.status(404).send({message: "Error al hacer la tranferencia de producto en inventario"});
            }
        }else{
            try {
                let insert = await inventarios.insertOne({
                    id: idrandon,
                    id_bodega: datos.id_bodega_destino,
                    id_producto: datos.id_producto,
                    cantidad: datos.cantidad
                })
                let updateOri = await inventarios.updateOne(
                    {
                        id_bodega: datos.id_bodega_origen,
                        id_producto: datos.id_producto
                    },
                    {
                        $set:{ cantidad:  invOrig[0].cantidad  - datos.cantidad }
                    }
                );
                res.send({message:"La transferencia se ha hecho correctamente, se creo al producto", infodestino:insert, infoOrigen:updateOri});

            } catch (error) {
                
            }

        }

        //res.send(vbOrigen);
    } catch (error) {
        res.status(404).send({ status: 404, message: "Error al insertar la data", error: error });
        
    }
});

export default router;
