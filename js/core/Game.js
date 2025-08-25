
import { JSObject } from "./JSObject.js";
import { Sys } from "./Sys.js";


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
            self.initRender();
        });
        MapMngr.loadMapForId("Intro");
    }

    initRender() {
        IO.log(">>initRender");
        //if(!Engine.initRenderer()) throw Error("Imposible arrancar engine");

    }
}
export { Game }
