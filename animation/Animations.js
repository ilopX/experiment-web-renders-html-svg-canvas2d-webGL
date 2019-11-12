import AlgorithInreface from './AlgorithmAbstract.js'
import RandomAlgorithm from './RandomAlgorithm.js'
import SnowAlgorithm from './SnowAlgorithm.js'
import BounceAlgorithm from './BounceAlgorithm.js'
import { NotImplError, AnimationAlgorithmNotFound } from '../lib/errors.js'

export default class Animations {
    static algorithms = {
        'Random': RandomAlgorithm,
        'Snow': SnowAlgorithm,
        'Bounce': BounceAlgorithm 
    }

    static getClass(name) {
        return name in this.algorithms
            ? this.algorithms[name]
            : null
    }
    
    static get(name) {
        return {
            create(objectData, containable) {
                let AnimationClass = Animations.getClass(name)
                if (!AnimationClass) {
                    throw new AnimationAlgorithmNotFound(name, Animations.algorithms)
                }
                let animation = new AnimationClass(objectData, containable)
                //render.init()
                return animation
            }
        }
    }
}

