import AlgorithmAbstract from './AlgorithmAbstract.js'
import ObjectData from '../lib/ObjectData.js'

export default class RandomAlgorithm extends AlgorithmAbstract {
    constructor(objectData, container) {
        super(objectData, container)
        this._xRandomSize = 4
    }
    animate() {
        this.objects.forEach((obj) => {
            obj.x += Math.random() * this._xRandomSize-this._xRandomSize / 2
            obj.y += Math.random()*4-2
        })
    }

    get properties() {
        return [
            {
                name: 'xRandomSize',
                set:  (size) => this._xRandomSize = size,
                get: () => this._xRandomSize
            },
        ]
    }
} 