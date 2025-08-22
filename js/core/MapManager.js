
export class MapManager {

    static create() {
        return new MapManager();
    }

    constructor() {
        this._maps = [];
    }

    init() {}


    loadMapForId(mapId) {
        let lvlDescriptor = this.levelDescriptorFor(mapId);
        if(!lvlDescriptor) throw Error("Imposible cargar mapa:" + mapId);
        Engine.load(GLOBAL.ENGINE_DATA_PATH + "/" + lvlDescriptor.file, true, 
                (lvlDescriptor) => { this.setupScene(lvlDescriptor)} );
    }

    setupScene(params) {
        IOController.log(params);
        CScene = Engine.getScene();
        
    }

    /**
     * Obtiene el level descriptor
     * @param {string} mapId 
     * @returns 
     */
    levelDescriptorFor(mapId) {
        let lvlDescriptor = GLOBAL.LEVELS.find((lvlD) => lvlD.id == mapId);
        return lvlDescriptor;
    }
}