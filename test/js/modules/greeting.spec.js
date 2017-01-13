
import Greeting from '../../../src/js/modules/greeting'

let greetingConfig = {}
let mocks = {  // @TODO add a fixtures obj with shared mocks
    eventData: {
        detail: {
            domContext: null
        }
    },
    eventName: 'greeting'
}
let button = document.createElement('button')
let input = document.createElement('input')
let output = document.createElement('div')
let greeting

let setDomEls = () => {
    button.id = 'btn-send'
    input.id = 'user-name'
    output.id = 'output'

    document.body.appendChild(button)
    document.body.appendChild(input)
    document.body.appendChild(output)

    greetingConfig.button = document.getElementById('btn-send')
    greetingConfig.input = document.getElementById('user-name')
    greetingConfig.output = mocks.eventData.detail.domContext = document.getElementById('output')

    greetingConfig.button.disabled = true
    greetingConfig.input.value = 'Mickey Mouse'
}

let restoreDomEls = () => {
    greetingConfig.output.innerHTML = ''
}

describe('greeting.js', () => {

    beforeAll(() => {
        setDomEls()

        console.log('initial value: ' + greetingConfig.input.value)

        greeting = new Greeting(greetingConfig)
        greeting.init()
    })

    afterAll(() => {
        restoreDomEls()
    })

    beforeEach(() => {
        
    })

    it('should clear the input value on load', () => {
        expect(greetingConfig.input.value).toBe('')
    })

    it('should not enable the button when a user enters an invalid value', () => {
        expect(greetingConfig.button.disabled).toBeTruthy()
    })

    xit('should enable the button when a user enters a valid value', () => {
        // @TODO a `keyup` event needs to be created and fired here

        expect(greetingConfig.button.disabled).toBeFalsy()
    })

    xit('should show a greeting message with the user name when the button is clicked', () => {
        // @TODO a `click` event needs to be created and fired here

        let actualContent = greetingConfig.output.innerHTML
        let expectedContent = '<p>Hello <strong>' + greetingConfig.input.value + '</strong>!</p>'

        expect(actualContent).toEqual(expectedContent)
    })

    xit('should emit a `' + mocks.eventName + '` event with the dom node that contains the greeting message', () => {
        // @TODO a `click` event needs to be created and fired here
        
        spyOn(greeting, 'emit')

        expect(greeting.emit).toHaveBeenCalledWith(mocks.eventName, mocks.eventData)
    })

})