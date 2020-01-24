
eventListeners();

function eventListeners() {
    document.querySelector('#formulario').addEventListener('submit', validarRegistro);
}

function validarRegistro(e) {
    e.preventDefault();
    
    var usuario = document.querySelector('#usuario').value,
        password = document.querySelector('#password').value;

    if(usuario === '' || password === '') {
        swal({
            type: 'error',
            title: 'Error',
            text: 'Ambos campos son obligatorios!'
        })
    }else {
        swal({
            type: 'success',
            title: 'Correcto',
            text: 'Escribiste ambos campos'
        })
    }
}