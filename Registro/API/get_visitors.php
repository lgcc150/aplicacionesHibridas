<?php
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept');

// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "registro_visitantes_db";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    echo json_encode(["error" => "Conexión fallida: " . $conn->connect_error]);
    exit(); // Salir si hay error de conexión
}

// Consulta para obtener todos los visitantes
$sql = "SELECT * FROM visitantes";
$result = $conn->query($sql);

if (!$result) {
    echo json_encode(["error" => "Error en la consulta: " . $conn->error]);
    exit(); // Salir si hay error en la consulta
}

// Crear un array para almacenar los datos de los visitantes
$pacientes = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Convertir la imagen binaria a base64 (comentado por ahora)
        $fotoBase64 = '';
        if ($row['foto']) {
            $fotoBase64 = 'data:image/jpeg;base64,' . base64_encode($row['foto']);
        }

        // Guardar los datos en un array asociativo
        $paciente = [
            "ID" => $row['id'],
            "Documento" => $row['numero_documento'],
            "Apellido" => $row['apellido'],
            "Nombre" => $row['nombre'],
            "Genero" => $row['genero'],
            "Telefono" => $row['telefono'],
            "Parentesco" => $row['parentezco'],
            "Foto" => $fotoBase64, // Imagen en formato base64
            "Cama" => $row['cama'],
            "Pabellon" => $row['pabellon'],
            "Cedula_Paciente" => $row['cedula_paciente'],
            "Nombre_Paciente" => $row['nombre_paciente']
        ];

        // Agregar el paciente al array de resultados
        $pacientes[] = $paciente;
    }
} else {
    echo json_encode(["message" => "No hay visitantes"]);
    exit(); // Salir si no hay resultados
}

header('Content-Type: application/json');
// Devolver los datos en formato JSON
echo json_encode($pacientes);

$conn->close();
?>
