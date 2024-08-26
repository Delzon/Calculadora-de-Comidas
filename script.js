function obtenerFechaActual() {
    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, '0');
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const anio = hoy.getFullYear();
    return `${anio}-${mes}-${dia}`;
}

function establecerFechaActual() {
    const hoy = obtenerFechaActual();
    document.getElementById("fechaInicio").value = hoy;
    document.getElementById("fechaFin").value = hoy;
}

function restablecerValores() {
    establecerFechaActual();
    document.getElementById("vecesPorDia").value = 2;
    document.getElementById("porcionesInicio").value = 1;
    document.getElementById("porcionesFin").value = 0;
    document.getElementById("porcionesTotales").value = 0;
    document.getElementById("resultado").innerText = "";
}

function calcularDiasYComidas() {
    const fechaInicio = new Date(document.getElementById("fechaInicio").value);
    const fechaFin = new Date(document.getElementById("fechaFin").value);
    const vecesPorDia = parseInt(document.getElementById("vecesPorDia").value);
    const porcionesInicio = parseInt(document.getElementById("porcionesInicio").value);
    const porcionesFin = parseInt(document.getElementById("porcionesFin").value);
    const porcionesTotales = parseInt(document.getElementById("porcionesTotales").value);

    if (fechaInicio && fechaFin && vecesPorDia > 0) {
        const dias = Math.max((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24) + 1, 0);

        const comidasIntermedias = Math.max(dias - 2, 0) * vecesPorDia;

        const comidasTotales = comidasIntermedias + porcionesInicio + porcionesFin;

        const porcionesRestantes = porcionesTotales - comidasTotales;

        let fechaFinComida = new Date(fechaInicio);
        let porcionesDisponibles = porcionesTotales;
        let porcionesDelDiaAntesDeAgotarse = porcionesTotales;

        porcionesDisponibles -= porcionesInicio;

        while (porcionesDisponibles > 0 && fechaFinComida <= fechaFin) {
            porcionesDelDiaAntesDeAgotarse = porcionesDisponibles;

            fechaFinComida.setDate(fechaFinComida.getDate() + 1);

            if (fechaFinComida <= fechaFin) {
                porcionesDisponibles -= vecesPorDia;
            }
        }

        const fechaFinComidaFormateada = fechaFinComida.toISOString().split('T')[0];
        
        const mensajePorciones = porcionesRestantes < 0 
            ? `Faltan ${-porcionesRestantes} porciones en total.` 
            : `Sobran ${porcionesRestantes} porciones en total.`;
        
        const mensajeFinal = porcionesRestantes < 0 
            ? `La comida se acabará el ${fechaFinComidaFormateada} con ${Math.max(porcionesDelDiaAntesDeAgotarse, 0)} porciones disponibles.` 
            : '';

        document.getElementById("resultado").innerHTML = 
            `${mensajePorciones}<br>${mensajeFinal}`;
    } else {
        document.getElementById("resultado").innerText = "Por favor, selecciona ambas fechas y asegúrate de que las veces por día y las porciones sean mayores que 0.";
    }
}

window.onload = establecerFechaActual;
