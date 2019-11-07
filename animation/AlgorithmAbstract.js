import Objective from './../lib/Objetive.js'

export default class AlgotithmAbstract extends Objective{
    animate() {
        throw new Error('Not impl')        
    }

    get properties() {
        return []
    }
}