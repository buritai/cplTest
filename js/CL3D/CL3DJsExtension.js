
/**
 * Retorna un objeto CL3D.Vec3d
 * @returns {CL3D.Vec3d}
 */
Array.prototype.asVect3d = function() {
    if (this.length < 3) {
      throw new Error('El array debe tener al menos 3 elementos para convertirlo en un CL3D.Vect3d');
    }   
    
    let notNumber = (isNaN(this[0]) || isNaN(this[1]) ||  isNaN(this[2]) );
    if(notNumber) {
        throw new Error('El array debe tener al menos 3 elementos numericos para convertilo un CL3D.Vect3d');
    }
    return new CL3D.Vect3d(this[0], this[1], this[2]);  
}


/**
 * Retorna un objeto CL3D.Vec3d
 * @returns {CL3D.Vec3d}
 */
Array.prototype.asVect2d = function() {
    if (this.length < 2) {
      throw new Error('El array debe tener al menos 3 elementos para convertirlo en un CL3D.Vect2d');
    }    
    let notNumber = (isNaN(this[0]) || isNaN(this[1]) );
    if(notNumber) {
        throw new Error('El array debe tener al menos 2 elementos numericos para convertilo un CL3D.Vect2d');
    }
    return new CL3D.Vect2d(this[0], this[1]);  
}

/**
 * Retorna la distincia euclidiana entre dos puntos
 * @returns {number}
 */
Array.prototype.distance = function() {
    if (this.length != 2) {
      throw new Error('El array debe tener 2 elementos para sacar la distancia');
    }    
    let isPoints2d = (this[0] instanceof CL3D.Vect2d && this[1] instanceof CL3D.Vect2d );
    let isPoints3d = (this[0] instanceof CL3D.Vect3d && this[1] instanceof CL3D.Vect3d );
    
    if(isPoints2d) {
      // distancia euclidiana 2d
      // punto y centro son objetos con propiedades x, y, z
      let a = this[0];
      let b = this[1];
      let dx = b.X - a.X;
      let dy = b.Y - a.Y;
      return Math.sqrt(dx * dx + dy * dy);
    }
    if(isPoints3d) {
      // distancia euclidiana 2d
      // punto y centro son objetos con propiedades x, y, z
      let a = this[0];
      let b = this[1];
      let dx = b.X - a.X;
      let dy = b.Y - a.Y;
      let dz = b.Z - a.Z;
      return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }     
    throw new Error('El array debe tener al menos 2 en el espacio o en el plano');    
}


/** 
 * Retorna el vector apuntando desde el receptor a otherPoint
 * @public 
 * @param {CL3D.Vect3d} otherPoint
 * @returns {CL3D.Vect3d}
 */
CL3D.Vect3d.prototype.pointingTo = function(otherPoint)
{
  return [
      otherPoint.X - this.X,
      otherPoint.Y - this.Y,
      otherPoint.Z - this.Z].asVect3d();
}

/** 
 * Retorna el vector direccion normalizado apuntando desde el receptor a otherPoint
 * @public 
 * @param {CL3D.Vect3d} otherPoint
 * @returns {CL3D.Vect3d}
 */
CL3D.Vect3d.prototype.normalizedPointingTo = function(otherPoint)
{
  return this.pointingTo(otherPoint).getNormalized();
}


