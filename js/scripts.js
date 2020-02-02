eventListeners();

// Lista de proyectos
var listaProyectos = document.querySelector('ul#proyectos');

function eventListeners() {
    // Boton para crear proyecto
    document.querySelector('.crear-proyecto a').addEventListener('click', nuevoProyecto);
}

function nuevoProyecto(e) {
    e.preventDefault();

    // Crea un <input> para el nombre del nuevo proyecto
    var nuevoProyecto = document.createElement('li');
    nuevoProyecto.innerHTML = '<input type="text" id="nuevo-proyecto">';
    listaProyectos.appendChild(nuevoProyecto);

    // Seleccionar el ID con el nuevo proyecto
    var inputNuevoProyecto = document.querySelector('#nuevo-proyecto');

    // Al presionar enter crear el proyecto
    inputNuevoProyecto.addEventListener('keypress', function(e) {
        var tecla = e.which || e.keyCode;

        if(tecla === 13){
            guardarProyectoDB(inputNuevoProyecto.value);
            listaProyectos.removeChild(nuevoProyecto);
        }
    });
}

function guardarProyectoDB(nombreProyecto) {
    // Crear llamado a Ajax
    var xhr = new XMLHttpRequest();

    // Enviar datos por formdata
    var datos = new FormData();
    datos.append('proyecto', nombreProyecto);
    datos.append('accion', 'crear');

    // Abrir la conexión
    xhr.open('POST', 'inc/modelos/modelo-proyecto.php', true);

    // Cargar
    xhr.onload = function() {
        if(this.status === 200){
            // Obtener datos de la respuesta
            var respuesta = JSON.parse(xhr.responseText);
            var proyecto = respuesta.nombre_proyecto,
                id_proyecto = respuesta.id_insertado,
                tipo = respuesta.tipo,
                resultado = respuesta.respuesta;
            
            // Comprobar la inserción
            if(resultado === 'correcto'){
                // Fue exitoso
                if(tipo === 'crear'){
                    // Se creo un nuevo proyecto
                    // Inyectar en el HTML
                    var nuevoProyecto = document.createElement('li');
                    nuevoProyecto.innerHTML = `
                        <a href="index.php?id_proyecto=${id_proyecto}" id="${id_proyecto}">
                            ${proyecto}
                        </a>
                    `;
                    // Agregar al html
                    listaProyectos.appendChild(nuevoProyecto);

                    // Enviar alerta
                    swal({
                        title: 'Proyecto Creado',
                        text: 'El proyecto: ' + proyecto + ' se creó correctamente',
                        type: 'success'
                    })
                    .then(resultado => {
                        // Redireccionar a la nueva URL
                        if(resultado.value){
                            window.location.href = 'index.php?id_proyecto=' + id_proyecto;
                        }
                    })
                }else{
                    // Se actualizo o se elimino
                }
            }else{
                // Hubo un error
                swal({
                    type: 'error',
                    title: 'Error!',
                    text: 'Hubo un error!'
                });
            }
        }
    }

    // Enviar el request
    xhr.send(datos);
}
