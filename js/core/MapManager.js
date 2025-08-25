import { Sys } from "./Sys.js";
import { JSObject } from "./JSObject.js";
import { LevelMap } from "./LevelMap.js";

export class MapManager extends JSObject {

    static create() {
        return new MapManager();
    }

    constructor() {
        super();
        this._maps = [];
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
        Engine.OnLoadingComplete = function() {
            self.setupScene(Engine.getScene(), lvlDescriptor);
        };
        Engine.load('copperlichtdata/' + lvlDescriptor.file, true);
        
    }

    /**
     * Setup de la escena recientemente cargada
     * @access private
     * @param {object} lvlDescriptor 
     */
    setupScene(scene, lvlDescriptor) {
        let self = this;        
        CScene = scene;
        CMap = LevelMap.createWith(CScene);
        // self.setupSceneWith(CSene, lvlDescriptor.sceneProperties);        
        "#sceneLoaded"
            .asEventWith({scene: CScene})
            .dispatchFor(self);
        "#mapLoaded"
            .asEventWith({ map: CMap })
            .dispatchFor(self);
        //this.dispatchEvent(new CustomEvent("#sceneLoaded", {scene: "CScene"}));
        //this.dispatchEvent(new CustomEvent("#mapLoaded", {scene: "CMap"}));
        //this.dispatchEvent( "#sceneLoaded".asEventWith({scene: CScene}) );
        //this.dispatchEvent( "#mapLoaded".asEventWith( { map: CMap }) );
    }

    /**
     * Setea propiedades por defualt de la escena
     * @param {CL3D.Scene} scene 
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