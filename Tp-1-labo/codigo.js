document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    let usuario = document.getElementById("usuario").value.trim();
    let contrasenia = document.getElementById("contrasenia").value.trim();
    let mensaje = document.getElementById("mensaje");

    if (!usuario || !contrasenia) {
        mensaje.style.color = "red";
        mensaje.textContent = "Usuario y Contraseña son obligatorios";
        return;
    }

    try {
        const response = await fetch(`http://181.111.166.250:8081/tp/login.php?user=${usuario}&pass=${contrasenia}`);
        const data = await response.json();

        if (data.respuesta === "OK") {
            mensaje.style.color = "green";
            mensaje.textContent = `${data.mje}, Redireccionando...`;

            setTimeout(() => window.location.href = "lista.html", 3000);
        } else {
            mensaje.style.color = "red";
            mensaje.textContent = data.mje;
        }
    } catch (error) {
        console.log("Error: ", error);
        mensaje.style.color = "red";
        mensaje.textContent = "Error en la conexión";
    }
});

