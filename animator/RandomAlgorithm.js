import AlgorithmAbstract from './AlgorithmAbstract.js'

export default class RandomAlgorithm extends AlgorithmAbstract {
    animate(objects) {
        objects.forEach((obj) => {
            obj.x += Math.random()*4-2
            obj.y += Math.random()*4-2
        })
    }
} 