import Processor from '../src/core/Processor.js'

const equal = chai.assert

describe('ProcessTest', function () {
    describe('.constructor()', function () {
        it('should not return an error', function (done) {
            let processor = new Processor()
            processor.isStart = true
            setTimeout(() => {
                processor.isStart = false
                done();
            }, 200);
        })
    })

    describe('.onCycleEvent(callback)', function () {
        it('index of cycle should return > 3', function (done) {
            let counter = 0
            let processor = new Processor()
            processor.onCycleEvent(() => counter++)
            processor.isStart = true
            setTimeout(() => {
                processor.isStart = false
                equal(counter > 3, true)
                done();
            }, 200)
        })
    })
})
