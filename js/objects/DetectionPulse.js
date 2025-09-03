import { EnviromentObject } from "EnviromentObject.js";
import { MovingObject } from "./MovingObject";


class DetectionPulse extends EnviromentObject {

    /**
     * Crea una instancia del receptor
     * @param {number} fP force propagation 
     * @param { MovingObject } emmiter 
     */
    create(fP, emmiter = null) {
        let pulse = new DetectionPulse();
        pulse.propagation = fP;
        pulse.emitter = emmiter;
    }
    
    constructor() {
        super();
        this.A0 = 1;      // Intensidad inicial (se usará para opacidad)
        this.alpha = 0.02; // Coeficiente de atenuación para opacidad
        this.speed = 2;    // Velocidad de expansión (pixeles por frame)
        this.steps = 0;     // pasos de propagacion
        this.maxRadius = 300;
        this.radius = 5;
        this.emitter = null;
    }


    exec() {
        
    }






}