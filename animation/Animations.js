import AlgorithInreface from './AlgorithmAbstract.js'
import RandomAlgorithm from './RandomAlgorithm.js'
import SnowAlgorithm from './SnowAlgorithm.js'
import BounceAlgorithm from './BounceAlgorithm.js'

export default class Animations {
    static algorithms = {
        'Random': RandomAlgorithm,
        'Snow': SnowAlgorithm,
        'Bounce': BounceAlgorithm 
    }

    static getClass(name) {
        return name in this.algorithms
            ? this.algorithms[name]
            : AlgorithInreface
    }
    
    static get(name) {
        return {
            create(objectData, containable) {
                let AnimationClass = Animations.getClass(name)
                let animation = new AnimationClass(objectData, containable)
                //render.init()
                return animation
            }
        }
    }
}

