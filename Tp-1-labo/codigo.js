function loginPersonal() {
    // DATOS

    let usuario = document.getElementById("usuario").value;
    let contrasenia = document.getElementById("contrasenia").value;
    
    // URL contraseña y usuario

    let url = `http://181.111.166.250:8081/tp/login.php?user=${usuario}&pass=${contrasenia}`;

    // Hacer la petición GET
    fetch(url)
        .then(response => response.json()) 
        .then(data => {
           
            let mensaje = document.getElementById("mensaje");
            if (data.respuesta === "OK") {
                mensaje.style.color = "green";
                mensaje.textContent = data.mje + ", Redireccionando...";
               
                //Tiempo para que se abra la nueva pestaña 
                
                setTimeout(()=>{
                window.location.href="lista.html"},3000);
                
            } else {
                mensaje.style.color = "red";
                mensaje.textContent = data.mje;
            }
        })
        .catch(error => console.error("Error en la petición:", error));
}


