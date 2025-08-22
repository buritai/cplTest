import { Sys } from "./Sys.js";
import { Emmitter } from "./Emmitter.js";
import { LevelMap } from "./LevelMap.js";

export class MapManager {

    static create() {
        return new MapManager();
    }

    constructor() {
        this._maps = [];
        Emitter.call(this);
        this.init();
    }    
    
    init() {
        this.addEventListener("#sceneLoaded", ))
        dispatchEvent(new CustomEvent("#updateSharingUrl", changeData));

    }

    /**
     * Carga el mapa con el mapId requerido
     * @param {string} mapId
     * @return void
     */
    loadMapForId(mapId) {
        let lvlDescriptor = this.levelDescriptorFor(mapId);
        if(!lvlDescriptor) throw Error("Imposible cargar mapa:" + mapId);
        Engine.load(GLOBAL.ENGINE_DATA_PATH + "/" + lvlDescriptor.file, true, 
                (lvlDescriptor) => { this.setupScene(lvlDescriptor)} );
    }

    /**
     * Setup de la escena recientemente cargada
     * @param {*} params 
     */
    setupScene(params) {
        IO.log(params);              
        CScene = Sys.engine.getScene();
        CMap = LevelMap.createWith(CScene);
        let data = {
            map: CMap
        };
        this.dispatchEvent(new CustomEvent("#sceneLoaded", data));
    }

    /**
     * Obtiene el level descriptor
     * 
     * @access public
     * @param {string} mapId 
     * @returns {object}
     */
    levelDescriptorFor(mapId) {
        let lvlDescriptor = GLOBAL.LEVELS.find((lvlD) => lvlD.id == mapId);
        return lvlDescriptor;
    }
}