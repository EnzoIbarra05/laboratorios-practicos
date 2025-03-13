// URL de la API de usuarios

const urlCarga = "http://181.111.166.250:8081/tp/lista.php?action=BUSCAR";


//Funcion para cargar todos los usuarios desde un principio

function cargarDatos() {

    fetch(urlCarga) 
        .then(response => response.json()) 
        .then(data => {
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

                if(persona.bloqueado==="N"){
                fila.style.backgroundColor="#cef8c6";
                }
                else{
                    fila.style.backgroundColor="#fd9f8b";
                }
            
            //inserto fila

                tablaBody.appendChild(fila);
            });
        })
        .catch(error => console.error("Error al obtener datos:", error)); // Capturar errores
}

window.onload = cargarDatos;


function buscar() {
   
    const busqueda = document.getElementById("buscando").value;


    const urlBusqueda = `http://181.111.166.250:8081/tp/lista.php?action=BUSCAR&usuario=${busqueda}`;

    fetch(urlBusqueda)
        .then(response => response.json())
        .then(data => {
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

                    if(persona.bloqueado==="N"){
                
                        fila.style.backgroundColor="#cef8c6";
                }
                    else{
                        fila.style.backgroundColor="#fd9f8b";
                    }
                  
                    tablaBody.appendChild(fila);
                });
            }
        })
        .catch(error => console.error("Error al hacer la solicitud:", error));
}



function bloquear(Idusuario) { 
    //Tomo el id de la persona a bloquear

    console.log("ID del usuario a bloquear:", Idusuario);

    //creo URL de bloqueo segun Id
    let urlBloqueo = `http://181.111.166.250:8081/tp/lista.php?action=BLOQUEAR&idUser=${Idusuario}&estado=Y`;

    //realizo la peticion
    
    fetch(urlBloqueo)
        .then(response => {
            console.log("Respuesta de la API:", response);
            return response.json();
        })
        .then(data => {
            console.log("Respuesta JSON:", data);
        })
        .catch(error => console.error("Error al bloquear:", error));
}


function desbloquear(Idusuario) { 
    console.log("ID del usuario a desbloquear:", Idusuario);
    let urlDesbloqueo = `http://181.111.166.250:8081/tp/lista.php?action=BLOQUEAR&idUser=${Idusuario}&estado=N`;
    fetch(urlDesbloqueo)
        .then(response => {
            console.log("Respuesta de la API:", response);
            return response.json();
    
        })
        .then(data => {
            console.log("Respuesta JSON:", data);
        })
        .catch(error => console.error("Error al bloquear:", error));
}