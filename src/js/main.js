import './modules/date'
import Greeting from './modules/greeting'

import '../sass/main.scss'

document.addEventListener('DOMContentLoaded', function() {

    let greetingConfig = {
        button: document.getElementById('btn-send'),
        input: document.getElementById('user-name')
    };
    let greeting = new Greeting(greetingConfig)

    greeting.init()
});
