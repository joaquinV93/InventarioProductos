
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

        await this.cargarVista('./vistas/pantalla-carga.html');
        await this.cargarVista('./vistas/modal-producto.html');
        await this.cargarVista('./vistas/tabla-productos.html');
        await this.cargarVista('./vistas/modal-elim-producto.html');
        // Después de que todo esté listo, lanzar pantalla de carga
        setTimeout(() => {
            // Ocultar loader
            const loader = document.getElementById('loader');
            if (loader) loader.style.display = 'none';

            // Mostrar el contenido principal
            const app = document.getElementById('app');
            if (app) app.style.display = 'Flex';
        }, 8000);

    }

    async cargarVista(ruta) {
        try {

            const response = await fetch(ruta);
            if (!response.ok) throw new Error(`Error al cargar ${ruta}`);
            const html = await response.text();
            // Si es la pantalla de carga, insertarlo en #loader
            if (ruta.includes('pantalla-carga')) {
                document.getElementById('loader').innerHTML = html;
            } else {
                document.getElementById('app').insertAdjacentHTML('beforeend', html);
            }
        } catch (error) {
            console.error('Error cargando vista:', error);
        }
    }
}

const m = new main();
m.init();