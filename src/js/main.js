import Date from './modules/date';
import Greeting from './modules/greeting';

document.addEventListener('DOMContentLoaded', function() {
    let greetingConfig = {
        button: document.getElementById('btn-send'),
        input: document.getElementById('user-name'),
        output: document.getElementById('output')
    };
    let greeting = new Greeting(greetingConfig);

    greeting.init();
});
