import AlgorithmAbstract from './AlgorithmAbstract.js'
import ObjectData from '../lib/ObjectData.js'

export default class RandomAlgorithm extends AlgorithmAbstract {
    constructor(objectData, container) {
        super(objectData, container)
        this._xRandomSize = 16
        this._yRandomSize = 16
    }
    animate(rate) {
        this.objects.forEach((obj) => {
            obj.x += (Math.random() * this._xRandomSize - this._xRandomSize / 2 ) * 0.3 * rate
            obj.y += (Math.random() * this._yRandomSize - this._yRandomSize / 2) * 0.3 * rate

            if (obj.x < 0 ||
                obj.x > this.container.width-obj.width) {
                obj.x = Math.random() * this.container.width
            } 
        })
    }

    get properties() {
        return {
            id: 'RandomAlgorithm',
            isSaveAll: true,
            properties: [
                {
                    name: 'x range',
                    set: (val) => this._xRandomSize = val,
                    get: () => this._xRandomSize
                },
                {
                    name: 'y range',
                    set: (val) => this._yRandomSize = val,
                    get: () => this._yRandomSize
                }
            ]
        }
    }
} 