
import { Emitter } from "./Emitter.js"
import { Game } from "./Game.js";
import { LevelMap } from "./LevelMap.js";
import { IOController } from "./IOController.js";
import { MapManager } from "./MapManager.js";
import { SoundManager } from "./SoundManager.js";
import { defaults } from "../defaults.js";

export class Sys {

    static defaults = GLOBAL;
    
    /** @type {CL3D.CopperLicht} */
    static engine = Engine;

    /** Escena actual  
     * @type {CL3D.Scene} */
    static cScene = CScene;    

    /**
     * Mapa actual.
     * @type {LevelMap} */
    static cMap = CMap;    
    
    /**
     * Map manager 
     * @type {MapManager} */
    static mapMngr = MapMngr; 
    
    
    /**
     * Sound manager, manejo de sonido.
     * @type {SoundManager} */
     static sndMngr = SndMngr;
    
    /**
     * CGame juego actual
     * @type {Game} */
    static cGame = CGame;
    

    static create() {
        return new Sys();
    }

    constructor() {
        Emitter.call(this);
        
    }
    
    init() {
        IO = IOController.create();
        IO.print(">> System init.");        
        IO.init();
        IO.print(">> IO init.");

        MapMngr = MapManager.create();
        MapMngr.init();
        IO.print(">> MapManager init."); 

        SndMngr = SoundManager.create(); 
        SndMngr.init();
        IO.print(">> SoundManager init.");

        IO.print(">> CopperLicht init.");
        Engine = new CL3D.CopperLicht('3darea');

        
        CGame = Game.create();
        CGame.init();
        IO.print(">> Game init.");

        CGame.start();
        
        if (Engine.initRenderer()) {
            var setupShadowScene = function () {
                CScene = Engine.getScene();
                    CScene.ShadowMappingEnabled = true;
                    CScene.ShadowMapOpacity = 0.5;
                    CScene.ShadowMapResolution = 2048;
                    CScene.ShadowMapBias = 0.0001;
                    CScene.ShadowMapCameraViewDetailFactor = 0.1;
                    //scene.setFog(true, CL3D.createColor(1, 23, 23, 23), 0.01);
                }
        }
        Engine.load('copperlichtdata/shadows.ccbjs', false, setupShadowScene); 
    }
}