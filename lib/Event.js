export default class Event {
    static check(callback) {
        if (typeof callback != 'function') {
            throw new Error('callback is not a function')
        } else {
            return callback
        }
    }
}