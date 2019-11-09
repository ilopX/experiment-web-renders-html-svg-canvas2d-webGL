import Objective from './../lib/Objetive.js'
import { NotImplError } from './../lib/errors.js'

export default class AlgotithmAbstract extends Objective{
    animate() {
        throw new Error('Not impl')        
    }

    get properties() {
        return []
    }

    dispose() {

    }
}