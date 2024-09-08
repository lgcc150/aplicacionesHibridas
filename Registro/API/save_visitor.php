<?php
header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept');

// Obtener los datos JSON de la solicitud
$data = json_decode(file_get_contents("php://input"), true);

// Verificar que se han recibido los datos necesarios
if (!isset($data['numeroDocumento'], $data['apellidoVisitante'], $data['nombreVisitante'], $data['genero'], $data['telefono'], $data['parentezco'], $data['fotoBase64'], $data['cama'], $data['pabellon'], $data['cedulaPaciente'], $data['nombrePaciente'])) {
    echo json_encode(["error" => "Todos los datos son requeridos"]);
    exit;
}

// Decodificar la foto desde base64
$foto = base64_decode($data['fotoBase64']);

// Conexión a la base de datos
$servername = "localhost";
$username = "root"; // usuario de base de datos
$password = ""; // contraseña de base de datos
$dbname = "registro_visitantes_db"; // nombre de base de datos

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode(["error" => "Conexión fallida: " . $conn->connect_error]));
}

// Preparar y ejecutar la consulta SQL
$stmt = $conn->prepare("
    INSERT INTO visitantes 
    (numero_documento, apellido, nombre, genero, telefono, parentezco, foto, cama, pabellon, cedula_paciente, nombre_paciente) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
");

// Verificar si la consulta se preparó correctamente
if ($stmt === false) {
    echo json_encode(["error" => "Error al preparar la consulta: " . $conn->error]);
    exit;
}

// Asociar los parámetros con los valores de la solicitud
$stmt->bind_param("sssssssssss", 
    $data['numeroDocumento'], 
    $data['apellidoVisitante'], 
    $data['nombreVisitante'], 
    $data['genero'], 
    $data['telefono'], 
    $data['parentezco'], 
    $foto, // Guardar la foto directamente en la base de datos
    $data['cama'], 
    $data['pabellon'], 
    $data['cedulaPaciente'], 
    $data['nombrePaciente']
);

// Ejecutar la consulta SQL
if ($stmt->execute()) {
    echo json_encode(["message" => "Datos del visitante guardados correctamente"]);
} else {
    echo json_encode(["error" => "Error al guardar los datos: " . $stmt->error]);
}

// Cerrar la conexión
$stmt->close();
$conn->close();
?>
