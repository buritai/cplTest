import { Sys } from "./Sys.js";
import { Emitter } from "./Emitter.js";
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
    
    init() {}

    /**
     * Carga el mapa con el mapId requerido
     * @param {string} mapId
     * @return void
     */
    loadMapForId(mapId) {
        let self = this;
        let lvlDescriptor = this.levelDescriptorFor(mapId);
        if(!lvlDescriptor) throw Error("Imposible cargar mapa:" + mapId);
        Engine.load(GLOBAL.ENGINE_DATA_PATH + "/" + lvlDescriptor.file, true, 
                () => { self.setupScene(lvlDescriptor)} );
    }

    /**
     * Setup de la escena recientemente cargada
     * @access private
     * @param {object} lvlDescriptor 
     */
    setupScene(lvlDescriptor) {
        let self = this;
        IO.log(lvlDescriptor);              
        CScene = Sys.engine.getScene();
        CMap = LevelMap.createWith(CScene);
        self.setupSceneWith(CSene, lvlDescriptor.sceneProperties);
        this.dispatchEvent(new CustomEvent("#sceneLoaded", {scene: CScene}));
        this.dispatchEvent(new CustomEvent("#mapLoaded", { map: CMap }));
    }

    /**
     * Setea propiedades por defualt de la escena
     * @param {CL3D,Scene} scene 
     * @param {object} properties 
     */
    setupSceneWith(scene, properties) {
        scene.ShadowMappingEnabled = true;
        scene.ShadowMapOpacity = 0.5;
        scene.ShadowMapResolution = 2048;
        scene.ShadowMapBias = 0.0001;
        scene.ShadowMapCameraViewDetailFactor = 0.1;
        
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