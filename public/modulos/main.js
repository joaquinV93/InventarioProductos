
import Productos from './productos.js';


class main {
    constructor() {
        this.productos = new Productos();
    }

    async init() {
        await this.cargarVistas();
        this.productos.init();
    }

    async cargarVistas() {
        await this.cargarVista('./vistas/modal-producto.html');
        await this.cargarVista('./vistas/tabla-productos.html');
        await this.cargarVista('./vistas/modal-elim-producto.html');

    }

    async cargarVista(ruta) {
        try {
            const response = await fetch(ruta);
            if (!response.ok) throw new Error(`Error al cargar ${ruta}`);
            const html = await response.text();
            document.getElementById('app').insertAdjacentHTML('beforeend', html); 
        } catch (error) {
            console.error('Error cargando vista:', error);
        }
    }
}

const m = new main();
m.init();