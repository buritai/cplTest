   /**
    * Eventos. Puro js objects
    * Implementacion de mecanismo de eventos
    *    
    * @see {@link https://stackoverflow.com/questions/24966003/how-to-work-with-events-in-pure-javascript}
    */



/*== Emitter sample usage =====================================================================
// include function Emitter from above

function MyClass(text){

  Emitter.call(this);

  function show() {
    console.log("MyText:", text);
    this.dispatchEvent(new Event("end"));
  }

  this.show = show;
}

function onEnd(event){
  console.log("Event dispatched:", event);
}

function run(){
  var myInstance = new MyClass("I have something to say...");
  myInstance.addEventListener("end", onEnd, false);
  myInstance.show();
}

run();
==============================================================================================*/
function Emitter() {
    var eventTarget = document.createDocumentFragment();

    function delegate(method) {
        this[method] = eventTarget[method].bind(eventTarget);
    }
    [
        "addEventListener",
        "dispatchEvent",
        "removeEventListener"
    ].forEach(delegate, this);
};





/**
 * Construye y retorna un evento en base al receptor
 * @access public
 * @returns {CEvent}
 */
String.prototype.asEvent = function(data = null) {
  return CEvent.create(this, data);
}

/**
 * Alias de String>>asEvent()
 * @access public
 * @returns {CEvent}
 */
String.prototype.asEventWith = function(data = null) {
  return CEvent.create(this, data);
}

/**
 * Construye y despacha un evento.
 * Alias de String>>dispatchEventFor()
 * @access public
 * @returns {CEvent}
 */
String.prototype.asEventDispatchedFor = function(emitter, detail = null) {
  this.dispatchEventFor(emitter, detail)
}


/**
 * Construye y despacha un evento.
 * El emmisor es el objeto que triggerea el evento.
 * 
 * @access public
 * @param {object} emitter
 * @param {object} detail
 * @returns {void}
 */
String.prototype.dispatchEventFor = function(emitter, data = null) {
  if(!emitter) throw Error("No se puede despachar un evento si emitter");
  let event = CEvent.create(this, data);
  event.emitter = emitter;
  emitter.dispatchEvent(event);
}


class CEvent extends CustomEvent {
  
  static create(eventName, data = null) {
    if(data) return new CEvent(eventName, data);
    return new CEvent(eventName);
  } 

  constructor(type, options = null) {
    super(type, options);
    this.data = options;
    this.emitter = null;
  }

  dispatchFor(emitter) {
    let self = this;
    self.emitter = emitter;    
    emitter.dispatchEvent(self);
  }
}

export { Emitter, CEvent }