import AlgorithmAbstract from '../../core/plugins/AnimationInterface.js'
import ObjectData from '../../core/ObjectData.js'

export default class SnowAlgorithm extends AlgorithmAbstract {
    constructor(objectData, container) {
        super(objectData, container)
        this._initObjects()
        this._global = {
            ySpeed: 32,
            xSpeed: 3,
            xRange: 5
        }
        this._frameIndex = 0
    }

    animate(rate) {
        this._frameIndex += rate
        this.objects.forEach((obj) => {
            let { ySpeed, xRange, xSpeed } = obj.SnowAlgorithm

            obj.y += ySpeed * this._global.ySpeed * rate
            if (obj.y > this.container.height + obj.height) {
                obj.y = -obj.height
            }
            xSpeed = xSpeed * this._global.xSpeed * 0.1
            xRange *= this._global.xRange * rate
            obj.x += Math.cos(this._frameIndex * xSpeed) * xRange
        })

    }

    get properties() {
        return {
            id: 'SnowAlgorithm',
            isSaveAll: true,
            properties: [
                {
                    name: 'y speed',
                    set: (size) => this._global.ySpeed = size,
                    get: () => this._global.ySpeed
                },
                {
                    name: 'x range',
                    set: (size) => this._global.xRange = size,
                    get: () => this._global.xRange
                },
                {
                    name: 'x speed',
                    set: (size) => this._global.xSpeed = size,
                    get: () => this._global.xSpeed
                }
            ]
        }
    }

    dispose() {
        this.objects.forEach(obj => {
            delete obj.SnowAlgorithm
        })
    }

    _initObjects() {
        this.objects.forEach((obj) => {
            obj.SnowAlgorithm = {
                ySpeed: obj.width * obj.height / 200,
                xRange: Math.random() * 0.4 - 0.2,
                xSpeed: Math.random() * 0.1 - 0.05
            }
        })
    }
} 
