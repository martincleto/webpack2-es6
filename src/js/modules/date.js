import moment from 'moment'

{
    document.addEventListener('greeting', function(evt) {
        try {
            let domContext = evt.detail.domContext
            let now = moment().format('dddd, MMMM Do YYYY')

            domContext.innerHTML += ' Today is ' + now
        } catch(err) {
            throw err
        }
    })
}
