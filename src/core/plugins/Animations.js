import AlgorithInreface from './AnimationInterface.js'
import RandomAnimation from '../../plugins/animation/RandomAnimation.js'
import SnowAnimation from '../../plugins/animation/SnowAnimation.js'
import BounceAnimation from '../../plugins/animation/BounceAnimation.js'
import TextAnimation from '../../plugins/animation/TextAnimation/TextAnimation.js'

import { AnimationNotFound } from '../errors.js'

export default class Animations {
    static listOfAnimations = {
        'Random': RandomAnimation,
        'Snow': SnowAnimation,
        'Bounce': BounceAnimation,
        'Text': TextAnimation
    }

    static getClass(name) {
        return name in this.listOfAnimations
            ? this.listOfAnimations[name]
            : null
    }

    static get(name) {
        return {
            create(objectData, containable) {
                let AnimationClass = Animations.getClass(name)
                if (!AnimationClass) {
                    throw new AnimationNotFound(name, Animations.listOfAnimations)
                }
                let animation = new AnimationClass(objectData, containable)
                //render.init()
                return animation
            }
        }
    }
}

