import { resizeCanvas } from "./utils.js";
import { Game } from "./core/Game.js";
import { InputController } from "./core/InputController.js";
import { MapManager } from "./core/MapManager.js";
import { SoundManager } from "./core/SoundManager.js";
import { defaults } from "./defaults.js";

window.addEventListener('resize', resizeCanvas);
window.addEventListener('load', resizeCanvas);



//startCopperLichtFromFile('3darea', 'copperlichtdata/shadows.ccbjs', 'Loading $PROGRESS$...<br/><br/><img style="max-width:50%" src="copperlichtdata/coppercubeloadinglogo.png" />', 'Error: This browser does not support WebGL (or it is disabled).<br/>See <a href=\"http://www.ambiera.com/copperlicht/browsersupport.html\">here</a> for details.', false, false, "#000000");

// Global. create the 3d engine	global variable	
window.Engine = null;

// Global. Current Scene global variable
window.CScene = null;

/**
 * MManager
 * @acces global
 */
window.MManager      = null; 

/**
 * @acces global
 */
window.IOController    = null;

/**
 * @acces global
 */
window.SndManager      = null; 

/**
 * @acces global
 */
window.CGame           = null;

/**
 * @acces global
 */
window.GLOBAL = defaults;

class System {

    static defaults = GLOBAL;
    
    static init() {
        IOController = InputController.create();
        IOController.print(">> System init.");        
        IOController.init();
        IOController.print(">> IOController init.");

        MManager = MapManager.create();
        MManager.init();
        IOController.print(">> MapManager init."); 

        SndManager = SoundManager.create(); 
        SndManager.init();
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



System.init();

