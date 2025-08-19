
/**
 * Resize canvas to ratio 16:9
 * @returns void
 */
function resizeCanvas() {
    var canvas = document.getElementById('3darea');
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    // Calcula ancho basado en alto 16:9
    var canvasWidth = windowHeight * (16 / 9);

    if (canvasWidth > windowWidth) {
        // Si ancho calculado es mayor que ventana, usa ancho máximo y ajusta alto
        canvasWidth = windowWidth;
        canvas.height = canvasWidth * (9 / 16);
        canvas.width = canvasWidth;
    } else {
        canvas.width = canvasWidth;
        canvas.height = windowHeight;
    }
}

export {resizeCanvas}