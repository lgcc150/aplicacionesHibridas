<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept');

// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "registro_visitantes_db"; 

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener datos POST
$data = json_decode(file_get_contents("php://input"), true);

// Log de los datos recibidos para depuración
error_log("Datos recibidos: " . print_r($data, true));

// Verificar si los datos POST están presentes
if (isset($data['username']) && isset($data['password'])) {
    $username = $data['username'];
    $password = $data['password'];

    // Log de los datos que se usan en la consulta
    error_log("Usuario: " . $username);
    error_log("Contraseña: " . $password);

    // Consulta para verificar usuario y contraseña
    $sql = "SELECT * FROM usuarios WHERE username = ? AND password = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Usuario encontrado
        $row = $result->fetch_assoc();
        $perfil_id = $row['perfil_id']; 
        $response = [
            'success' => true,
            'message' => 'Autenticación exitosa',
            'perfil_id' => $perfil_id,
            'id' => $row['id'] //  devolver el ID del usuario
        ];
    } else {
        // Usuario no encontrado
        $response = [
            'success' => false,
            'message' => 'Usuario o contraseña incorrectos'
        ];
    }

    $stmt->close();
} else {
    // Datos POST no están presentes
    $response = [
        'success' => false,
        'message' => 'Usuario y contraseña son requeridos'
    ];
}

$conn->close();

// Log de la respuesta enviada
error_log("Respuesta enviada: " . json_encode($response));

echo json_encode($response);
?>
