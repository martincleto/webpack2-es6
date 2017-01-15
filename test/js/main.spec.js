
import '../../src/js/main'
import Greeting from '../../src/js/modules/greeting'

describe('main.js', () => {

  var eventLoad = new Event('DOMContentLoaded')

  it('should init Greeting class', () => {
    
    spyOn(Greeting.prototype, 'init')

    document.dispatchEvent(eventLoad)

    expect(Greeting.prototype.init).toHaveBeenCalled()
  })
})
