
import { Sys } from "./Sys.js";
import { Emitter } from "./Emitter.js";


export class Game {

    static create() {
        return new Game();
    }

    constructor() {        
        this._mainMenu = null;
        this._playing = false;

        this.init();
        Emitter.call(this);
    }

    init() {        
        //this.addEventListener("#onMapLoaded",)
    }

    /**
     * Arranca el juego
     */
    start() {
        IO.show("Starting ........");
        MapMngr.loadMapForId("Intro");
        //CMap = MapMngr.loadMapForId("intro");
        //CScene = CMap.scene;


    }
}

