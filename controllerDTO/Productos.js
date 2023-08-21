var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose } from "class-transformer";
import { IsDefined } from "class-validator";
export class Productos {
    constructor(data) {
        Object.assign(this, data);
        this.id = 12,
            this.nombre = "Chocolate",
            this.descripcion = "dulce",
            this.estado = 1;
    }
}
__decorate([
    Expose({ name: "id" }),
    IsDefined({ message: () => { throw { status: 422, message: "el parametro id  no debe ser obligatorio" }; } }),
    __metadata("design:type", Number)
], Productos.prototype, "id", void 0);
__decorate([
    Expose({ name: "nombre" }),
    IsDefined({ message: () => { throw { status: 422, message: "el parametro nombre  no debe ser obligatorio" }; } }),
    __metadata("design:type", String)
], Productos.prototype, "nombre", void 0);
__decorate([
    Expose({ name: "descripcion" }),
    IsDefined({ message: () => { throw { status: 422, message: "el parametro descripcion  no debe ser obligatorio" }; } }),
    __metadata("design:type", String)
], Productos.prototype, "descripcion", void 0);
__decorate([
    Expose({ name: "estado" }),
    IsDefined({ message: () => { throw { status: 422, message: "el parametro estado  no debe ser obligatorio" }; } }),
    __metadata("design:type", Number)
], Productos.prototype, "estado", void 0);
