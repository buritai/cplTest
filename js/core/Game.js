
import { Emitter } from "./Emitter.js";
export class Game {

    static create() {
        return new Game();
    }

    constructor() {        
        this._mainMenu = null;
        this._playing = false;
        Emitter.call(this);
    }

    init() {        
        //this.addEventListener("#onMapLoaded",)
    }

    /**
     * Arranca el juego
     */
    start() {
        IOController.log("Starting ........");
        CMap = MapMngr.loadMapForId("Intro");
        CScene = CMap.scene;


    }
}

