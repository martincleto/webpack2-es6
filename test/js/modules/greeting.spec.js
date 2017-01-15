
import Greeting from '../../../src/js/modules/greeting'
import moment from 'moment'

let greetingConfig = {}
let mocks = {  // @TODO add a fixtures obj with shared mocks
    dom: {
        button: document.createElement('button'),
        input: document.createElement('input'),
        output: document.createElement('div')
    },
    eventData: {
        detail: {
            domContext: null
        }
    },
    eventName: 'greeting'
}
let greeting

let setDomEls = () => {
    mocks.dom.button.id = 'btn-send'
    mocks.dom.input.id = 'user-name'
    mocks.dom.output.id = 'output'

    for (let element in mocks.dom) {
        if (mocks.dom.hasOwnProperty(element)) {
            document.body.appendChild(mocks.dom[element])
        }
    }

    greetingConfig.button = document.getElementById('btn-send')
    greetingConfig.input = document.getElementById('user-name')
    greetingConfig.output = document.getElementById('output')

    greetingConfig.button.disabled = true
    greetingConfig.input.value = 'Mickey Mouse'
}

let restoreDomEls = () => {
    greetingConfig.output.innerHTML = ''
}

let fireEvent = (trigger, name) => {
    let event = new Event(name)

    trigger.dispatchEvent(event)
}

describe('greeting.js', () => {

    beforeAll(() => {
        setDomEls()

        greeting = new Greeting(greetingConfig)
        greeting.init()
    })

    afterAll(() => {
        restoreDomEls()
    })

    it('should clear the input value on load', () => {
        expect(greetingConfig.input.value).toBe('')
    })

    it('should not enable the button when a user enters an invalid value', () => {
        expect(greetingConfig.button.disabled).toBeTruthy()
    })

    it('should enable the button when a user enters a valid value', () => {
        greetingConfig.input.value = 'Jack Sparrow'

        fireEvent(greetingConfig.input, 'keyup')

        expect(greetingConfig.button.disabled).toBeFalsy()
    })

    it('should show a greeting message with the user name when the button is clicked', () => {
        fireEvent(greetingConfig.button, 'click')

        let dateMsg = ' Today is ' + moment().format('dddd, MMMM Do YYYY')
        let actualContent = greetingConfig.output.innerHTML
        let expectedContent = '<p>Hello <strong>' + greetingConfig.input.value + '</strong>!' + dateMsg + '</p>'

        expect(actualContent).toEqual(expectedContent)
    })

    it('should emit a `' + mocks.eventName + '` event with the dom node that contains the greeting message', () => {
        spyOn(greeting, 'emit')

        fireEvent(greetingConfig.button, 'click')

        mocks.eventData.detail.domContext = greetingConfig.output.children[0]

        let greetingEmitArgs = greeting.emit.calls.argsFor(0)

        expect(greetingEmitArgs[0]).toEqual(mocks.eventName)
        expect(greetingEmitArgs[1]).toEqual(mocks.eventData)
    })
})