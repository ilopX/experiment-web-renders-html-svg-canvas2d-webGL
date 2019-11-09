import AlgorithmAbstract from './AlgorithmAbstract.js'
import ObjectData from '../lib/ObjectData.js'

export default class SnowAlgorithm extends AlgorithmAbstract {
    constructor(objectData, container) {
        super(objectData, container)
        this.objects.forEach((obj) => {
            obj.SnowAlgorithm = {
                ySpeed: obj.width*obj.height / 200,
                xRange: Math.random()*0.2,
                xSpeed: Math.random()*0.05
            }
        }) 
        this._ySpeed = 12
        this._xSpeed = 3
        this._xRange = 10
        this._frameIndex = 0
    } 
    animate() {
        this._frameIndex++
        this.objects.forEach((obj) => {
            let {ySpeed, xRange, xSpeed} = obj.SnowAlgorithm

            obj.y += ySpeed * this._ySpeed*0.1
            if (obj.y > this.container.height+obj.height ) {
                obj.y = -obj.height
            }
            xSpeed = xSpeed * this._xSpeed * 0.2
            xRange *= this._xRange*0.2
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
                    set:  (size) => this._ySpeed = size,
                    get: () => this._ySpeed
                },
                {
                    name: 'x speed',
                    set:  (size) => this._xSpeed = size,
                    get: () => this._xSpeed
                },
                {
                    name: 'x range',
                    set:  (size) => this._xRange = size,
                    get: () => this._xRange
                }
            ]
        }
    }

    dispose() {
        this.objects.forEach(obj => {
            delete obj.SnowAlgorithm
        })
    }
} 