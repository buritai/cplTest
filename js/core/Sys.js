
import { JSObject } from "./JSObject.js"
import { Game } from "./Game.js";
import { LevelMap } from "./LevelMap.js";
import { IOController } from "./IOController.js";
import { MapManager } from "./MapManager.js";
import { SoundManager } from "./SoundManager.js";
//import { defaults } from "../defaults.js";

class Sys extends JSObject {

    static defaults = GLOBAL;
    
    /** @type {CL3D.CopperLicht} */
    static engine = null;

    /** Escena actual  
     * @type {CL3D.Scene} */
    static cScene = null;    

    /**
     * Mapa actual.
     * @type {LevelMap} */
    static cMap = null;    
    
    /**
     * Map manager 
     * @type {MapManager} */
    static mapMngr = null; 
    
    
    /**
     * Sound manager, manejo de sonido.
     * @type {SoundManager} */
     static sndMngr = null;
    
    /**
     * CGame juego actual
     * @type {Game} */
    static cGame = null;
    
    
    static create() {
        return new Sys();
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

        CGame.doBegin();
    }
}
export {Sys}