import Objective from '../lib/Objetive.js'
import { NotImplError } from '../lib/errors.js'

export default class AnimationInterface extends Objective {
    animate(rate) {
        throw new NotImplError()
    }

    get properties() {
        throw new NotImplError()
    }

    dispose() {

    }
}