
Para simular la propagación de la onda formando esferas concéntricas en JavaScript, se puede usar un canvas 2D para representar la proyección 2D de estas esferas. Cada esfera concéntrica representa un frente de onda con su intensidad atenuada según la distancia.

El ejemplo siguiente dibuja círculos concéntricos que se expanden con el tiempo, donde el radio aumenta y la opacidad (intensidad) disminuye para simular la atenuación:

```javascript
const canvas = document.createElement('canvas');
canvas.width = 600;
canvas.height = 600;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const A0 = 1;      // Intensidad inicial (se usará para opacidad)
const alpha = 0.02; // Coeficiente de atenuación para opacidad
const speed = 2;    // Velocidad de expansión (pixeles por frame)
let time = 0;
const maxRadius = 300;

// Cada elemento representa una esfera con un radio inicial y tiempo de creación
let spheres = [];

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Crear nuevas esferas cada cierto tiempo para simular frentes de onda
  if (time % 15 === 0) { // cada 15 frames aproximadamente
    spheres.push({ radius: 0 });
  }
  
  // Dibujar todas las esferas y actualizar su radio
  spheres.forEach((sphere, index) => {
    sphere.radius += speed;
    if (sphere.radius > maxRadius) {
      spheres.splice(index, 1); // eliminar esferas muy grandes
      return;
    }
    
    // Atenuación de la esfera con la distancia (radio)
    const opacity = A0 * Math.exp(-alpha * sphere.radius);
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, sphere.radius, 0, 2 * Math.PI);
    ctx.strokeStyle = `rgba(0, 0, 255, ${opacity.toFixed(2)})`; // color azul con opacidad
    ctx.lineWidth = 2;
    ctx.stroke();
  });
  
  time++;
  requestAnimationFrame(draw);
}

draw();
```


### Explicación

- Se usa un array `spheres` para almacenar cada frente de onda (esfera) con su radio.
- Cada 15 frames se añade una nueva esfera con radio 0 que empieza a expandirse.
- En cada frame se actualiza el radio de cada esfera según la velocidad `speed`.
- La opacidad del trazo se atenúa exponencialmente con el radio para simular la pérdida de intensidad.
- Se eliminan las esferas cuando superan un máximo de radio para evitar dibujar indefinidamente.

Esta simulación da la impresión de ondas que se propagan en todas las direcciones formando esferas concéntricas que se debilitan al crecer.

¿Se desea que genere un código similar para onda 3D con WebGL o alguna otra visualización?

