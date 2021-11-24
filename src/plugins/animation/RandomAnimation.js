import AlgorithmAbstract from '../../core/plugins/AnimationInterface.js'
import ObjectData from '../../core/ObjectData.js'

export default class RandomAlgorithm extends AlgorithmAbstract {
    constructor(objectData, container) {
        super(objectData, container)
        this._xGlobalRand = 16
        this._yGlobalRand = 16
    }

    animate(rate) {
        const transformRate = 0.3 * rate
        this.objects.forEach((obj) => {
            obj.x += (Math.random() * this._xGlobalRand - this._xGlobalRand / 2) * transformRate
            obj.y += (Math.random() * this._yGlobalRand - this._yGlobalRand / 2) * transformRate

            if (obj.x < 0 ||
                obj.x > this.container.width - obj.width) {
                obj.x = Math.random() * this.container.width
            }
        })
    }
    
    /**
     * @return {Properties} 
     */
    get properties() {
        return {
            id: 'RandomAlgorithm',
            isSaveAll: true,
            properties: [
                {
                    name: 'x range',
                    set: (val) => this._xGlobalRand = val,
                    get: () => this._xGlobalRand
                },
                {
                    name: 'y range',
                    set: (val) => this._yGlobalRand = val,
                    get: () => this._yGlobalRand
                }
            ]
        }
    }
} 
