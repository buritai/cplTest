
/**
 * Asume como parametros de entrada un numero en radianes 
 * y retorna en grados
 * @param {number} radians 
 * @returns {number}
 */
Number.prototype.toDegrees = function() {
    return this * (180 / Math.PI);
}




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

/**
 * Extraer ángulos de Euler (rotación XYZ) desde el array receptor (matriz 3x3)
 * Fórmula estándar, evitando gimbal lock en ±90° en X.
 * @private
 * @param {Array[9]} m 
 * @returns {CL3D.Vect3d} 
 */
Array.prototype.toEulerDegrees = function () {
    let m = this;
    if(m.length != 9) throw new Error("Debe ser una matriz 3x3 representado como un arrya de 9 lugares");
        
    let sy = Math.sqrt(m[0] * m[0] + m[1] * m[1]);
    let singular = sy < 1e-6;

    let x, y, z;

    if (!singular) {
        x = Math.atan2(m[7], m[8]);
        y = Math.atan2(-m[6], sy);
        z = Math.atan2(m[3], m[0]);
    } else {
        x = Math.atan2(-m[5], m[4]);
        y = Math.atan2(-m[6], sy);
        z = 0;
    }

    // Convertir a grados
    return new CL3D.Vect3d(
        x * 180 / Math.PI,
        y * 180 / Math.PI,
        z * 180 / Math.PI
    );
}

/** 
 * Toma el vector receptor como eje de rotacion mas un angulo 
 * y retorna una matriz 3x3 de rotacion
 * @private 
 * @param {number} angRad
 * @returns {Array[9]}
 */
CL3D.Vect3d.prototype.axisAngleToMatrix = function(angRad)
{
    let self = this;
    let c = Math.cos(angRad);
    let s = Math.sin(angRad);
    let t = 1 - c;
    let x = self.X, y = self.Y, z = self.Z;

    // Matriz de rotación 3x3 (column-major para CopperLicht)
    return [
        t*x*x + c,   t*x*y - s*z, t*x*z + s*y,
        t*x*y + s*z, t*y*y + c,   t*y*z - s*x,
        t*x*z - s*y, t*y*z + s*x, t*z*z + c
    ];
}

/** 
 * Toma el vector receptor como direccion y retorna el mismo vector en terminos euler angles
 * @public 
 * @param {CL3D.Vect3d} dir
 * @returns {CL3D.Vect3d}
 */
CL3D.Vect3d.prototype.asDegreeRotation = function(upReference = [0,1,0].asVect3d())
{
  let self = this;

    // Normalizamos el vector de dirección
    var dir = self.getNormalized();

    // Vector "hacia arriba" local del objeto (por defecto, el eje Y del mundo)
    var up = upReference.getNormalized();

    // El eje hacia el que apunta el objeto originalmente (en este caso, Y = (0,1,0))
    var forwardDefault = [0,1,0].asVect3d(); // ¡IMPORTANTE! En CopperLicht, el cubo apunta su Y hacia "arriba"

    // Si el vector es casi paralelo al forwardDefault, evitamos inestabilidad
    if (Math.abs(forwardDefault.dotProduct(dir) - 1) < 0.0001) {
        // Ya está alineado, no rotar
        return new CL3D.Vect3d(0, 0, 0);
    }
    if (Math.abs(forwardDefault.dotProduct(dir) + 1) < 0.0001) {
        // Está en dirección opuesta → rotar 180° en X o Z
        return new CL3D.Vect3d(180, 0, 0);
    }

    // Calcular eje de rotación: producto cruz entre forwardDefault y dir
    let axis = forwardDefault.crossProduct(dir).getNormalized();

    // Calcular ángulo de rotación (en radianes)
    let angleRad = Math.acos(forwardDefault.dotProduct(dir));

    // Convertir a grados
    //var angleDeg = angleRad * 180 / Math.PI;

    // Convertir eje-ángulo a rotación Euler (esto es lo complicado...)
    // En lugar de eso, vamos a usar una matriz de rotación y extraer Euler

    // Creamos una matriz de rotación a partir de eje y ángulo
    let rotationMatrix = axis.axisAngleToMatrix(angleRad);

    // Convertimos la matriz a ángulos de Euler (XYZ, en grados)
    let eulerAngles = rotationMatrix.toEulerDegrees();
    return eulerAngles;  
}

/** 
 * Retorna true si es el vector origen
 * @public 
 * @returns {boolean}
 */
CL3D.Vect3d.prototype.isOrigin = function()
{
  retrun (this.X == 0.0 && this.Y == 0.0 && this.Z == 0.0);
}





/**
 * Quaternion
 * @public
 */
CL3D.Quaternion.fromDirection = function(normVect)
{
  
	  let forward = new CL3D.Vect3d(0, 0, 1); // Vector forward por defecto
    let v = forward.crossProduct(normVect);
    let w = Math.sqrt(forward.getLength() * forward.getLength() * normVect.getLength() * normVect.getLength()) + forward.dotProduct(normVect);

    let q = new CL3D.Quaternion();
    q.X = v.X;
    q.Y = v.Y;
    q.Z = v.Z;
    q.W = w;
    q.normalize();    
    return q;	
}



