
class DebugTools {

    static create(subject) {
        let tools = new DebugTools(subject);
        return tools;
    }

    constructor(subject) {
        this._subject = subject;
        this._tools = {
            dirNode: null,
            dirLength: 20,
            hull: null,
            bbox: null        
        }
    }

    debugDirection() {
        let self = this;
        let subject = self._subject
        let tools = self._tools;

        // Vector dirección (por ejemplo, desde el origen hacia x=1, y=1, z=1)
        let origin = [0,0,0].asVect3d();
        let dir = subject.direction.multiplyWithScal(20);
        if(!tools.dirNode) {
            let stick = self.createDebugDirection(
                origin,
                dir,
                0.1, // grosor del vector
            null
            );
            // Añadir nodo a la escena
            CScene.getRootSceneNode().addChild(stick);
            subject.node.addChild(stick);
            tools.dirNode = stick;
        } else self.updateDebugDirection();
    }

    updateDebugDirection() {
        let self = this;
        let subject = self._subject
        let tools = self._tools;

        
        let directionVector = subject.direction.multiplyWithScal(tools.dirLength)
        let stick = tools.dirNode;
        if (!stick) return;

        // Recalcular rotación
        let up = [0, 1, 0].asVect3d(); // vector "arriba" de referencia
        let rotation = directionVector.asDegreeRotation(up);
        stick.Rot = rotation;
        
        // Posicionar el cubo en el punto MEDIO entre inicio y fin
        // (porque el cubo está centrado en su origen)
        let startPoint = [0,0,0].asVect3d();
        let midpoint = startPoint.add(directionVector.multiplyWithScal(0.5));
        stick.Pos = midpoint;
    }

    createDebugDirection(startPoint, directionVector, thickness = 0.1, color = null) {
        
        // 1. Crear cubo (primitiva de CopperLicht)
        let stick = new CL3D.CubeSceneNode(1.0,1.0,1.0); // tamaño base 1x1x1
    
        // 2. Calcular rotación para alinear el eje Y del cubo con la dirección
        // En CopperLicht, el cubo por defecto tiene Y como "arriba", así que lo rotamos para que Y siga la dirección
        let up = [0, 1, 0].asVect3d(); // vector "arriba" de referencia
        let rotation = directionVector.asDegreeRotation(up);
        stick.Rot = rotation;

        // 3. Escalar el cubo:
        // - En Y: para que su longitud = magnitud del vector
        // - En X y Z: para que tenga un grosor fino (como una línea 3D)
        var length = directionVector.getLength();
        stick.Scale = new CL3D.Vect3d(thickness, length, thickness);

        // 4. Posicionar el cubo en el punto MEDIO entre inicio y fin
        // (porque el cubo está centrado en su origen)
        let midpoint = startPoint.add(directionVector.multiplyWithScal(0.5));
        stick.Pos = midpoint;
        stick.getMaterial(0).Tex1 = Engine.getTextureManager().getTexture("assets/debug_material.jpg", true);

        return stick;
    }    
}
export {DebugTools}



