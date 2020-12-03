import qs from 'qs';

const CLIENT_ID =
  '758922448848-dmoutat9qe9cj9qk2aopbq7sgrrn6377.apps.googleusercontent.com';
const ROOT_URL = 'https://api.imgur.com';

export default {
  login() {
    const querystring = {
      client_id: CLIENT_ID,
      response_type: 'token',
    };

    window.location = `${ROOT_URL}/oauth2/authorize?${qs.stringify(
      querystring
    )}`;
  },
};
