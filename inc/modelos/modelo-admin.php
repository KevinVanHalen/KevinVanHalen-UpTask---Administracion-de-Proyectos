<?php 

    // die(json_encode($_POST));

    $accion = $_POST['accion'];
    $password = $_POST['password'];
    $usuario = $_POST['usuario'];

    if($accion === 'crear') {
        // Código para crear los administradores

        // Hashear passwords
        $opciones = array(
            'cost' => 12
        );
        $hash_password = password_hash($password, PASSWORD_BCRYPT, $opciones);

        $respuesta = array(
            'pas' => $hash_password
        );

        echo json_encode($respuesta);
    }

    if($accion === 'login') {
        // Código que loguee a los administradores
    }