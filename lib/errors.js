export class NotImplError extends Error { }

class _Available_NotFount extends Error {
    constructor(name, type, available = {}) {
        available = Object.keys(available)
            .map(val => `"${val}"`)
            .join(', ')
        super(`${type} not found name: "${name}"
        available ${type}s: [${available}]`)
    }
}

export class AnimationNotFound extends _Available_NotFount {
    constructor(name, availableRenders) {
        super(name, 'animation algorithm', availableRenders)
    }
}
export class RenderNotFound extends _Available_NotFount {
    constructor(name, availableRenders) {
        super(name, 'render', availableRenders)
    }
}