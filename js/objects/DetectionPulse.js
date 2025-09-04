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
        pulse.emitter = emitter;
        if(emitter) {
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

    /**
     * Getter coeficiente de atenuación
     * @returns {number}
     */
    get alpha() {
        return this._alpha;
    }

    /**
     * Setter coeficiente de atenuación
     * @param {number} value
     */
    set alpha(value) {
        this._alpha = value;
    }

    /**
     * Intensidad inicial, fuerza de propagación
     * @returns {number}
     */
    get A0() {
        return this._A0;
    }

    /**
     * Intensidad inicial, fuerza de propagación
     * @param {number} value
     */
    set A0(value) {
        this._A0 = value;
    }

    /**
     * Velocidad de propgacion
     * @returns {number}
     */
    get speed() {
        return this._speed;
    }

    /**
     * Pasos de propagacion
     * @param {number} value
     */
    set speed(value) {
        this._speed = value;
    }

    /**
     * Pasos de propagacion
     * @return {number}
     */
    get steps() {
        return this._steps;
    }

    /**
     * Pasos de propagacion
     * @param {number} value
     */
    set steps(value) {
        this._steps = value;
    }

    /**
     * Maximo radio de propagacion
     * @returns {number} 
     */
    get maxRadius() {
        this._maxRadius;
    }

    /**
     * Radio actual de propagacion
     * @returns {number} 
     */
    get radius() {
        this.radius;
    }

    /**
     * Radio actual de propagacion
     * @param {number} value
     */
    set radius(value) {
        this.radius;
    }

    /**
     * Esfera actual de propagación
     * @returns {Sphere}
     */
    sphere() {
        let self = this;
        return Sphere.create(self.position, self.radius);
    }

    /**
     * Pulso se propaga y afecta el scene node
     * que wrappea
     */
    exec() {
        let self = this;
        // la propagación llego a su máximo, se debe sacar el pulso del environment
        if(self.radius > self.maxRadius) {
            self.active = false;
            return;
        }
        self.radius += self.speed;
        self.node.scale.set([self.radius, 0.01, self.radius].asVect3d())



    }






}