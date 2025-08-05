import { createApp, reactive, toRefs, onMounted } from '../vue/vue.esm-browser.js';
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
          const { nombre, vencimiento, precio, descripcion } = config.producto_actual;

          const regexNombre = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ0-9\s]+$/;
          if (!nombre || !vencimiento || !precio) {
            alerta.alerta_personalizada("rojo", 'Los campos de Nombre, Precio y Fecha de vencimiento son obligatorios');
            return;
          }

          if (!regexNombre.test(nombre)) {
            alerta.alerta_personalizada("rojo", 'El nombre no debe contener símbolos especiales');
            return;
          }
          if (!regexNombre.test(descripcion)) {
            alerta.alerta_personalizada("rojo", 'la descripción del producto no debe contener símbolos especiales');
            return;
          }
          if ((precio <= 0)) {
            alerta.alerta_personalizada("rojo", 'El precio del Producto no puede ser menor o igual a cero.');
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
          //AQUI SE GUARDA EN LOCAL STORANGE
          guardarEnLocalStorage();
        };

        const guardarEnLocalStorage = () => {
          localStorage.setItem('productos', JSON.stringify(config.lista_productos));
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

        const abrirConfirmacion = (producto) => {
          config.producto_actual = producto ? { ...producto } :
            {
              id: null,
              nombre: '',
              descripcion: '',
              vencimiento: '',
              precio: 0,
            };
          const modal = new bootstrap.Modal(document.getElementById('modal_elim_con'));
          modal.show();
        };
        const eliminarProducto = () => {
          config.lista_productos = config.lista_productos.filter(p => p.id !== config.producto_actual.id);

          // Cerrar el modal de confirmación
          const modalElement = document.getElementById('modal_elim_con');
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) modal.hide();

          guardarEnLocalStorage();
        };


        const diasParaVencer = (fechaStr) => {
          const hoy = new Date();
          const fechaVencimiento = new Date(fechaStr);
          const diff = fechaVencimiento - hoy;

          // Calcular días redondeando hacia abajo
          return Math.floor(diff / (1000 * 60 * 60 * 24));
        };

        onMounted(() => {
          const productosGuardados = localStorage.getItem('productos');
          if (productosGuardados) {
            try {
              config.lista_productos = JSON.parse(productosGuardados);
            } catch (error) {
              console.error('Error al cargar productos del localStorage:', error);
            }
          }
        });

        return {
          ...toRefs(config), // Acceso directo a producto_actual y lista_productos
          guardarProducto,
          modalProducto_OPEN,
          formatearPrecio,
          abrirConfirmacion,
          eliminarProducto,
          diasParaVencer
        };
      }
    });

    app.mount('#app');
  }
}
