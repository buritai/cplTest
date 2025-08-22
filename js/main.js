import { resizeCanvas } from "./utils.js";
import { Emitter } from "./core/Emitter.js"
import { Game } from "./core/Game.js";
import { LevelMap } from "./core/LevelMap.js";
import { InputController } from "./core/InputController.js";
import { MapManager } from "./core/MapManager.js";
import { SoundManager } from "./core/SoundManager.js";
import { defaults } from "./defaults.js";

window.addEventListener('resize', resizeCanvas);
window.addEventListener('load', resizeCanvas);

/**
 * Copperlitch engine.
 * Engine global var.
 * 
 * @access global  
 * @type {CL3D.CopperLicht} */
window.Engine = null;


/**
 * Escena actual.
 * CScene global var.
 * 
 * @access global  
 * @type {CL3D.Scene} */
window.CScene = null;

/**
 * Mapa actual.
 * Cmap global var.
 * 
 * @access global  
 * @type {LevelMap} */
window.CMap = null;


/**
 * MapMngr encargado de manejar la administracion de mapas/scenes.
 * MapMngr global var.
 * 
 * @acces global
 * @type {MapManager} */
window.MapMngr = null; 

/**
 * IOCOntroller entrada salida no-grafica.
 * IOCOntroller global var.
 * 
 * @acces global
 * @type {InputController} */
window.IOController = null;

/**
 * SndMngr manejo de sonido.
 * SndMngr global var.
 * 
 * @acces global
 * @type {SoundManager} */
window.SndMngr = null; 

/**
 * CGame representa el juego que orquesta la animacion.
 * CGame global var.
 * 
 * @acces global
 * @type {SoundManager} */
window.CGame = null;



/**
 * @acces global
 */
window.GLOBAL = defaults;

class System {

    static defaults = GLOBAL;

    static create() {
        return new System();
    }

    constructor() {
        Emitter.call(this);
    }
    
    init() {
        IOController = InputController.create();
        IOController.print(">> System init.");        
        IOController.init();
        IOController.print(">> IOController init.");

        MapMngr = MapManager.create();
        MapMngr.init();
        IOController.print(">> MapManager init."); 

        SndMngr = SoundManager.create(); 
        SndMngr.init();
        IOController.print(">> SoundManager init.");

        IOController.print(">> CopperLicht init.");
        Engine = new CL3D.CopperLicht('3darea');

        
        CGame = Game.create();
        CGame.init();
        IOController.print(">> Game init.");

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


var system = System.create();
system.init();

