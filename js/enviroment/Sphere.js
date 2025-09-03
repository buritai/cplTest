import { JSObject } from "../core/JSObject";

class Sphere extends JSObject {

    /**
     * Crea una instancia del receptor
     * @param {CL3DAnimator.Vect3d} center 
     * @param {number} radius 
     */
    create(center, radius) {
        let s = new Sphere();
        s.center = center;
        s.radius = radius;
        return s;        
    }

    constructor() {
        super();

        this.center = null;
        this.radius = null;
        
        this.init();
    }

    init() {
        this.center = [0,0,0].asVect3d();
        this.radius = 5;        
    }

    /**
     * Retorna true si el receptor contiene el point
     * @param {*} point 
     */
    containsPoint(point) {
        return this.pointInSphere(point, this.center, this.radius);
    }

    /**
     * Retorna true si el punto p esta contenido en la esfera
     * @param {CL3D.Vect3d} p point
     * @param {Number} sc sphere point
     * @param {*} sr sphere radius
     */
    pointInSphere(p, sc, sr) {
        // distancia euclidiana
        // punto y centro son objetos con propiedades x, y, z
        let dx = p.x - c.x;
        let dy = p.y - c.y;
        let dz = p.z - c.z;
        let d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        return d <= sr;
    }
}