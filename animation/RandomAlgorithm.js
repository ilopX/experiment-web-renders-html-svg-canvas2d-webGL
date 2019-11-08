import AlgorithmAbstract from './AlgorithmAbstract.js'
import ObjectData from '../lib/ObjectData.js'

export default class RandomAlgorithm extends AlgorithmAbstract {
    constructor(objectData, container) {
        super(objectData, container)
        this._xRandomSize = 4
        this._yRandomSize = 4
    }
    animate() {
        this.objects.forEach((obj) => {
            obj.x += Math.random() * this._xRandomSize - this._xRandomSize / 2
            obj.y += Math.random() * this._yRandomSize - this._yRandomSize / 2
        })
    }

    get properties() {
        return [
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