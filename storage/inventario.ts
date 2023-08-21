import { Expose, Transform } from 'class-transformer';
import { IsDefined, IsNumber } from "class-validator";

/* 
    {
        "id":1,
        "id_bodega":"Jhon",
        "id_producto":1,
        "cantidad":1
    }
*/
export class Inventario{
    @Expose({ name: 'id'})
    id?:number
    
    @Expose({ name: 'id_bodega'})
    @IsDefined({message: ()=>{throw { status:422, message:`El id_bodega de la bodega no cumple con los parametros`}}})
    id_bodega:number

    @Expose({ name: 'id_producto'})
    @IsDefined({message: ()=>{throw { status:422, message:`El id_producto de la bodega no cumple con los parametros`}}})
    id_producto:number

    @Expose({ name: 'cantidad'})
    @IsDefined({message: ()=>{throw { status:422, message:`El cantidad de la bodega no cumple con los parametros`}}})
    cantidad:number



    constructor(data:Partial<Inventario>){
        Object.assign(this,data);
        this.id=1,
        this.id_bodega = 1,
        this.id_producto = 1,
        this.cantidad = 1
    }
}