export default class TextGeometry {
    constructor(text, fontSize = 24, fontName = 'Arial') {
        this._text = text
        this._fontSize = fontSize
        this._fontName = fontName
        this._sensetive = 0
        this._points = []
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
        if (val < 0) {
            this._sensetive = 0
        }
        else if (val > 255) {
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
