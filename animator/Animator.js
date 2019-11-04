export default class Animator {
    constructor(objects, algorithm) {
        this._timerID = null
        this._algorithm = algorithm
        this._objects = objects
        this.onPlayEvent = null
        this.onFrame = null
    }

    get isPlay() {
        return this._timerID ? true : false
    }

    set isPlay(start) {
        let pause = !start
        if (start && this._timerID == null) {
            this._timerID = setInterval(() => this._animate(), 100)
        } else if (pause && this._timerID != null) {
            clearInterval(this._timerID)
            this._timerID = null
        }
        if (typeof this.onPlayEvent == 'function') {
            this.onPlayEvent(start)
        }
    }

    _animate() {
        this._algorithm.animate(this._objects.get)
        if (typeof this.onFrame == 'function') {
            this.onFrame()
        }
    }
}