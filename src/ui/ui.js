import TableValues from '../core/ui/TableValues.js'

let ui = {
    length: document.getElementById('length'),
    container: document.getElementById('container'),
    renderType: document.getElementById('renderType'),
    animationType: document.getElementById('animationType'),
    btnCreate: document.getElementById('btnCreate'),
    btnPlay: document.getElementById('btnPlay'),
    animationProperties: document.getElementById('animationProperties'),
    frameInfo: new TableValues(document.getElementById('frameInfo'),
        [
            'render',
            'idle',
            'fps',
            'multiRate',
            'objects'
        ]),
    controllerProperties: document.getElementById('controllerProperties')
}
export default ui
