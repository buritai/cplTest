import { resizeCanvas } from "./utils.js";
import { Game } from "./Game.js";
import { InputController } from "./InputController.js";
import { LevelManager } from "./LevelManager.js";
import { SoundManager } from "./SoundManager.js";

window.addEventListener('resize', resizeCanvas);
window.addEventListener('load', resizeCanvas);



//startCopperLichtFromFile('3darea', 'copperlichtdata/shadows.ccbjs', 'Loading $PROGRESS$...<br/><br/><img style="max-width:50%" src="copperlichtdata/coppercubeloadinglogo.png" />', 'Error: This browser does not support WebGL (or it is disabled).<br/>See <a href=\"http://www.ambiera.com/copperlicht/browsersupport.html\">here</a> for details.', false, false, "#000000");

// create the 3d engine	global variable	
var Engine = null;

// Current Scene global variable
var Scene = null;

var LvlManager      = null; 
var IOController    = null;
var SndManager      = null; 
var CGame           = null;

class System {

    static init() {
        IOController = InputController.create();
        IOController.print(">> System init.");        
        IOController.init();
        IOController.print(">> IOController init.");

        LvlManager = LevelManager.create();
        LvlManager.init();
        IOController.print(">> LevelManager init."); 

        SndManager = SoundManager.create(); 
        SndManager.init();
        IOController.print(">> SoundManager init.");

        IOController.print(">> CopperLicht init.");
        Engine = new CL3D.CopperLicht('3darea');

        
        CGame = Game.create();
        CGame.init();
        IOController.print(">> Game init.");
        
        if (Engine.initRenderer()) {
            var setupShadowScene = function () {
                Scene = Engine.getScene();
                    Scene.ShadowMappingEnabled = true;
                    Scene.ShadowMapOpacity = 0.5;
                    Scene.ShadowMapResolution = 2048;
                    Scene.ShadowMapBias = 0.0001;
                    Scene.ShadowMapCameraViewDetailFactor = 0.1;
                    //scene.setFog(true, CL3D.createColor(1, 23, 23, 23), 0.01);
                }
        }
        Engine.load('copperlichtdata/shadows.ccbjs', false, setupShadowScene); 
    }

}



System.init();

