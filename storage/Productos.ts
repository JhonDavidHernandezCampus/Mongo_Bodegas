import { Expose, Transform } from "class-transformer";
import { IsDefined } from "class-validator";

/* 
{
    "id":1,
    "nombre":"peperoni",
    "descripcion":"El mejor peperoni",
    "estado":1
}

*/

export class Productos{
    @Expose({ name: "id"})
    @IsDefined({message: ()=>{throw {status:422,message: "el parametro id  debe ser obligatorio"}}})
    id:number;

    @Expose({ name: "nombre"})
    @IsDefined({message: ()=>{throw {status:422,message: "el parametro nombre debe ser obligatorio"}}})
    nombre:string;

    @Expose({ name: "descripcion"})
    @IsDefined({message: ()=>{throw {status:422,message: "el parametro descripcion debe ser obligatorio"}}})
    descripcion:string;

    @Expose({ name: "estado"})
    @IsDefined({message: ()=>{throw {status:422,message: "el parametro estado debe ser obligatorio"}}})
    estado:number;

    constructor(data:Partial<Productos>){
        Object.assign(this, data);
        this.id = 12,
        this.nombre = "Chocolate",
        this.descripcion = "dulce",
        this.estado = 1
    }
}