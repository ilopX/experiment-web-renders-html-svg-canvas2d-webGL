import AlgorithmAbstract from './AlgorithmAbstract.js'

export default class TextAlgorithm extends AlgorithmAbstract {
    constructor(objectData, container) {
        super(objectData, container)
        this._textGeometry = new TextGeometry('Hello world', 80, 'Arial')
        this._showDebug = true
        this._onPointLenUpdate = null
        this._newAppointment()
    }

    _newAppointment() {
        let points = this._textGeometry.points

        if (this._onPointLenUpdate)
            this._onPointLenUpdate(points.length)
        this._moveToCenter(points)
        this._shuffle(points)
        if (this._showDebug) {
            this._createDebug(points)
        }
        let i = 0;
        this.objects.forEach((obj) => {
            let { x, y } = points[i]
            obj.TextAlgorithm = {
                xTarget: x,
                yTarget: y
            }
            if (++i >= points.length) {
                i = 0
            }
        })
    }

    _shuffle(points) {
        Math.see
        for (let i = points.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [points[i], points[j]] = [points[j], points[i]];
        }
    }

    _moveToCenter(points) {
        let w = (this.container.width - this._textGeometry.width) / 2
        let h = (this.container.height - this._textGeometry.height) / 2
        points.forEach(val => {
            val.x += w
            val.y += h
        })
    }

    _createDebug(points) {
        this._removeDebug()
        if (this._showDebug) {
            points.forEach((point) => {
                this.objects.push({
                    x: point.x,
                    y: point.y,
                    height: 1,
                    width: 1,
                    color: `red`,
                    DebugTextGeometry: true
                    // type: randomType
                })
            })
        }
    }

    _removeDebug() {
        this.objectData.remove((obj) => 'DebugTextGeometry' in obj)
    }

    animate(rate) {

    }

    get properties() {
        return {
            id: 'TextAlgorithm',
            isSaveAll: true,
            properties: [
                // {
                //     name: 'x speed',
                //     set:  (val) => this._xSpeed = val,
                //     get: () => this._xSpeed
                // },
                // {
                //     name: 'y speed',
                //     set:  (val) => this._ySpeed = val,
                //     get: () => this._ySpeed
                // }
                {
                    name: 'fontSize',
                    set: (val) => {
                        this._textGeometry.fontSize = val
                        this._newAppointment()
                    },
                    get: () => this._textGeometry.fontSize
                },
                {
                    name: 'text',
                    set: (val) => {
                        this._textGeometry.text = val
                        this._newAppointment()
                    },
                    get: () => this._textGeometry.text
                },
                {
                    name: 'sensetive',
                    set: (val) => {
                        this._textGeometry.sensetive = val
                        this._newAppointment()
                    },
                    get: () => this._textGeometry.sensetive
                },
                {
                    name: 'debug',
                    set: (val) => {
                        this._showDebug = val
                        this._createDebug(this._textGeometry.points)
                    },
                    get: () => this._showDebug
                },
                {
                    type: 'StringInfo',
                    name: 'pointsLen',
                    get: () => this._textGeometry.points.length,
                    onUpdate: (callback) => {
                        this._onPointLenUpdate = callback
                    }
                }

            ]
        }
    }

    dispose() {
        this._removeDebug()
        this.objects.forEach(obj => {
            delete obj.TextAlgorithm
        })
    }
}

class TextGeometry {
    constructor(text, fontSize = 24, fontName = 'Arial') {
        this._text = text
        this._fontSize = fontSize
        this._fontName = fontName
        this._sensetive = 0
        this._update()
    }

    _update() {
        this._updateImageData()
        this._updatePoints()
    }

    _updateImageData() {
        // create metrics buffer
        let font = `${this._fontSize}px ${this._fontName}`
        let tmpCan = document.createElement('canvas')
        let tmpCtx = tmpCan.getContext('2d')
        tmpCan.width = 1
        tmpCan.height = 1
        tmpCtx.font = font

        // font metric calc
        let textInfo = tmpCtx.measureText(this._text)
        this._width = textInfo.actualBoundingBoxRight + textInfo.actualBoundingBoxLeft
        let pleft = textInfo.actualBoundingBoxLeft
        let ptop = textInfo.actualBoundingBoxDescent

        // create buffer
        tmpCan.width = this._width
        tmpCan.height = this._fontSize
        tmpCtx.font = font
        // draw text 
        // tmpCtx.fillStyle = 'black'
        // tmpCtx.fillRect(0, 0, tmpCan.width, tmpCan.height)
        tmpCtx.fillStyle = 'black'
        tmpCtx.fillText(this._text, pleft, this._fontSize - ptop)
        // tmpCtx.strokeRect(0, 0, this._width, fontSize)
        this._imageData = tmpCtx.getImageData(0, 0, this._width, this._fontSize)
    }

    _updatePoints() {
        let list = []
        for (let i = 3; i < this._imageData.data.length; i += 4) {
            let bits = i / 4
            let y = Math.floor(bits / this._imageData.width)
            let x = bits - ((this._imageData.width) * y)
            // console.log(`x: ${y}`, `y: ${x}, color:${imageData.data[i]}`);
            if (this._imageData.data[i] > this._sensetive) {
                list.push({ x, y })
            }
        }
        this._points = list
    }

    get text() {
        return this._text
    }

    set text(text) {
        if (text != this._text) {
            this._text = text
            this._update()
        }
    }

    get fontSize() {
        return this._fontSize

    }

    set fontSize(size) {
        if (size != this._fontSize) {
            this._fontSize = size
            this._update()
        }

    }

    get sensetive() {
        return this._sensetive
    }

    set sensetive(val) {
        if (val > 255) {
            throw new Error(`Sensetibe value should be 0-255. Current: ${val}`)
        } else if (val != this._sensetive) {
            this._sensetive = val
            this._update()
        }
    }

    // get fontName() {
    //     throw new NotImplError()

    // }

    // set fontName(name) {
    //     throw new NotImplError()

    // }

    get width() {
        return this._width

    }

    get height() {
        return this._fontSize
    }

    // moveTo(x, y) {
    //     throw new NotImplError()

    // }

    get points() {
        return this._points
    }

    get imageData() {
        return this._imageData
    }
}
// let textGeopetry = new TextGeometry('ilopX', 50)
// console.log(textGeopetry.imageData.data);

// ctx.putImageData(textGeopetry.imageData, 0, 0)
// ctx.fillStyle = 'red'
// textGeopetry.points.forEach(val => {
//     val.x += 2
//     val.y += 2
// })
// textGeopetry.points.forEach(val => {
//     ctx.fillRect(val.x - 1, val.y, 1, 1)
// })