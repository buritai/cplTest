
/**
 * Retorna un objeto CL3D.Vec3d
 * @returns {CL3D.Vec3d}
 */
Array.prototype.asVect3d = function() {
    if (this.length < 3) {
      throw new Error('El array debe tener al menos 3 elementos para convertirlo en un CL3D.Vec3d');
    }   
    
    let notNumber = (isNaN(this[0]) || isNaN(this[1]) ||  isNaN(this[2]) );
    if(notNumber) {
        throw new Error('El array debe tener al menos 3 elementos numericos para convertilo un CL3D.Vec3d');
    }
    return new CL3D.Vect3d(this[0], this[1], this[2]);  
}


/**
 * Retorna un objeto CL3D.Vec3d
 * @returns {CL3D.Vec3d}
 */
Array.prototype.asVect2d = function() {
    if (this.length < 2) {
      throw new Error('El array debe tener al menos 3 elementos para convertirlo en un CL3D.Vec3d');
    }    
    let notNumber = (isNaN(this[0]) || isNaN(this[1]) );
    if(notNumber) {
        throw new Error('El array debe tener al menos 2 elementos numericos para convertilo un CL3D.Vec3d');
    }
    return new CL3D.Vect2d(this[0], this[1]);  
}

