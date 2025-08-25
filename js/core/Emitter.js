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
String.prototype.asEvent = function(detail = null) {
  return CEvent.create(this, detail);
}

/**
 * Alias de String>>asEvent()
 * @access public
 * @returns {CEvent}
 */
String.prototype.asEventWith = function(detail = null) {
  return CEvent.create(this, detail);
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
String.prototype.dispatchEventFor = function(emitter, detail = null) {
  if(!emitter) throw Error("No se puede despachar un evento si emitter");
  let event = CEvent.create(this, detail);
  emitter.dispatchEvent(event);
}


class CEvent extends CustomEvent {
  static create(eventName, detail = null) {
    if(detail) return new CEvent(eventName, detail);
    return new CEvent(eventName);
  } 

  dispatchFor(emitter) {
    let self = this;    
    emitter.dispatchEvent(self);
  }
}

export { Emitter, CEvent }