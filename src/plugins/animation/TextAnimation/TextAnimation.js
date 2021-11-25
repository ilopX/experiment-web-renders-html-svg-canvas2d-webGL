import AnimationInterface from '../../../core/plugins/AnimationInterface.js'
import TextGeometry from './TextGeometry.js'
import Event from '../../../core/Event.js'

export default class TextAlgorithm extends AnimationInterface {
    constructor(objectData, container) {
        super(objectData, container)
        this._textGeometry = new TextGeometry('HTML Canvas ', 90, 'Arial')
        this._showDebug = false
        this._onPointLenUpdateEvent = null
        this._newAppointment()
    }

    _newAppointment() {
        let points = this._textGeometry.points

        if (this._onPointLenUpdateEvent)
            this._onPointLenUpdateEvent(points.length)
        this._moveToCenter(points)
        this._shuffle(points)
        if (this._showDebug) {
            this._createDebug(points)
        }
        let i = 0;
        this.objects.forEach((obj) => {
            let { x, y } = points[i]
            obj.TextAlgorithm = {
                xTarget: x,
                yTarget: y
            }
            if (++i >= points.length) {
                i = 0
            }
        })
    }

    _shuffle(points) {

        for (let i = points.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [points[i], points[j]] = [points[j], points[i]];
        }
    }

    _moveToCenter(points) {
        let w = (this.container.width - this._textGeometry.width) / 2
        let h = (this.container.height - this._textGeometry.height) / 2
        points.forEach(val => {
            val.x += w
            val.y += h
        })
    }

    _createDebug(points) {
        this._removeDebug()
        if (this._showDebug) {
            points.forEach((point) => {
                this.objects.push({
                    x: point.x,
                    y: point.y,
                    height: 1,
                    width: 1,
                    color: `red`,
                    DebugTextGeometry: true
                    // type: randomType
                })
            })
        }
    }

    _removeDebug() {
        this.objectData.remove((obj) => 'DebugTextGeometry' in obj)
    }

    animate(rate) {
        let pointIndex = 0;
        this.objects.forEach((obj, index) => {
            if (obj.DebugTextGeometry) {
                return
            }

            if (pointIndex >= this._textGeometry.points.length) {
                pointIndex = 0;
            }

            let { x, y } = this._textGeometry.points[pointIndex++]
            let randX = (0.5 - Math.random()) / 10;
            obj.x += (x - obj.x) / 25 * rate + randX
            obj.y += (y - obj.y) / 25 * rate + randX
        })
    }

    /**
     * @return {Properties} 
     */
    get properties() {
        return {
            id: 'TextAlgorithm',
            isSaveAll: true,
            properties: [
                {
                    name: 'fontSize',
                    set: (val) => {
                        this._textGeometry.fontSize = val
                        this._newAppointment()
                    },
                    get: () => this._textGeometry.fontSize
                },
                {
                    name: 'text',
                    set: (val) => {
                        this._textGeometry.text = val
                        this._newAppointment()
                    },
                    get: () => this._textGeometry.text
                },
                {
                    name: 'sensetive',
                    set: (val) => {
                        this._textGeometry.sensetive = val
                        this._newAppointment()
                    },
                    get: () => this._textGeometry.sensetive
                },
                {
                    name: 'debug',
                    set: (val) => {
                        this._showDebug = val
                        this._createDebug(this._textGeometry.points)
                    },
                    get: () => this._showDebug
                },
                {
                    type: 'StringInfo',
                    name: 'pointsLen',
                    get: () => this._textGeometry.points.length,
                    onUpdate: (callback) => {
                        this._onPointLenUpdateEvent = Event.check(callback)
                    }
                }

            ]
        }
    }

    dispose() {
        this._removeDebug()
        this.objects.forEach(obj => {
            delete obj.TextAlgorithm
        })
    }
}
