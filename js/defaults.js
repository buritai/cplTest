
export let defaults = {
    ENGINE_DATA_PATH: "/copperlitchdata/",

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