//Cargar eventos del DOM
document.addEventListener('DOMContentLoaded', function() {
    cargarDatos();
    document.getElementById('botonBusqueda').addEventListener('click', buscar);

})


//Funcion para obtener la lista de ususarios
async function cargarDatos(busqueda = '') {
    const url = `http://181.111.166.250:8081/tp/lista.php?action=BUSCAR${busqueda ? `&usuario=${encodeURIComponent(busqueda)}` : ''}`;
    
    try {
        const respuesta = await fetch(url);
        const texto = await respuesta.text();
        const datos = JSON.parse(texto);
        mostrarUsuarios(datos);

    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        document.getElementById('filasUsuarios').innerHTML = '<tr><td colspan="7">Error al cargar los datos</td></tr>';
    }
}

//Funcion para mostrar la lista de ususarios
function mostrarUsuarios(usuarios) {
    const filasUsuarios = document.getElementById('filasUsuarios');
    filasUsuarios.innerHTML = '';

    if(usuarios.length === 0) {
        filasUsuarios.innerHTML = '<tr><td colspan="7">No se encontraron usuarios</td></tr>';
        return;
    }
    
    usuarios.forEach(usuario => {
        const fila = document.createElement('tr');
        fila.style.backgroundColor = usuario.bloqueado === 'Y' ? '#fd9f8b' : '#cef8c6';
        
        fila.innerHTML = `
            <td>${usuario.id}</td>
            <td>${usuario.usuario}</td>
            <td>${usuario.bloqueado}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.apellido}</td>
            <td><button class="bloquear" onclick="cambiarEstado(${usuario.id}, 'Y')">Bloquear</button></td>
            <td><button class="desbloquear" onclick="cambiarEstado(${usuario.id}, 'N')">Desbloquear</button></td>
        `;

        filasUsuarios.appendChild(fila);
    })
}

//Funcion para buscar usuarios
function buscar() {
    const busqueda = document.getElementById("buscarUsuario").value;
    cargarDatos(busqueda);
}

//Funcion para cambiar el estado de un usuario
async function cambiarEstado(id, estado) {
    const url = `http://181.111.166.250:8081/tp/lista.php?action=BLOQUEAR&idUser=${id}&estado=${estado}`;
    try {
        await fetch(url);
        cargarDatos();

    } catch (error) {
        console.error('Error:', error);
        alert('Error al procesar la solicitud. Intente nuevamente.');
    }
}