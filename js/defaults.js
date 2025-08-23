
export let defaults = {
    ENGINE_DATA_PATH: "copperlichtdata",
    /** Descriptores de niveles */
    LEVELS: [
        {
            id: "Intro",
            file: "shadows.ccbjs",
            sceneProperties: {
                ShadowMappingEnabled: true,
                ShadowMapOpacity: 0.5,
                ShadowMapResolution: 2048,
                ShadowMapBias: 0.0001,
                ShadowMapCameraViewDetailFactor: 0.1
            }
        }
    ]
}

/**
 * Copperlitch engine.
 * Engine global var.
 *
 * @access global
 * @type {CL3D.CopperLicht} */
window.Engine = null;


/**
 * Escena actual.
 * CScene global var.
 *
 * @access global
 * @type {CL3D.Scene} */
window.CScene = null;

/**
 * Mapa actual.
 * Cmap global var.
 *
 * @access global
 * @type {LevelMap} */
window.CMap = null;


/**
 * MapMngr encargado de manejar la administracion de mapas/scenes.
 * MapMngr global var.
 *
 * @acces global
 * @type {MapManager} */
window.MapMngr = null;

/**
 * IO entrada salida no-grafica.
 * IO global var.
 *
 * @acces global
 * @type {IOController} */
window.IO = null;

/**
 * SndMngr manejo de sonido.
 * SndMngr global var.
 *
 * @acces global
 * @type {SoundManager} */
window.SndMngr = null;

/**
 * CGame representa el juego que orquesta la animacion.
 * CGame global var.
 *
 * @acces global
 * @type {SoundManager} */
window.CGame = null;

/**
 * @acces global
 */
window.GLOBAL = defaults;