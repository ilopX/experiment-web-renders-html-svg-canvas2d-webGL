export default class Processor {
    constructor(fps = 60) {
        this._declaredFps = fps
        this._cycleTimer = null
        this._updateTimer = null
        this._renderFrameList = []
        this._idleList = []
        this._onCycleEvent = () => {}
        this._onInfoUpdateEvent = null
        this._onStartEvent = null

        this._etalonTimeOneeFrame = 1000 / this._declaredFps
        this._multiRate = 1.0
        this._oneFrameTime = 0
        this._oneFrameIdleTime = 0
        this._stayOnPauseTime = 0
    }

    onCycleEvent(callback) {
        if (typeof callback != 'function') {
            throw new Error('callback is not a function')
        }
        this._onCycleEvent = callback
    }

    onStartEvent(callback) {
        this._onStartEvent = callback
    }

    onFpsUpdateEvent(callback) {
        if (typeof callback != 'function') {
            throw new Error('callback is not a function')
        }
        this._onInfoUpdateEvent = callback
    }
    
    get isStart() {
        return this._cycleTimer ? true : false
    }

    set isStart(start) {
        let pause = !start
        if (start && this._cycleTimer == null) {
            this._start()

        } else if (pause && this._cycleTimer != null) {
            this._pause()
        }
        if (typeof this.onStartEvent == 'function') {
            this.onStartEvent(start)
        }
    }

    _start() {
        if (this._stayOnPauseTime != 0) {
            this._stayOnPauseTime = performance.now() - this._stayOnPauseTime
        }
        this._cycleTimer = setInterval(() => this._oneCycle(), 0)
        this._updateTimer = setInterval(() => this._updateInfo(), 1000)
    }

    _pause() {
        this._stayOnPauseTime = performance.now()
        clearInterval(this._cycleTimer)
        clearInterval(this._updateTimer)
        this._cycleTimer = null
        this._updateTimer = null
    }

    _oneCycle() {
        let time = this._beginCycle()
        this._onCycleEvent(this._multiRate)
        this._endCycle(time)
    }

    _beginCycle() {
        this._oneFrameIdleTime = performance.now() - this._oneFrameIdleTime - this._stayOnPauseTime    
        this._idleList.push(this._oneFrameIdleTime)
        if (this._stayOnPauseTime !=  0) {
            this._stayOnPauseTime = 0
        }
        this._multiRate = (this._oneFrameTime + this._oneFrameIdleTime) /
            this._etalonTimeOneeFrame
        return performance.now()
    }

    _endCycle(time) {
        this._oneFrameTime = performance.now() - time
        this._oneFrameIdleTime = performance.now()
        this._renderFrameList.push(this._oneFrameTime)
    }

    _updateInfo() {
        let renderTime = 0
        let idleTime = 0
        if (this._renderFrameList.length) {
            let sum = this._renderFrameList.reduce((a,b) => a+b)
            renderTime = sum / this._renderFrameList.length
            this._renderFrameList = []

            sum = this._idleList.reduce((a,b) => a+b)
            idleTime = sum / this._idleList.length
            this._idleList = []            
        }
        
        this._onInfoUpdateEvent({ 
            renderTime,
            idleTime,
            fps: this._declaredFps / this._multiRate,
            multiRate: this._multiRate
        })
    }
}

