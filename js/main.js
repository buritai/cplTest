import { resizeCanvas } from "./utils.js";
import { defaults } from "./defaults.js";
import { Sys } from "./core/Sys.js";


window.addEventListener('resize', resizeCanvas);
window.addEventListener('load', resizeCanvas);

/** Alias  */
const CEvent = CustomEvent;

/**
 * sys - variable global
 * @acces global
 */
window.sys = Sys.create();
sys.init();

