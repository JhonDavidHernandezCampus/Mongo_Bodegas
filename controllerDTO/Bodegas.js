var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose } from 'class-transformer';
import { IsDefined } from "class-validator";
/*
    {
        id_bodega:1,
        nombre:"Jhon",
        id_responsable:1,
        estado:1
    }
*/
export class Bodegas {
    constructor(data) {
        Object.assign(this, data);
        this.id = 1,
            this.nombre = "jhon",
            this.id_responsable = 1,
            this.estado = 1;
    }
}
__decorate([
    Expose({ name: 'id_bodega' }),
    IsDefined({ message: () => { throw { status: 422, message: `El id de la bodega no cumple con los parametros` }; } }),
    __metadata("design:type", Number)
], Bodegas.prototype, "id", void 0);
__decorate([
    Expose({ name: 'nombre' }),
    IsDefined({ message: () => { throw { status: 422, message: "el campo nombre no cumple con los requisitos establesidos" }; } }),
    __metadata("design:type", String)
], Bodegas.prototype, "nombre", void 0);
__decorate([
    Expose({ name: 'id_responsable' }),
    IsDefined({ message: () => { throw { status: 422, message: "el campo id_responsable no cumple con los requisitos establesidos" }; } }),
    __metadata("design:type", Number)
], Bodegas.prototype, "id_responsable", void 0);
__decorate([
    Expose({ name: 'estado' }),
    IsDefined({ message: () => { throw { status: 422, message: "el campo estado no cumple con los requisitos establesidos" }; } }),
    __metadata("design:type", Number)
], Bodegas.prototype, "estado", void 0);
