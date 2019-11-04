import AlgorithInreface from './AlgorithmAbstract.js'
import RandomAlgorithm from './RandomAlgorithm.js'

export default class Animators {
    static algorithms = {
        'Abstract': AlgorithInreface,
        'RandomAlgorithm': RandomAlgorithm
    }

    static get(name) {
        let Algorithm = name in this.algorithms
            ? this.algorithms[name]
            : AlgorithInreface
        return new Algorithm()
    }
}