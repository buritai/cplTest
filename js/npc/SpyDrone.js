import { MovingObject } from "../objects/MovingObject.js";
import { DetectionPulse } from "../objects/DetectionPulse.js";
import { Queue } from "../core/Queue.js";


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
        this._checkPoints = Queue.create(); // checkpoints para alcanzar
        this._currentCKPoint = null;  // checkpoint actual

        this._lastPulse = null; // ultimo pulso emitido
        this._minAltitude = 1; // altitud minima de desplazamento
    }

    
    get minAltitude() {
        return this._minAltitude;
    }

    /**
     * Debug
     */
    get directionNode() {
        if(this._directionNode.Rot.isOrigin()) {
            if(this.direction) {
                this.directionNode.Rot = this.direction.asDegreeRotation(); 
            } 
        }
        return this._directionNode;

    }

    /**
     * Debug
     */
    set directionNode(sceneNode) {
        this._directionNode = sceneNode;
    }
    
    /**
     * @private
     */
    init() { }

    

    /**
     * Retorna true si el estado operacional es patrulla
     * @public
     * @returns {Boolean}
     */
    isPatrol() {
        return this._mode == OperationalMode.PATROL;
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
        this._currentCKPoint = value;
    }

    get currentChekpoint() {
        return this._currentCKPoint;
    }

    get checkpoints() {
        return this._checkPoints;
    }

    updateDebugTools() { }


    debugDirection() {
        let self = this;
        // Vector dirección (por ejemplo, desde el origen hacia x=1, y=1, z=1)
        let origin = [0,0,0].asVect3d();
        let dir = self.direction.multiplyWithScal(20);
        if(!self.debugTools.dir) {
            let stick = self.createDebugDirection(
                origin,
                dir,
                0.1, // grosor del vector
            null
            );
            // Añadir nodo a la escena
            CScene.getRootSceneNode().addChild(stick);
            self.node.addChild(stick);
            self.debugTools.dir = stick;
        } else self.updateDebugDirection(dir);
    }

    updateDebugDirection(directionVector) {
        let self = this;
        let stick = self.debugTools.dir;
        if (!stick) return;

        // Recalcular rotación
        let up = [0, 1, 0].asVect3d(); // vector "arriba" de referencia
        let rotation = directionVector.asDegreeRotation(up);
        stick.Rot = rotation;       
    }

    createDebugDirection(startPoint, directionVector, thickness = 0.1, color = null) {
        let self = this;
        //let scene = Engine.getScene();

        // 1. Crear cubo (primitiva de CopperLicht)
        let stick = new CL3D.CubeSceneNode(1.0,1.0,1.0); // tamaño base 1x1x1
    
        // 2. Calcular rotación para alinear el eje Y del cubo con la dirección
        // En CopperLicht, el cubo por defecto tiene Y como "arriba", así que lo rotamos para que Y siga la dirección
        let up = [0, 1, 0].asVect3d(); // vector "arriba" de referencia
        let rotation = directionVector.asDegreeRotation(up);
        stick.Rot = rotation;

        // 3. Escalar el cubo:
        // - En Y: para que su longitud = magnitud del vector
        // - En X y Z: para que tenga un grosor fino (como una línea 3D)
        var length = directionVector.getLength();
        stick.Scale = new CL3D.Vect3d(thickness, length, thickness);

        // 4. Posicionar el cubo en el punto MEDIO entre inicio y fin
        // (porque el cubo está centrado en su origen)
        var midpoint = startPoint.add(directionVector.multiplyWithScal(0.5));
        stick.Pos = midpoint;
        stick.getMaterial(0).Tex1 = Engine.getTextureManager().getTexture("copperlichtdata/default_skybox0.jpg", true);

        return stick;
    }

    /**
     * Testea si tiene checkpoint actual
     * @private
     * @returns {boolean}
     */
    hasCurrentCheckpoint() {
        let self = this;
        return (self.currentChekpoint != null);
    }

    addCheckpoint(chkpoint) {
        let self = this;
        self.checkpoints.push(chkpoint);
    }


    /**
     * Retorna el siguiente checkpoint de la cola 
     * circular de checkpoints
     * @returns {CL3D.Vect3d}
     */
    nextCheckpoint() {
        let self = this;
        let chkp = self.checkpoints.pop();        
        this.checkpoints.push(chkp);
        console.log("nextCheckpoint", chkp);
        return chkp;
    }

    /**
     * Se mueve al checkpoint actual
     * @param {number} deltatime
     * @private
     */
    moveToCurrentCkPoint(deltatime) {
        let self = this;
        let position = self.position;
        if(!self.hasCurrentCheckpoint() && self.checkpoints.notEmpty()) {
            self.currentChekpoint = self.nextCheckpoint();
            let dir = position.normalizedPointingTo(self.currentChekpoint);
            self.direction = dir;            
        }
        self.move(deltatime);
        
    }   

    /**
     * Se mueve de acuerdo a la direccion actual
     * @private
     * @param {number} deltatime
     */
    move(deltatime) {
        let self = this;
        //deltatime = deltatime * 10;
        let position = self.position;     
        
        const initialSpeedKmh = 550;
        let mps = (initialSpeedKmh * 1000) / 3600; // metros por segundo
        
        // Distancia al destino
        const dist = position.getDistanceTo(this.currentChekpoint);        
        if (dist < 100) {           
            self.currentChekpoint = null;
            return position;  // llegó o muy cerca
        } 

        // Velocidad variable según altura actual
        // Por ejemplo: velocidad = velocidadInicial * (1 - altura/maxAltura)
        // Esto hace que a 0 m sea 3 km/h y a 1 m sea 0 km/h (lento)
        const speedMps = mps; // *(1 - (position.Z / maxAltitude));

        // Distancia a mover en intervalo deltaTime
        const moveDist = speedMps * deltatime;

        

        // Nueva posición: mover en dirección normalizada la distancia calculada,
        // pero sin pasar el destino
        if (moveDist > dist) {
            return this._currentCKPoint;
        } else {
            let newPoint = [
                position.X + this.direction.X * moveDist,
                position.Y + this.direction.Y * moveDist,
                position.Z + this.direction.Z * moveDist    
            ].asVect3d();
            this.position = newPoint;            
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
        
        if(self.isPatrol()) {     
            self.moveToCurrentCkPoint(dt);

            if(!self.lastPulse) {
                //self.emmitPulse();
            }
        }
        self.updateDebugTools();        
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