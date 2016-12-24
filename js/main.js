import 'whatwg-fetch';
import {initPromisePolyfill, validationStatusForGetRequest} from './utils';
import Application from './application';

initPromisePolyfill();

Application.showLoading({title: 'Подождите. Идёт загрузка...', description: ''});

window.fetch(Application.severUrl + 'pixel-hunter/questions')
    .then(validationStatusForGetRequest)
    .then((response) => response.json())
    .then((data) => {
      Application.data = data;

      Application.showWelcome();
    })
    .catch((errorText) => {
      Application.showError({
        title: 'Произошла ошибка при загрузке данных',
        description: errorText
      });
    });
