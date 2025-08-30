

/**
 * @constructor
 * @private
 */
class CL3DSoundManager {


    static from(otherSoundManager) {
        let self = new CL3DSoundManager();
        self.GlobalVolume = otherSoundManager.GlobalVolume;
        self.Sounds = otherSoundManager.Sounds;
        self.PlayingSounds = otherSoundManager.PlayingSounds;
        return self;
    }

    constructor() {
        this.Sounds = new Array();
        this.PlayingSounds = new Array();
        this.GlobalVolume = 1.0;
        this.canPlay = false;
    }

    /**
     * Obtiene el sound source para el nombre
     * 
     * @private
     * @param {string} name 
     * @returns {CL3D.SoundSource}
     */
    getSoundFromName(name) {
        for (var i=0; i<this.Sounds.length; ++i)
        {
            var t = this.Sounds[i];
            if (t.Name == name)
                return t;
        }
        
        return null;
    }

    /**
     * Agrega un sonido al manager
     * @private
     * @param {CL3D.SoundSource} t 
     */
    addSound(t) {
        if (t != null)
        {
            if (this.getSoundFromName(t.Name) != null && CL3D.gCCDebugOutput)
                CL3D.gCCDebugOutput.print("ERROR! Cannot add the sound multiple times: " + t.Name);
                                
            this.Sounds.push(t);
        }
    }

    /**
     * Obtiene un sonido para una url.
     * El name es la url
     * @private
     * @param {string} url
     * @param {boolean} createIfNotFound
     */
    getSoundFromSoundName = function(name, createIfNotFound) {
        if (name == null || name == "")
            return null;
            
        var t = this.getSoundFromName(name);
        
        if (t != null)
            return t;
        
        if (createIfNotFound)
        {
            t = new CL3D.SoundSource(name);
            this.addSound(t);
            return t;
        }        
        return null;
    }


    /**
     * Emite el sonido especificado.
     * 's' puede ser la url o el objeto CL3D.SoundSource
     * @private
     * @param {CL3D.SoundSource | string} s
     * @param {boolean} looped
     * @param {number} volume
     * @returns {CL3D.PlayingSound}
     */
    play2D(s, looped, volume) {
        if(!this.canPlay) return null;
        
        if (s == null)
            return null;
        
        // s can be the url or the sound source	
        var soundSrc = null;
        if (typeof(s) == 'string')
            soundSrc = this.getSoundFromSoundName(s, true);
        else
            soundSrc = s;
            
        if (soundSrc == null ||
            soundSrc.audioElem == null)
            return null;
            
        // if there is already an audio source playing with this file, stop that one.
        // a limitation by the HTML 5 audio api
        
        this.clearFinishedPlayingSounds();
        
        for (var i=0; i<this.PlayingSounds.length;)
            if (this.PlayingSounds[i].src === soundSrc) {
                this.PlayingSounds[i].src.audioElem.pause();
                this.PlayingSounds.splice(i,1);
            } else
                ++i;			
        // the HTML 5 audio tag doesn't support volume or other fance stuff unfortunately.	
        try {
            soundSrc.audioElem.currentTime = 0;
        } catch(err) { }

        // play	
        if (typeof volume === 'undefined')
            volume = 1.0;	
        
        soundSrc.audioElem.volume = volume * this.GlobalVolume;
        soundSrc.audioElem.play();
        
        // create playing sound		
        var pl = new CL3D.PlayingSound(soundSrc);
        pl.ownVolume = volume;
        this.PlayingSounds.push(pl);
        
        // a.audioElem.loop = looped; // this is only supported in chrome, firefox 
                                    // happily this, so we do this on our own with the next lines of code
                        
        if (soundSrc.lastListener)
            soundSrc.audioElem.removeEventListener('ended', soundSrc.lastListener, false);
        soundSrc.audioElem.lastListener = null;
        
        if (looped)
        {
            pl.looping = true;
            
            var endFunction = function() {
                if (!pl.hasStopped)
                {
                    try { this.currentTime = 0; }
                    catch(err)
                    { }
                    this.play();
                    //CL3D.Debug.print('foobar');
                }
            };
            
            soundSrc.audioElem.addEventListener('ended', endFunction, false);
            soundSrc.audioElem.lastListener = endFunction;
        }
        
        // return playing sound	
        return pl;
    }

    /**
     * Frena un sonido emitiendose
     * @private
     * @param {CL3D.PlayingSound} playingSnd 
     */
    stop(playingSnd) {
        if (!playingSnd)
            return;            
        playingSnd.src.audioElem.pause();
        playingSnd.hasStopped = true;
        this.clearFinishedPlayingSounds();
    }

    /**
     * @private
     * @returns {number}
     */
    getGlobalVolume() {			
        return this.GlobalVolume;
    }

    /**
     * @param {number} v
     * @private
     */
    setGlobalVolume(v) {		
        this.GlobalVolume = v;
        if (this.GlobalVolume < 0.0) this.GlobalVolume = 0.0;
        if (this.GlobalVolume > 1.0) this.GlobalVolume = 1.0;
        
        try 
        {
            // update volume for all playing sounds
            
            for (var i=0; i<this.PlayingSounds.length; ++i)
            {
                var pl = this.PlayingSounds[i];
                pl.src.audioElem.volume = pl.ownVolume * this.GlobalVolume;
            }
        }
        catch(err)
        { }
    }

    /**
     * Setea el volumen al playing sound
     * @private
     * @param {CL3D.PlayingSound} playingSnd
     * @param {number} v
     */
    setVolume = function(playingSnd, v)
    {
        if (!playingSnd)
            return;
            
        try {
            playingSnd.src.audioElem.volume = v;
        } catch(err) {}
    }

    /**
     * Detiene la emision de todos los playing sounds
     * @private
     */
    stopAll() {
        for (var i=0; i<this.PlayingSounds.length; ++i)
        {
            var pl = this.PlayingSounds[i];
            pl.hasStopped = true;
            pl.src.audioElem.pause();
        }
                
        this.PlayingSounds = new Array();
    }

    /**
     * Frena (pausa) la emision de todos los playing sounds
     * @private
     * @author buritai
     */
    pauseAll() {
        for (var i=0; i<this.PlayingSounds.length; ++i)
        {
            var pl = this.PlayingSounds[i];
            pl.hasStopped = true;
            pl.src.audioElem.pause();
        }
    }

    /**
     * Inicia la emision de los sonidos actualmente en pausa
     * @private
     * @author buritai
     */
    playAllPaused() {
        for (var i=0; i<this.PlayingSounds.length; ++i) {
            var pl = this.PlayingSounds[i];
            if(pl.hasStopped) pl.src.audioElem.play();
        }
    }



    /**
     * @private
     */
    clearFinishedPlayingSounds() {
        for (var i=0; i<this.PlayingSounds.length;)
            if (this.PlayingSounds[i].hasPlayingCompleted())
                this.PlayingSounds.splice(i, 1);
            else
                ++i;
    }

    /**
     * @private
     */
    stopSpecificPlayingSound(name) {
        for (var i=0; i<this.PlayingSounds.length; ++i) {
            var pl = this.PlayingSounds[i];
            if (pl && pl.src && pl.src.Name == name) {
                this.PlayingSounds.splice(i, 1);
                
                pl.hasStopped = true;
                pl.src.audioElem.pause();
                return;
            }
        }
    }

}
//CL3D.gSoundManager = new CL3DSoundManager();
export {CL3DSoundManager}