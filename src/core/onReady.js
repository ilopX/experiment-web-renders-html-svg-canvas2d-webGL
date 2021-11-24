let _onReady = () => { }

let onReady = (callback) => {
    _onReady = callback;
    setTimeout(_onReady, 0)
}

export default onReady

