

export class InputController {
    
    static create() {
        return new InputController();
    }

    constructor() {
        this.bannerConsole();
    }

    init() {

    }

    /**
    * Muestra el banner de bienvenida en consola
    *
    * @access private
    * @returns {void}
    */
    bannerConsole() {    
        let banner = [
            "%c  %c  %c  %c  %c Meltran v0.1 %c LordBreetai - https://lordbreetai.42web.io/",      
            "background: #77af85ff; font-size: 14px",
            "background: #159740ff; font-size: 14px",
            "background: #02290bff; font-size: 14px",
            "background: #d7be56; font-size: 14px",
            "color: #6fca00; background: #000000; font-size: 14px",
            "color: #ffffff; background: #000000"
        ];
        console.log.apply(console, banner);
    }

    basicHeader(text) {
        let header = [
            "%c %c %c" + text, 
            "background: #159740ff; font-size: 14px",
            "background: #02290bff; font-size: 14px",
            "color: #6fca00; background: #000000; font-size: 14px",
        ];
        return header;
    }

    logHeader(text) {
        let header = [
            "%c %c %c" + text, 
            "background: #159740ff; font-size: 14px",
            "background: #02290bff; font-size: 14px",
            "color: #4b6b24ff; background: #000000; font-size: 14px",
        ];
        return header;
    }

    print(text) {        
        console.log.apply(console, this.basicHeader(text));
    }

    log(text) {        
        console.log.apply(console, this.logHeader(text));
    }

}

