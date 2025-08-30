
import { JSObject } from "./JSObject.js";
import { Sys } from "./Sys.js";
import { CL3DWalkCircleAnimator } from "../CL3D/CL3DWalkCircleAnimator.js";



class Game extends JSObject {

    static create() {
        return new Game();
    }

    constructor() {  
        super();      
        this._menuActive = null;
        this._playing = false;        
        this.init();        
    }

    init() {
        let self = this;        
        
    }

    /**
     * Arranca el juego
     */
    doBegin() {
        let self = this;
        IO.show("Starting ........");
        IO.show("mapLoaded ........");        
        MapMngr.addEventListener("#mapLoaded", (event) => {            
            self.initEngine();
            self.test();
        });
        MapMngr.loadMapForId("Intro");
    }

    initEngine() {
        IO.log(">>initEngine");        
       

        //if(!Engine.initRenderer()) throw Error("Imposible arrancar engine");

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
    }
}
export { Game }
