import AlgorithInreface from './AlgorithmAbstract.js'
import RandomAlgorithm from './RandomAlgorithm.js'

export default class Animations {
    static algorithms = {
        'RandomAlgorithm': RandomAlgorithm
        //'Abstract': AlgorithInreface
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

