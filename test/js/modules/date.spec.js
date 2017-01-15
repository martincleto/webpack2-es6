
import '../../../src/js/modules/date'
import moment from 'moment'

let mockEl = document.createElement('div')
let mocks = {
    eventData: {
        detail: {
            domContext: document.body.appendChild(mockEl)
        }
    },
    eventName: 'greeting'
} 
let customEvent = new CustomEvent(mocks.eventName, mocks.eventData)

describe('date.js', () => {

    beforeEach(() => {
        document.dispatchEvent(customEvent)
    })

    it('should insert a message containing the current date into the provided DOM node', () => {
        let targetDomContext = mocks.eventData.detail.domContext
        let actualContent = targetDomContext.innerHTML
        let expectedContent = ' Today is ' + moment().format('dddd, MMMM Do YYYY')

        expect(actualContent).toEqual(expectedContent)
    })
})
