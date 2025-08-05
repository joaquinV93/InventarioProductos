export default class Alertas {
    constructor() {

    }
    

    alerta_personalizada(tipo, mensaje) {
        var bg = "";
        var tit = "";
        switch (tipo) {
            case 'rojo':
                bg = "alert-danger";
                tit = "Error!";
                break;
            case 'azul':
                bg = "alert-primary";
                tit = "Listo!";
                break;
            case 'verde':
                bg = "alert-success";
                tit = "Validado!";
                break;
            case 'amarillo':
                bg="alert-warning";
                tit = "Alerta!";
                break;
        }
    
        // Crear la alerta
        const alertDiv = document.createElement('div');
        alertDiv.className =
            'alert ' + bg + ' alert-dismissible fade show col-xl-6 col-lg-6 col-md-8 col-sm-10 col-11';
        alertDiv.role = 'alert';
        alertDiv.style.position = 'absolute';
        alertDiv.style.top = `${window.scrollY + 20}px`; // Cambia la posición relativa a la parte superior
        alertDiv.style.right = '20px'; // Un poco de margen derecho
        alertDiv.style.textAlign = 'center';
        alertDiv.style.zIndex = '9999';
        alertDiv.innerHTML = `
            <strong>${tit}</strong> ${mensaje}.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
    
        // Agregar la alerta al DOM
        document.body.appendChild(alertDiv);
    
        // Ajustar la posición de las alertas existentes para que no se superpongan
        const alerts = document.querySelectorAll('.alert');
        alerts.forEach((alert, index) => {
            alert.style.top = `${index * 60 + 20}px`; // Ajustar la posición de cada alerta
        });
    
        // Control para evitar múltiples eliminaciones
        let alertClosed = false;
    
        // Escuchar el evento de cierre manual de Bootstrap
        alertDiv.addEventListener('closed.bs.alert', () => {
            alertClosed = true; // Marcar la alerta como cerrada manualmente
        });
    
        // Remover la alerta después de 5 segundos si no ha sido cerrada manualmente
        const timeoutId = setTimeout(() => {
            if (!alertClosed) {
                alertDiv.classList.remove('show');
                alertDiv.classList.add('fade');
                setTimeout(() => {
                    if (document.body.contains(alertDiv)) {
                        document.body.removeChild(alertDiv);
                    }
                }, 150); // tiempo para la transición de fade out
            }
        }, 30000);
    }    
}