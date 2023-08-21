import { Expose, Transform } from "class-transformer";
import { IsDefined } from "class-validator";

export class Productos{
    @Expose({ name: "id"})
    @IsDefined({message: ()=>{throw {status:422,message: "el parametro id  no debe ser obligatorio"}}})
    id:number;

    @Expose({ name: "nombre"})
    @IsDefined({message: ()=>{throw {status:422,message: "el parametro nombre  no debe ser obligatorio"}}})
    nombre:string;

    @Expose({ name: "descripcion"})
    @IsDefined({message: ()=>{throw {status:422,message: "el parametro descripcion  no debe ser obligatorio"}}})
    descripcion:string;

    @Expose({ name: "estado"})
    @IsDefined({message: ()=>{throw {status:422,message: "el parametro estado  no debe ser obligatorio"}}})
    estado:number;

    constructor(data:Partial<Productos>){
        Object.assign(this, data);
        this.id = 12,
        this.nombre = "Chocolate",
        this.descripcion = "dulce",
        this.estado = 1
    }
}