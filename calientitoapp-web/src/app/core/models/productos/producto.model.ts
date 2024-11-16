export interface Producto {
  id_producto: number,
  descripcion: string,
  marca: string,
  codigo: string,
  cantidad: number,
  precio_compra: number,
  precio_venta: number,
  id_estado: number,
  eliminado: number,
  imagen: string
}
export interface ProductoModel {
  idProducto: number,
  name: string,
  precio: number,
  descripcion: string,
  creationDate: Date,
  updateDate: Date | null,
  active: boolean,
  imagen: string
}
