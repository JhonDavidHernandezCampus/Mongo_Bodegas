import { Expose, Transform } from 'class-transformer';
import { IsDefined } from "class-validator";

/* 
    {
        id_bodega:1,
        nombre:"Jhon",
        id_responsable:1,
        estado:1
    }
*/
export class Bodegas{
    @Expose({ name: 'id_bodega'})
    @IsDefined({message: ()=>{throw { status:422, message:`El id de la bodega no cumple con los parametros`}}})
    id:number
    
    @Expose({name:'nombre'})    
    @IsDefined({message: ()=>{throw { status:422 , message:"el campo nombre no cumple con los requisitos establesidos"}}})
    nombre:string
    
    @Expose({name:'id_responsable'})
    @IsDefined({message: ()=>{throw { status:422 , message:"el campo id_responsable no cumple con los requisitos establesidos"}}})
    id_responsable:number
    
    @Expose({name:'estado'})
    @IsDefined({message: ()=>{throw { status:422 , message:"el campo estado no cumple con los requisitos establesidos"}}})
    estado:number


    constructor(data:Partial<Bodegas>){
        Object.assign(this, data);
        this.id=1,
        this.nombre = "jhon",
        this.id_responsable = 1,
        this.estado = 1
    }

}