import { MovingObject } from "../objects/MovingObject.js";
import { DetectionPulse } from "../objects/DetectionPulse.js";


const OperationalMode = {
    PATROL: 'PATROL',
    ATTACK: 'ATTACK'
};

class SpyDrone extends MovingObject {

    static create() {
        let obj = new SpyDrone();
        obj.init();
        return obj;
    }

    constructor() {
        super();

        this._mode = OperationalMode.PATROL

        // Conjunto de potenciales objetivos
        // detectados en el ultimo pulso de detecccion
        this._targets = [];

        /**
         * El spydrone funciona con checkpoints y targets.
         * El funcionamiento basico es alcanzar el currentCK (current checkpoint)
         * un vez alcanzado toma de su lista circular de checkpoints el siguiente 
         * y lo pone como currentCk. Y asi sucesivamente.
         */
        this._checkPoints = []; // checkpoints para alcanzar
        this._currentCK = null;  // checkpoint actual

        this._lastPulse = null; // ultimo pulso emitido
        this._minAltitude = 1; // altitud minima de desplazamento
    }

    
    get minAltitude() {
        return this._minAltitude;
    }



    /**
     * @private
     */
    init() {
       
        
    }

    /**
     * Retorna true si el estado operacional es patrulla
     * @public
     * @returns {Boolean}
     */
    isPatrol() {
        return this._mode == OperationalMode.PATROL;
    }

    /**
     * Tiempo de vida del pulso sobre el enviroment
     * @returns {number}
     */
    defaultLifespanPulse() {
        return 10;
    }

    /**
     * Radio del pulso
     * @returns {number}
     */
    defaultRadiusPulse() {
        return 10;
    }

    /**
     * Propagación default del pulso
     * @returns {number}
     */
    defaultForcePropagation() {
        return 50;
    }

    /**
     * Fuerza propagación del pulso
     * @returns {number}
     */
    get forcePropagation() {
        return this.defaultForcePropagation();
    }


    set currentChekpoint(value) {
        this._currentCK = value;
    }

    get currentChekpoint() {
        return this._currentCK;
    }

    /**
     * Testea si tiene checkpoint actual
     * @private
     * @returns {boolean}
     */
    hasCheckpoint() {
        return (this._currentCK != null);
    }

    /**
     * Se mueve al checkpoint actual
     * @param {number} deltatime
     * @private
     */
    moveToCurrentCkPoint(deltatime) {
        let self = this;
        self.moveToCkPoint(this._currentCK, deltatime);
    }

    /**
     * Se mueve al checkpoint actual
     * @private
     * @param {CL3D.Vect3d} ckpoint
     * @param {number} deltatime
     */
    moveToCkPoint(ckpoint, deltatime) {
        let self = this;
        //deltatime = deltatime * 10;     
        let position = this.position;        
        if(ckpoint == null) return;

        const initialSpeedKmh = 200;
        let mps = (initialSpeedKmh * 1000) / 3600; // metros por segundo

       

        // Vector dirección (normalizada) hacia el destino limitado en altitud        
        const dir = position.normalizedPointingTo(ckpoint);

        // Distancia al destino
        const dist = position.getDistanceTo(ckpoint);
        if (dist < 0.01) return position;  // llegó o muy cerca

        // Velocidad variable según altura actual
        // Por ejemplo: velocidad = velocidadInicial * (1 - altura/maxAltura)
        // Esto hace que a 0 m sea 3 km/h y a 1 m sea 0 km/h (lento)
        const speedMps = mps; // *(1 - (position.Z / maxAltitude));

        // Distancia a mover en intervalo deltaTime
        const moveDist = speedMps * deltatime;

        // Nueva posición: mover en dirección normalizada la distancia calculada,
        // pero sin pasar el destino
        if (moveDist > dist) {
            return ckpoint;
        } else {
            let newPoint = [
                position.X + dir.X * moveDist,
                position.Y + dir.Y * moveDist,
                position.Z + dir.Z * moveDist    
            ].asVect3d();
            this.position = newPoint;
            console.log("checkpoint>> ", ckpoint.X,ckpoint.Y,ckpoint.Z);        
            console.log("newPoint>> ", newPoint.X,newPoint.Y,newPoint.Z);
            console.log("speed", moveDist);
            console.log('dist :>> ', dist);
            return newPoint;
        }

    }


    /**
     * Ejecuta turno del receptor. 
     * Comportamiento de acuerdo al modo operacional
     * @param {number} deltatime
     * @private
     */
    exec(deltatime) {
        let dt = deltatime;        
        let self = this;
        if(!self.node) return;
        
        if(self.isPatrol() && self.hasCheckpoint()) {     
            self.moveToCurrentCkPoint(dt);
            if(!self.lastPulse) {
                //self.emmitPulse();
            }
        }
    }

    /**
     * Emite un pulso de detección que
     * se propagara por el environment
     */
    emmitPulse() {
        let self = this;        
        let pulse = DetectionPulse.create(self);
        self.lastPulse = pulse;      
        self.env.spawnPulse(pulse);        
    }

    /**
     * La propagacion del ultimo pulso emitido
     * ha colapsado
     * @param {DetectionPulse}} pulse 
     */
    puseColapsed(pulse) {
        this.lastPulse = null;
    }
}
export {SpyDrone}