<?php
// db_config.php
$host = 'localhost'; 
$db = 'registro_visitantes_db';
$user = 'root'; 
$pass = ''; 

// Crear conexión
$conn = new mysqli($host, $user, $pass, $db);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
