
import { Sys } from "./Sys.js";
import { Emitter } from "./Emitter.js";


export class Game {

    static create() {
        return new Game();
    }

    constructor() {        
        this._menuActive = null;
        this._playing = false;
        Emitter.call(this);
        this.init();        
    }

    init() {
        let self = this;        
        self.addEventListener("#onMapLoaded", (event) => {
            self.startAnimate();
        });
    }

    /**
     * Arranca el juego
     */
    doBegin() {
        IO.show("Starting ........");
        MapMngr.loadMapForId("Intro");
    }

    startAnimate() {
        if(!Engine.initRenderer()) throw Error("Imposible arrancar engine");

    }
}

