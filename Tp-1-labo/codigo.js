
//Cargar eventos del DOM--
document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formularioIngreso');
    formulario.addEventListener('submit', validarIngreso);
});


//Función para validar ingreso de usuario--
async function validarIngreso(event) {
    event.preventDefault();
    
    const usuario = document.getElementById('usuario').value;
    const clave = document.getElementById('clave').value;
    

    const url = `http://181.111.166.250:8081/tp/login.php?user=${encodeURIComponent(usuario)}&pass=${encodeURIComponent(clave)}`;
    
    try{
        const rtaObtenida = await fetch(url);
        const dato = await rtaObtenida.json();

        if (dato.respuesta === "OK") {
            alert(dato.mje);
            window.location.href = "lista.html"; 
        } else {
            alert(dato.mje);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al procesar la solicitud. Intente nuevamente.');
    }
}