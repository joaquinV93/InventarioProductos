// modulos/productos.js
import bootstrap from './bootstrap.js';
import { createApp, ref } from '../vue/vue.esm-browser.js';

export default class Productos {
  init() {
    const app = createApp({
      setup() {
        const producto = ref({
          nombre: '',
          descripcion: '',
          vencimiento: '',
          precio: 0,
        });

        const guardarProducto = () => {
          if (!producto.value.nombre || !producto.value.vencimiento || !producto.value.precio) {
            alert('Por favor completa todos los campos obligatorios.');
            return;
          }

          console.log('Producto guardado:', { ...producto.value });
          // Aquí podrías insertar el producto en un array o enviarlo al backend

          const modal = bootstrap.Modal.getInstance(document.getElementById('modalProducto'));
          modal.hide();
          limpiarFormulario();
        };

        const limpiarFormulario = () => {
          producto.value = { nombre: '', descripcion: '', vencimiento: '', precio: 0 };
        };

        return {
          producto,
          guardarProducto,
        };
      }
    });

    app.mount('#tablaProductos');

    // Botón para abrir el modal
    const btnAgregar = document.getElementById('btnAgregar');
    if (btnAgregar) {
      btnAgregar.addEventListener('click', () => {
        const modal = new bootstrap.Modal(document.getElementById('modalProducto'));
        modal.show();
      });
    }
  }
}
