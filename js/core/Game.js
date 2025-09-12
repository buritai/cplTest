
import { JSObject } from "./JSObject.js";
import { CL3DWalkCircleAnimator } from "../CL3D/CL3DWalkCircleAnimator.js";
import { Environment } from "../enviroment/Environment.js";
import {DetectionPulse} from "../objects/DetectionPulse.js";



class Game extends JSObject {

    static create() {
        return new Game();
    }

    constructor() {  
        super();      
        this._menuActive = null;
        this._playing = false;        
        this._env = null;                  
    }

    init() {
        let self = this;
        console.log('Engine>>', Engine);
        // Hooks varios desde copperlitch
        Engine.onAnimate = function() {
            console.log('Engine.onAnimate');
            self.doAnimate();

        }

        Engine.OnBeforeDrawAll = function() {
            self.doBeforeDrawAll();
        }        
    }

    /**
     * Otiene el entorno
     * @returns {Environment}
     */
    get env() {
        return this._env;
    }

    /**
     * Setea el entorno
     * @param {Environment} environment
     */
    set env(environment) {
        return this._env = environment;
    }

    /**
     * Activacion del receptor en cada frame de la animacion
     * @private
     */
    doAnimate() {
       
        console.log('doAnimate');
        // Acciones de NPC
        
        // Proyectiles

        // Sonidos

        // HUD (Head-Up Display)

        
    }

    /**
     * Activacion del receptor en cada frame 
     * antes de renderizar la escena
     * @private
     */
    doBeforeDrawAll() {
        console.log('doBeforeDrawAll');
        // Environment step
        if(this.env) {
            this.env.doStep();
        }
    }

    /**
     * Arranca el juego
     * @private
     */
    doBegin() {
        let self = this;
        IO.show("Starting ........");
        IO.show("mapLoaded ........");        
        MapMngr.addEventListener("#mapLoaded", (event) => {         
            self.initEngine();
            self.bindObjects(event.data.map.descriptor);
            self.test();
        });
        MapMngr.loadMapForId("Intro");
    }

    initEngine() {
        IO.log(">>initEngine");        
       

        //if(!Engine.initRenderer()) throw Error("Imposible arrancar engine");

    }

    /**
     * Enlaza los objetos definidos en el
     * descriptor de mapa/nivel (scene nodes en CopperCube) 
     * con alguna instancia de EnvironmentObject.
     * @param {object} lvlDescriptor
     */
    bindObjects(lvlDescriptor) {
        this.env = Environment.create();
        this.env.scene = CScene;
        this.env.terrain = CScene.getSceneNodeFromName("terrain");


    }

    test() {
        let lightNode = CScene.getSceneNodeFromName("Light1");
        let sound = CScene.getSceneNodeFromName("3DSound1");
        console.log(CL3D.gSoundManager);
        if(lightNode) {
            let radius = 100;
            let speed = 0.001;
            //let center = new CL3D.Vect3d(-17.888088, 48.038662, -2602.973877);
            //let center = new CL3D.Vect3d(-17.888088, 55.0, -2602.973877);
            let center = [-17.888088, 55.0, -2602.973877].asVect3d();
            //let direction = new CL3D.Vect3d(0, 1, 0);
            let direction = [0, 1, 0].asVect3d();        
            lightNode.addAnimator(new CL3DWalkCircleAnimator(center, radius, direction, speed));
        }
        let drone = SpyDrone.create();
        drone.environment = this.env;
        drone.node = CScene.getSceneNodeFromName("spyDrone");
        this.env.spawnObject(drone);

        let pulse = DetectionPulse.create();
        pulse.environment = this.env;
        pulse.node = CScene.getSceneNodeFromName("detectionPulse");
        this.env.spawnPulse(pulse);
    }
}
export { Game }
