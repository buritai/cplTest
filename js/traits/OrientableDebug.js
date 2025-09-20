
// Definimos un "trait" como un objeto con métodos
class OrientableDebug {

    constructor() {
        let self = this;
        console.log("jojojojoj");
        if(Object.getOwnPropertyDescriptor(self, 'direction')) {
            self._directorNode = "directionNode";
            console.log("tiene direction",self._directorNode);
        }
        
    }
}
export {OrientableDebug}