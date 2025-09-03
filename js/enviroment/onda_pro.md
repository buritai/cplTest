# Propagacion de onda
## Conceptos clave

- Una onda esférica que se propaga desde un punto hace que la intensidad disminuya proporcionalmente a $\frac{1}{r^2}$ (donde $r$ es la distancia al origen) debido a la dispersión en el espacio tridimensional.
- Se puede agregar un factor de atenuación exponencial o lineal con la distancia o el tiempo para simular la pérdida de energía u otras causas físicas de atenuación.
- La forma matemática simplificada para la amplitud de la onda puede ser:

$$
A(r, t) = \frac{A_0}{r} \cdot e^{-\alpha r} \cdot \cos(k r - \omega t)
$$

donde $A_0$ es la intensidad inicial, $\alpha$ es el coeficiente de atenuación, $k$ es el número de onda, y $\omega$ la frecuencia angular.

Para animar la propagación, se puede incrementar el radio $r$ conforme avanza el tiempo y calcular la atenuación en función de este $r$.


## Ejemplo básico en JavaScript

```javascript
// Parámetros iniciales
const A0 = 1;             // Intensidad inicial
const alpha = 0.05;       // Coeficiente de atenuación
const c = 1;              // Velocidad de propagación (unidades/t)
const k = 2 * Math.PI;    // Número de onda
const omega = 2 * Math.PI; // Frecuencia angular

// Función que calcula la amplitud en una distancia r y tiempo t
function amplitude(r, t) {
  if (r === 0) return A0; // para evitar división por cero en r=0
  return (A0 / r) * Math.exp(-alpha * r) * Math.cos(k * r - omega * t);
}

// Simulación paso a paso
let t = 0;
const dt = 0.1;   // paso temporal
const maxR = 100; // máximo radio para simular

function simulateStep() {
  t += dt;
  for (let r = 1; r <= maxR; r++) {
    let amp = amplitude(r, t);
    console.log(`r = ${r}, t = ${t.toFixed(2)}, amplitude = ${amp.toFixed(4)}`);
    // Aquí se puede usar amplitude para actualizar gráficos, etc.
  }
}

// Llamar simulateStep periódicamente para animar la propagación
```

Este código simula la propagación de una onda esférica con atenuación exponencial en función de la distancia. La intensidad inicial $A_0$ se distribuye en el espacio esférico y se atenúa con coeficiente $\alpha$. Ajustando parámetros como $ \alpha$, la velocidad y la frecuencia, se puede adaptar a diferentes escenarios físicos.


# Propagacion de onda volumen (lineal)

