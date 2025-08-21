
export class Game {

    static create() {
        return new Game();
    }

    constructor() {

        this._currentMap = null;
        this._mainMenu = null;
        this._playing = false;
    }

    init(){

    }

    /**
     * Arranca el juego
     */
    start() {
        IOController.log("Starting ........");
        //this._currentMap = MManager.getMapForId("Intro");


    }
}

