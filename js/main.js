import { resizeCanvas } from "./utils.js";
import { Sys } from "./core/Sys.js";

window.addEventListener('resize', resizeCanvas);
window.addEventListener('load', resizeCanvas);

/**
 * sys - variable global
 * @acces global
 */
window.sys = Sys.create();
sys.init();

