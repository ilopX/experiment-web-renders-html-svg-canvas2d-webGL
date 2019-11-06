export default class Processor {
    constructor() {
        this._cycleTimer = null
        this._fpsUpdateTimer = null
        this._fpsList = []
        this._onCycleEvent = null
        this._onFpsUpdateEvent = null
        this._onStartEvent = null
    }

    onCycleEvent(callback) {
        this._onCycleEvent = callback
    }

    onStartEvent(callback) {
        this._onStartEvent = callback
    }

    onFpsUpdateEvent(callback) {
        this._onFpsUpdateEvent = callback
    }
    
    get isStart() {
        return this._cycleTimer ? true : false
    }

    set isStart(start) {
        let pause = !start
        if (start && this._cycleTimer == null) {
            this._cycleTimer = setInterval(() => this._oneCycle(), 0)
            this._fpsUpdateTimer = setInterval(() => this._fpsUpdate(), 1000)
        } else if (pause && this._cycleTimer != null) {
            clearInterval(this._cycleTimer)
            clearInterval(this._fpsUpdateTimer)
            this._cycleTimer = null
            this._fpsUpdateTimer = null
        }
        if (typeof this.onStartEvent == 'function') {
            this.onStartEvent(start)
        }
    }

    _oneCycle() {
        let time = performance.now()
        if (typeof this._onCycleEvent == 'function') {
            this._onCycleEvent()
        }
        let oneFrameTime = performance.now() - time
        this._fpsList.push(1000/oneFrameTime)
    }

    _fpsUpdate() {
        if (this._fpsList.length) {
            let fps = this._fpsList.reduce((a,b) => a+b) / this._fpsList.length
            this._fpsList = []
            if (typeof this._onFpsUpdateEvent == 'function') {
                this._onFpsUpdateEvent(`${fps.toFixed(2)} fps`)
            }
        }
    }
}

