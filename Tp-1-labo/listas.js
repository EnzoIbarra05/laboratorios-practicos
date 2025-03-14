// Se llama a la funcion cargar datos al cargar el html/DOM
document.addEventListener("DOMContentLoaded", cargarDatos);

// Funcion para cargar todos los usuarios desde un principio
async function cargarDatos() {
    try {
        const response = await fetch(`http://181.111.166.250:8081/tp/lista.php?action=BUSCAR`);
        const data = await response.json();

        //llamo a la tabla a completar
        let tablaBody = document.getElementById("tabla-body");

        //Limpio la tabla por si ya tenia datos
        tablaBody.innerHTML = ""; 

        // Recorro el JSON e inserto la info
        Object.values(data).forEach(persona => {
            let fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${persona.id}</td>
                <td>${persona.usuario}</td>
                <td>${persona.bloqueado}</td>
                <td>${persona.nombre}</td>
                <td>${persona.apellido}</td>
                <td><button onclick="bloquear('${persona.id}')" style="background-color: red;color:white">Bloquear</button></td>
                <td><button onclick="desbloquear('${persona.id}')" style="background-color: green;color:white">Desbloquear</button></td>
            `;

            // Verifico el color de la fila si esta bloqueado o no
            fila.style.backgroundColor = persona.bloqueado === "N" ? "#cef8c6" : "#fd9f8b";
            
            //inserto fila
            tablaBody.appendChild(fila);
        });
    } catch (error) {
        console.error("Error al obtener datos:", error)
    }
}

// Función flecha al escuchar el 'submit' del form. de busqueda
document.getElementById('formBuscar').addEventListener('submit', async (e) => {
    e.preventDefault();

    const busqueda = document.getElementById("buscando").value.trim();

    if (!busqueda) {alert("Ingrese un usuario")};

    try {
        const response = await fetch(`http://181.111.166.250:8081/tp/lista.php?action=BUSCAR&usuario=${busqueda}`);
        const data = await response.json();
        
        let tablaBody = document.getElementById("tabla-body");
        tablaBody.innerHTML = "";

        // Verifico si hay 'data' disponible
        if (Object.values(data).length === 0) {
            alert("No se encontraron resultados.");
            cargarDatos();
        } else {
            //si la hay devuelvo lo encontrado
            Object.values(data).forEach(persona => {
                let fila = document.createElement("tr");
                fila.innerHTML = `
                <td>${persona.id}</td>
                <td id="${persona.usuario}">${persona.usuario}</td>
                <td>${persona.bloqueado}</td>
                <td>${persona.nombre}</td>
                <td>${persona.apellido}</td>
                <td><button onclick="bloquear('${persona.id}')" style="background-color: red;color:white">Bloquear</button></td>
                <td><button onclick="desbloquear('${persona.id}')" style="background-color: green;color:white">Desbloquear</button></td>
                `;

                //aqui tambien verifico color segun el estado de bloqueo
                fila.style.backgroundColor = persona.bloqueado === "N" ? "#cef8c6" : "#fd9f8b";
                
                tablaBody.appendChild(fila);
            });
        }
    } catch (error) {
        console.error("Error al hacer la solicitud:", error)
    }
});

// Función para bloquear usuario
async function bloquear(Idusuario) { 
    console.log("ID del usuario a bloquear:", Idusuario);
    try {
        const response = await fetch(`http://181.111.166.250:8081/tp/lista.php?action=BLOQUEAR&idUser=${Idusuario}&estado=Y`);
        const data = await response.json();

        console.log("Respuesta de la API:", response);
        console.log("Respuesta JSON:", data);

        if (data.respuesta === "OK") {
            cargarDatos();
        }
        
    } catch (error) {
        console.error("Error al bloquear:", error)
    }
}

// Función para desbloquear usuario
async function desbloquear(Idusuario) { 
    console.log("ID del usuario a desbloquear:", Idusuario);
    try {
        const response = await fetch(`http://181.111.166.250:8081/tp/lista.php?action=BLOQUEAR&idUser=${Idusuario}&estado=N`);
        const data = await response.json();
        console.log("Respuesta de la API:", response);
        console.log("Respuesta JSON:", data);

        if (data.respuesta === "OK") {
            cargarDatos(); 
        }
    } catch (error) {
        console.error("Error al bloquear:", error)
    }
}