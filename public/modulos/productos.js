import { createApp, reactive, toRefs } from '../vue/vue.esm-browser.js';
import al from './alertas.js';

export default class Productos {
  init() {
    const alerta = new al();
    const app = createApp({
      setup() {
        const config = reactive({
          lista_productos: [],
          producto_actual: {
            id: null,
            nombre: '',
            descripcion: '',
            vencimiento: '',
            precio: 0,
          },
        });

        const guardarProducto = () => {
          var ind = 0;//id menor posible
          const { nombre, vencimiento, precio } = config.producto_actual;

          if (!nombre || !vencimiento || precio === null || precio === undefined) {
            alerta.alerta_personalizada("rojo",'Los campos de Nombre, Precio y Fecha de vencimiento son obligatorios');
            return;
          }

          

          if (config.producto_actual.id != null) {
            // Buscar el índice del producto existente por ID
            const index = config.lista_productos.findIndex(p => p.id === config.producto_actual.id);

            if (index !== -1) {
              // Reemplazar el producto en la posición encontrada
              config.lista_productos[index] = { ...config.producto_actual };
            } else {
              // Si no lo encuentra, lo agrega como seguridad
              config.lista_productos.push({ ...config.producto_actual });
            }
          } else {

            //PARA LOS ID SIEMPRE EL VALOR MAXIMO + 1 
            if (config.lista_productos.length > 0) {
              const maxId = Math.max(...config.lista_productos.map(p => p.id || 0));
              config.producto_actual.id = maxId + 1;
            } else {
              config.producto_actual.id = 1;
            }
            config.lista_productos.push({ ...config.producto_actual });
          }



          const modal = bootstrap.Modal.getInstance(document.getElementById('modalProducto'));
          if (modal) modal.hide();

          limpiarFormulario();
        };

        const limpiarFormulario = () => {
          config.producto_actual = {
            id: null,
            nombre: '',
            descripcion: '',
            vencimiento: '',
            precio: 0,
          };
        };

        const modalProducto_OPEN = (producto) => {
          const modal = new bootstrap.Modal(document.getElementById('modalProducto'));
          config.producto_actual = producto ? { ...producto } :
            {
              id: null,
              nombre: '',
              descripcion: '',
              vencimiento: '',
              precio: 0,
            };
          modal.show();
        };
        const formatearPrecio = (precio) => {
          const valor = parseFloat(precio);
          return isNaN(valor) ? '$ 0.00' : `$ ${valor.toFixed(2)}`;
        };

        return {
          ...toRefs(config), // Acceso directo a producto_actual y lista_productos
          guardarProducto,
          modalProducto_OPEN,
          formatearPrecio
        };
      }
    });

    app.mount('#app');
  }
}
