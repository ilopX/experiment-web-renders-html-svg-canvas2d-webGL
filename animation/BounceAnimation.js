import AlgorithmAbstract from './AnimationInterface.js'

export default class BounceAlgorithm extends AlgorithmAbstract {
    constructor(objectData, container) {
        super(objectData, container)
        this.objects.forEach((obj) => {
            obj.BounceAlgorithm = {
                xSpeed: Math.random() + 0.1,
                xDirection: Math.random() > 0.5,
                ySpeed: Math.random() + 0.1,
                yDirection: Math.random() > 0.5
            }
        })
        this._ySpeed = 0
        this._xSpeed = 0
    }

    animate(rate) {
        this.objects.forEach((obj) => {
            let { xSpeed, ySpeed,
                xDirection, yDirection } = obj.BounceAlgorithm
            xSpeed += this._xSpeed * 0.1
            obj.x += (xDirection ? xSpeed : -xSpeed) * rate
            let rigth = this.container.width - obj.width
            if (obj.x < 0) {
                obj.BounceAlgorithm.xDirection = true
                obj.x = 0
            } else if (obj.x > rigth) {
                obj.BounceAlgorithm.xDirection = false
                obj.x = rigth
            }
            ySpeed += this._ySpeed * 0.1
            obj.y += (yDirection ? ySpeed : -ySpeed) * rate
            let bottom = this.container.height - obj.height
            if (obj.y < 0) {
                obj.y = 1
                obj.BounceAlgorithm.yDirection = true
            } else if (obj.y > bottom) {
                obj.BounceAlgorithm.yDirection = false
                obj.y = bottom
            }
        })
    }

    get properties() {
        return {
            id: 'BounceAlgorithm',
            isSaveAll: true,
            properties: [
                {
                    name: 'x speed',
                    set: (val) => this._xSpeed = val,
                    get: () => this._xSpeed
                },
                {
                    name: 'y speed',
                    set: (val) => this._ySpeed = val,
                    get: () => this._ySpeed
                }

            ]
        }
    }

    dispose() {
        this.objects.forEach(obj => {
            delete obj.BounceAlgorithm
        })
    }
} 