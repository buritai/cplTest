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
export function Emitter() {
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