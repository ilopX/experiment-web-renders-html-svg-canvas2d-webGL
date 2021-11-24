import Objective from '../Objetive.js'
import { NotImplError } from '../errors.js'

export default class AnimationInterface extends Objective {
    animate(rate) {
        throw new NotImplError()
    }

    /**
     * @return {Properties} 
     */
    get properties() {
        throw new NotImplError()
    }

    dispose() {

    }
}
