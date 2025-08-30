import { JSObject } from "./JSObject.js";
import { CL3DSoundManager } from "../CL3D/CL3DSoundManager.js";

class SoundManager extends JSObject{

    static create() {
        return new SoundManager();
    }

    constructor() {
        super();
        this.pausedForInit = false;
    }

    init() {
        CL3D.gSoundManager = CL3DSoundManager.from(CL3D.gSoundManager);
        this.pausedForInit = true;
        document.addEventListener("click", () => {
            if(this.pausedForInit) {
                this.pausedForInit = false;
                CL3D.gSoundManager.canPlay = true;
                CL3D.gSoundManager.playAllPaused();
            }
                
        });

    }
}
export { SoundManager }