import Event from './Event.js'

export default class Processor {
    constructor(updateInfoTime = 1000) {
        this._updateInfoTime = updateInfoTime
        this._declareFps = 60
        this._cycleTimer = null
        this._updateTimer = null
        this._frameTimeList = []
        this._idleTimeList = []
        this._onCycleEvent = () => { }
        this._onInfoUpdateEvent = () => { }
        this._onStartEvent = () => { }
        this._oneFrameEtalonTime = 1000 / this._declareFps
        this._multiRate = 1.0
        this._oneFrameTime = 0
        this._oneFrameIdleTime = 0
        this._stayOnPauseTime = 0
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
        this._onStartEvent(start)
    }

    _start() {
        if (this._stayOnPauseTime != 0) {
            this._stayOnPauseTime = performance.now() - this._stayOnPauseTime
        }
        this._cycleTimer = setInterval(() => this._oneCycle(), 0)
        this._updateTimer = setInterval(() => this._updateFrameInfo(), this._updateInfoTime)
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
        this._oneFrameIdleTime = performance.now() - this._oneFrameIdleTime
            - this._stayOnPauseTime
        this._idleTimeList.push(this._oneFrameIdleTime)
        this._stayOnPauseTime = 0
        this._multiRate = (this._oneFrameTime + this._oneFrameIdleTime) /
            this._oneFrameEtalonTime
        return performance.now()
    }

    _endCycle(time) {
        this._oneFrameTime = performance.now() - time
        this._oneFrameIdleTime = performance.now()
        this._frameTimeList.push(this._oneFrameTime)
    }

    _updateFrameInfo() {
        let frameInfo = {
            render: 0,
            idle: 0,
            fps: this._declareFps / this._multiRate,
            multiRate: this._multiRate
        }
        if (this._frameTimeList.length) {
            let sum = this._frameTimeList.reduce((a, b) => a + b)
            frameInfo.render = sum / this._frameTimeList.length
            this._frameTimeList = []

            sum = this._idleTimeList.reduce((a, b) => a + b)
            frameInfo.idle = sum / this._idleTimeList.length
            this._idleTimeList = []
        }
        this._onInfoUpdateEvent(frameInfo)
    }

    onCycle(callback) {
        this._onCycleEvent = Event.check(callback)
    }

    onStart(callback) {
        this._onStartEvent = Event.check(callback)
    }

    onFpsUpdateEvent(callback) {
        this._onInfoUpdateEvent = Event.check(callback)
    }
}

