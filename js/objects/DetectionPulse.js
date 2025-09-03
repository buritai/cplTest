import { EnviromentObject } from "EnviromentObject.js";
import { MovingObject } from "./MovingObject";


class DetectionPulse extends EnviromentObject {



    /**
     * Crea una instancia del receptor
     * @param {number} fP force propagation 
     * @param { MovingObject } emmiter 
     */
    static create(fP, emitter = null) {
        let pulse = new DetectionPulse();
        pulse.propagation = fP;
        pulse.emitter = emmiter;
        if(emmiter) {
            pulse.position = emitter.node.position;
        }

    }

    constructor() {
        super();
        this._A0 = 1;      // Intensidad inicial (se usará para opacidad)
        this._alpha = 0.02; // Coeficiente de atenuación para opacidad
        this._speed = 2;    // Velocidad de expansión (pixeles por frame)
        this._steps = 0;     // pasos de propagacion
        this._maxRadius = 300;
        this._radius = 5;

        this._emitter = null;
    }


    get alpha() {
        return this._alpha;
    }

    set alpha(value) {
        this._alpha = value;
    }

    get A0() {
        return this._A0;
    }

    set A0(value) {
        this._A0 = value;
    }

    exec() {
        
    }






}