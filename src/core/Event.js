export default class Event {
    /** @param {Function} callback*/
    static check(callback) {
        if (typeof callback != 'function') {
            throw new Error('callback is not a function')
        } else {
            return callback
        }
    }
}