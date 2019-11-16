import AnimationInterface from '../AnimationInterface.js'
import TextGeometry from './TextGeometry.js'

export default class TextAlgorithm extends AnimationInterface {
    constructor(objectData, container) {
        super(objectData, container)
        this._textGeometry = new TextGeometry('Hello world', 80, 'Arial')
        this._showDebug = true
        this._onPointLenUpdate = null
        this._newAppointment()
    }

    _newAppointment() {
        let points = this._textGeometry.points

        if (this._onPointLenUpdate)
            this._onPointLenUpdate(points.length)
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
        Math.see
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

    }

    get properties() {
        return {
            id: 'TextAlgorithm',
            isSaveAll: true,
            properties: [
                // {
                //     name: 'x speed',
                //     set:  (val) => this._xSpeed = val,
                //     get: () => this._xSpeed
                // },
                // {
                //     name: 'y speed',
                //     set:  (val) => this._ySpeed = val,
                //     get: () => this._ySpeed
                // }
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
                        this._onPointLenUpdate = callback
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